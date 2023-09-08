import { Modal } from '../../../components/Modal'
import React from 'react'
import { useData } from '../../../hooks/useData'
import { Budget, Service } from '../../../types/Entities.type'
import { useForm } from '../../../hooks/useForm'
import { ButtonGroup } from '../../../components/button/ButtonGroup'
import { Button } from '../../../components/button/Button'

export const BudgetFormServiceModal = () => {
	const formModalData = useData<Service | null>('budgetServiceModal', null)
	const formData = useData<Budget | null>('budgetForm', null)
	const form = useForm<Service>({
		definition: {
			picture: {
				label: 'Imagem',
				type: 'file',
				image: true,
			},
			name: {
				label: 'Nome',
				type: 'text',
			},
			description: {
				label: 'Descrição',
				type: 'text',
				textArea: true,
			},
			price: {
				label: 'Preço',
				type: 'number',
			},
		},
		value: formModalData.data,
		onChange: formModalData.setData,
	})

	return (
		<Modal
			onClose={() => {
				formModalData.setData(null)
			}}
		>
			<h1>Formulário de Produto / Serviço</h1>
			{form.picture}
			{form.name}
			{form.description}
			{form.price}
			<ButtonGroup align="right">
				{(formModalData.data as any).id !== undefined && (
					<Button
						leftIcon="delete"
						variation="ghost"
						onClick={() => {
							if (formData.data) {
								if (!formData.data.services) {
									formData.data.services = []
								}
								formData.data.services.splice((formModalData.data as any).id, 1)
								formData.setDataProp('services', formData.data?.services)
								formModalData.setData(null)
							}
						}}
					>
						Excluir
					</Button>
				)}
				<Button
					leftIcon="save"
					onClick={() => {
						if (formData.data) {
							if (!formData.data.services) {
								formData.data.services = []
							}
							if ((formModalData.data as any).id === undefined) {
								formData.data.services.push(
									structuredClone(formModalData.data as any)
								)
							} else {
								formData.data.services[(formModalData.data as any).id] =
									structuredClone({
										...(formModalData.data as any),
										id: undefined,
									})
							}
							formData.setDataProp('services', formData.data?.services)
							formModalData.setData(null)
						}
					}}
				>
					Salvar
				</Button>
			</ButtonGroup>
		</Modal>
	)
}

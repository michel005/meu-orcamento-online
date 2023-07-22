import { Modal } from '../../components/Modal'
import { useFormLayout } from '../../hook/useFormLayout'
import { useModalData } from '../../hook/useModalData'
import React, { useContext } from 'react'
import { useDatabase } from '../../hook/useDatabase'
import { FormDesign, GroupWithLabel } from '../../components/FormDesign'
import { useFormValidation } from '../../hook/useFormValidation'
import { ModalContext } from '../../context/ModalContext'
import { GymTrainingType } from '../../types/GymTrainingType'
import { Table } from '../../components/Table'

const Exercises = ({
	data,
	updateData,
}: {
	data: GymTrainingType
	updateData: (value: GymTrainingType) => void
}) => {
	return (
		<Table
			definition={[
				{
					field: 'name',
					label: 'Nome do Exercício',
				},
				{
					field: 'type',
					label: 'Tipo',
				},
			]}
			value={data.exercises || []}
		/>
	)
}

export const GymModal = () => {
	const { showQuestion } = useContext(ModalContext)
	const { save, remove } = useDatabase<GymTrainingType>('gym')
	const { modal, update, close } = useModalData<GymTrainingType>('gym')
	const { errors, validate } = useFormValidation<GymTrainingType>((entity, errors) => {
		if (!entity.name || entity.name.trim() === '') {
			errors.set('name', 'O nome do treino é um campo obrigatório')
		}
	})
	const formRecord = useFormLayout<GymTrainingType>({
		fields: [
			{
				id: 'name',
				label: 'Nome do Treino',
			},
			{
				id: 'description',
				label: 'Descrição',
				textArea: true,
			},
			{
				id: 'expirationDate',
				label: 'Data de Validade',
				type: 'date',
			},
		],
		value: modal,
		onChange: update,
		formValidation: errors,
	})

	return (
		<Modal
			header="Formulário de Treino"
			onClose={() => {
				close()
			}}
			buttons={[
				{
					children: 'Duplicar',
					disabled: !modal.id,
					leftIcon: 'copy_all',
					onClick: () => {
						showQuestion(
							'Deseja realmente duplicar este treino?',
							'Você devera salvar o treino para efetivar.',
							() => {
								update({
									...modal,
									id: undefined,
									expirationDate: undefined,
								})
							}
						)
					},
					variation: 'secondary',
				},
				{
					children: 'Excluir',
					disabled: !modal.id,
					leftIcon: 'delete',
					onClick: () => {
						showQuestion('Deseja realmente excluir esse treino?', '', () => {
							remove(modal?.id || '', () => {
								close()
							})
						})
					},
					variation: 'secondary',
				},
				{
					children: 'Salvar',
					leftIcon: 'save',
					onClick: () => {
						if (!validate(modal)) {
							return
						}
						save(modal, () => {
							close()
						})
					},
				},
			]}
		>
			<FormDesign>
				<GroupWithLabel label="Informações Iniciais">
					{formRecord.name}
					{formRecord.description}
					{formRecord.expirationDate}
				</GroupWithLabel>
			</FormDesign>
		</Modal>
	)
}

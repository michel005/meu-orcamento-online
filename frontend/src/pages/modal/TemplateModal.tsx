import React, { useContext, useState } from 'react'
import { Modal } from '../../components/Modal'
import { ModalContext } from '../../context/ModalContext'
import { DatabaseContext, Movement, Template } from '../../context/DatabaseContext'
import { FormLayout } from '../../components/FormLayout'

export type TemplateModalType = {
	entity: Template
}

export const TemplateModal = ({ entity }: TemplateModalType) => {
	const { accounts, create, update, remove } = useContext(DatabaseContext)
	const { close } = useContext(ModalContext)

	const [template, setTemplate] = useState<Movement>(entity)

	return (
		<Modal
			header="Formulário de Template"
			onClose={() => {
				close('template')
			}}
			buttons={[
				{
					leftIcon: 'save',
					children: 'Salvar',
					onClick: () => {
						let tmp = { ...template }
						tmp.value = tmp.value * 100
						if (template.id) {
							update('template', tmp, () => close('template'))
						} else {
							create('template', tmp, () => close('template'))
						}
					},
				},
				{
					leftIcon: 'delete',
					children: 'Excluir',
					disabled: !template.id,
					variation: 'secondary',
					onClick: () => {
						remove('template', template?.id || '', () => close('template'))
					},
				},
			]}
		>
			<FormLayout
				fields={[
					{
						id: 'day',
						type: 'number',
						label: 'Dia de Vencimento',
						info: 'Dia de 1 a 31. Caso no mês o dia não seja válido, será preenchido com o dia mais próximo.',
					},
					{
						id: 'account',
						type: 'select',
						label: 'Conta Financeira',
						nullable: true,
						nullableLabel: 'Sem conta',
						options: accounts,
						variation: 'secondary',
						idModifier: (row) => row?.id,
						valueModifier: (row) => row?.name,
					},
					{
						id: 'description',
						label: 'Descrição',
					},
					{
						id: 'value',
						type: 'number',
						label: 'Valor',
					},
				]}
				onChange={setTemplate}
				value={template}
			>
				{(fields) => {
					return (
						<>
							<div data-row>
								{fields.day}
								{fields.account}
							</div>
							{fields.description}
							{fields.value}
						</>
					)
				}}
			</FormLayout>
		</Modal>
	)
}

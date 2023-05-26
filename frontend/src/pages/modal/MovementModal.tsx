import React, { useContext, useState } from 'react'
import { Modal } from '../../components/Modal'
import { ModalContext } from '../../context/ModalContext'
import { DatabaseContext, Movement } from '../../context/DatabaseContext'
import { FormLayout } from '../../components/FormLayout'
import { Label } from '../../components/Label'

export type MovementModalType = {
	entity: Movement
}

export const MovementModal = ({ entity }: MovementModalType) => {
	const { accounts, create, update, remove } = useContext(DatabaseContext)
	const { show, close } = useContext(ModalContext)

	const [movement, setMovement] = useState<Movement>(entity)

	return (
		<Modal
			header={
				<p>
					Formulário de Movimentação{' '}
					{movement?.template && <Label>{movement.template.description}</Label>}
				</p>
			}
			onClose={() => {
				close('movement')
			}}
			buttons={[
				{
					leftIcon: 'save',
					children: 'Salvar',
					onClick: () => {
						let tmp = { ...movement }
						tmp.value = tmp.value * 100
						if (movement.id) {
							update('movement', tmp, () => close('movement'))
						} else {
							create('movement', tmp, () => close('movement'))
						}
					},
				},
				movement?.template
					? {
							leftIcon: 'description',
							children: 'Template',
							variation: 'secondary',
							onClick: () => {
								show({
									entity: 'template',
									modal: {
										...movement?.template,
										value: (movement?.template?.value || 0) / 100,
									},
								})
								close('movement')
							},
					  }
					: null,
				{
					leftIcon: 'delete',
					children: 'Excluir',
					disabled: !movement.id,
					variation: 'secondary',
					onClick: () => {
						remove('movement', movement?.id || '', () => close('movement'))
					},
				},
			]}
		>
			<FormLayout
				fields={[
					{
						id: 'date',
						type: 'date',
						label: 'Data de Vencimento',
					},
					{
						id: 'account',
						type: 'select',
						label: 'Conta Financeira',
						nullableLabel: 'Selecione uma conta',
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
					{
						id: 'approved',
						type: 'checkbox',
						label: 'Aprovado',
					},
				]}
				onChange={setMovement}
				value={movement}
			>
				{(fields) => {
					return (
						<>
							<div data-row>
								{fields.date}
								{fields.account}
							</div>
							{fields.description}
							{fields.value}
							<div data-row>{fields.approved}</div>
						</>
					)
				}}
			</FormLayout>
		</Modal>
	)
}

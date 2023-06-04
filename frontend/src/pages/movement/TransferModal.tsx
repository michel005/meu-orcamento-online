import React, { useContext, useState } from 'react'
import { Modal } from '../../components/Modal'
import { ModalContext } from '../../context/ModalContext'
import { FormLayout } from '../../components/FormLayout'
import { TransferType } from '../../types/TransferType'
import { DatabaseContext } from '../../context/DatabaseContext'

export type TransferModalType = {
	entity: TransferType
}

export const MovementModal = ({ entity }: TransferModalType) => {
	const { accounts, create, update, remove } = useContext(DatabaseContext)
	const { showQuestion, close } = useContext(ModalContext)

	const [movement, setMovement] = useState<TransferType>(entity)

	return (
		<Modal
			style={{ zIndex: 'calc(var(--zindex-modal) + 1)' }}
			header="Formulário de Transferência"
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
				{
					leftIcon: 'delete',
					children: 'Excluir',
					disabled: !movement.id,
					variation: 'secondary',
					onClick: () => {
						showQuestion(
							'Exclusão de Lançamento',
							'Deseja realmente excluir este lançamento?',
							() => {
								remove('movement', movement?.id || '', () => {
									close('movement')
								})
							}
						)
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
							<div data-row data-no-strech>
								{fields.approved}
							</div>
						</>
					)
				}}
			</FormLayout>
		</Modal>
	)
}

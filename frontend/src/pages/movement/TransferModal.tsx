import React, { useContext, useState } from 'react'
import { Modal } from '../../components/Modal'
import { ModalContext } from '../../context/ModalContext'
import { FormLayout } from '../../components/FormLayout'
import { TransferType } from '../../types/TransferType'
import { DatabaseContext } from '../../context/DatabaseContext'

export type TransferModalType = {
	entity: TransferType
}

export const TransferModal = ({ entity }: TransferModalType) => {
	const { accounts, create, update, remove } = useContext(DatabaseContext)
	const { showQuestion, close } = useContext(ModalContext)

	const [transfer, setTransfer] = useState<TransferType>(entity)

	return (
		<Modal
			style={{ zIndex: 'calc(var(--zindex-modal) + 1)' }}
			header="Formulário de Transferência"
			onClose={() => {
				close('transfer')
			}}
			buttons={[
				{
					leftIcon: 'save',
					children: 'Salvar',
					onClick: () => {
						let tmp = { ...transfer }
						tmp.value = tmp.value * 100
					},
				},
			]}
			noOverflow={true}
		>
			<FormLayout
				fields={[
					{
						id: 'date',
						type: 'date',
						variation: 'secondary',
						label: 'Data de Vencimento',
					},
					{
						id: 'originAccount',
						type: 'select',
						label: 'Conta de Origem',
						nullableLabel: 'Selecione uma conta',
						options: accounts,
						variation: 'secondary',
						idModifier: (row) => row?.id,
						valueModifier: (row) => row?.name,
					},
					{
						id: 'destinyAccount',
						type: 'select',
						label: 'Conta de Destino',
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
				]}
				onChange={setTransfer}
				value={transfer}
			>
				{(fields) => {
					return (
						<>
							{fields.date}
							<div data-row>
								{fields.originAccount}
								{fields.destinyAccount}
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

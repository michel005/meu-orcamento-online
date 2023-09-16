import React from 'react'
import { Modal } from '../../../components/Modal'
import { useForm } from '../../../hooks/useForm'
import { useModal } from '../../../hooks/useModal'
import { useDatabase } from '../../../hooks/useDatabase'
import { Customer } from '../../../types/Entities.type'
import { SelectCustomerModalType } from './SelectCustomerModal.type'
import { DivRow } from '../../../components/DivRow'
import { DivColumn } from '../../../components/DivColumn'

export const SelectCustomerModal = () => {
	const { modal, showModal } = useModal<SelectCustomerModalType>('selectCustomer')
	const { data } = useDatabase<Customer>('customer')

	const { fields } = useForm<SelectCustomerModalType>({
		definition: {
			quickSearch: {
				label: 'Busca Rápida',
				type: 'text',
				placeholder: 'Nome, e-mail ou qualquer caracteristica do cliente',
			},
		},
		value: modal,
		onChange: showModal,
	})
	const filteredList = data.filter(
		(customer) =>
			customer.name?.toUpperCase().indexOf(modal?.quickSearch?.toUpperCase() || '') !== -1
	)

	return (
		<Modal
			onClose={() => {
				modal.showModal = false
				showModal(modal)
			}}
		>
			<h1>Selecione um cliente</h1>
			{fields.quickSearch}
			<DivColumn style={{ overflowY: 'auto', maxHeight: '200px' }}>
				{filteredList.map((customer) => {
					return (
						<DivRow style={{ gap: '7px' }}>
							{customer.picture ? (
								<img width={50} height={50} src={customer.picture} />
							) : (
								<div
									style={{
										maxWidth: '50px',
										width: '50px',
										height: '50px',
										backgroundColor: '#ccc',
									}}
								/>
							)}
							<DivColumn style={{ gap: '4px' }}>
								<a
									onClick={() => {
										modal?.whenSelectionChange?.(customer)
										modal.showModal = false
										showModal(modal)
									}}
								>
									{customer.name}
								</a>
								<p>{customer.email}</p>
							</DivColumn>
						</DivRow>
					)
				})}
			</DivColumn>
		</Modal>
	)
}

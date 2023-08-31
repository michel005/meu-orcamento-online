import React from 'react'
import { Table } from '../../components/Table'
import { ProductType, Supplier } from '../../types/Entities.type'
import { useDatabase } from '../../hooks/useDatabase'
import { useData } from '../../hooks/useData'
import { ButtonGroup } from '../../components/button/ButtonGroup'
import { Button } from '../../components/button/Button'
import { useModal } from '../../hooks/useModal'
import { DivColumn } from '../../components/DivColumn'
import { DivRow } from '../../components/DivRow'

export const SupplierFormPage_Products = () => {
	const supplierData = useData<Supplier>('supplier')
	const productDatabase = useDatabase<ProductType>('product')
	const supplierProductModal = useModal<ProductType>('supplierProduct')

	const supplierProducts = productDatabase.data.filter(
		(p) => p.supplierId === supplierData.data.id
	)

	return (
		<>
			<ButtonGroup>
				<Button
					leftIcon="add"
					onClick={() => {
						supplierProductModal.showModal({
							supplierId: supplierData.data.id,
						})
					}}
				>
					Cadastrar
				</Button>
			</ButtonGroup>
			<Table
				header={{
					name: {
						label: 'Nome',
						valueModifier: (row) => (
							<DivRow style={{ alignItems: 'flex-start' }}>
								{row?.picture && <img src={row?.picture?.base64} />}
								<DivColumn style={{ gap: '4px' }}>
									<a
										onClick={() => {
											supplierProductModal.showModal(row)
										}}
									>
										{row.name}
									</a>
									<small>{row.description}</small>
								</DivColumn>
							</DivRow>
						),
					},
					price: {
						alignment: 'right',
						label: 'Preço',
						type: 'currency',
					},
				}}
				value={supplierProducts}
			/>
		</>
	)
}

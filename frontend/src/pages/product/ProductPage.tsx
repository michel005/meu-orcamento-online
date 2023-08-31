import React from 'react'
import { Table } from '../../components/Table'
import { ProductType, Supplier } from '../../types/Entities.type'
import { DivColumn } from '../../components/DivColumn'
import { useDatabase } from '../../hooks/useDatabase'
import { DivRow } from '../../components/DivRow'
import { useData } from '../../hooks/useData'
import { useNavigate } from 'react-router-dom'

export const ProductPage = () => {
	const productData = useData<ProductType>('productForm')
	const productDatabase = useDatabase<ProductType>('product')
	const supplierDatabase = useDatabase<Supplier>('supplier')
	const supplierData = useData<Supplier>('supplier')
	const supplierTabData = useData<string>('supplier_tab', 'Info')
	const navigate = useNavigate()

	return (
		<>
			<Table
				header={{
					name: {
						label: 'Produto',
						valueModifier: (row) => (
							<DivRow style={{ alignItems: 'flex-start' }}>
								{row?.picture && <img src={row?.picture?.base64} />}
								<DivColumn style={{ gap: '0px', justifyContent: 'center' }}>
									<a
										onClick={() => {
											productData.setData(row)
											navigate('/product/form')
										}}
									>
										{row.name}
									</a>
									{row.description && <small>{row.description}</small>}
								</DivColumn>
							</DivRow>
						),
					},
					supplierId: {
						label: 'Fornecedor',
						valueModifier: (row) => {
							const supplier = supplierDatabase.findById(row.supplierId)
							return (
								<DivRow
									style={{
										alignItems: 'center',
									}}
								>
									{supplier?.picture && <img src={supplier?.picture?.base64} />}
									<a
										onClick={() => {
											supplierTabData.setData('Info')
											supplierData.setData(supplier || null)
											navigate('/supplier/form')
										}}
									>
										{supplier?.name}
									</a>
								</DivRow>
							)
						},
					},
					categories: {
						label: 'Categoria',
					},
					price: {
						alignment: 'right',
						label: 'Preço',
						type: 'currency',
					},
				}}
				value={productDatabase.data}
			/>
		</>
	)
}

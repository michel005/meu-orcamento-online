import React from 'react'
import { Table } from '../../components/Table'
import { useDatabase } from '../../hooks/useDatabase'
import { ProductType, Supplier } from '../../types/Entities.type'
import { useNavigate } from 'react-router-dom'
import { useData } from '../../hooks/useData'
import { DivRow } from '../../components/DivRow'
import { NumberUtils } from '../../utils/NumberUtils'

export const SupplierPage = () => {
	const supplierDatabase = useDatabase<Supplier>('supplier')
	const productDatabase = useDatabase<ProductType>('product')
	const supplierData = useData<Supplier>('supplier')
	const supplierTabData = useData<string>('supplier_tab', 'Info')
	const navigate = useNavigate()

	return (
		<>
			<Table
				header={{
					name: {
						label: 'Nome do Fornecedor',
						valueModifier: (row) => (
							<DivRow style={{ alignItems: 'center' }}>
								{row?.picture && <img src={row?.picture?.base64} />}
								<a
									onClick={() => {
										supplierTabData.setData('Info')
										supplierData.setData(row)
										navigate('/supplier/form')
									}}
								>
									{row.name}
								</a>
							</DivRow>
						),
					},
					email: {
						label: 'E-mail',
					},
					locale: {
						label: 'Local',
						valueModifier: (row) =>
							`${row?.address?.city || 'Sem cidade'} / ${
								row?.address?.state || 'Sem estado'
							} / ${row?.address?.country || 'Sem país'}`,
					},
					priceSum: {
						alignment: 'right',
						label: 'Total de Produtos',
						valueModifier: (row) =>
							NumberUtils.numberToCurrency(
								productDatabase.data
									.filter((x) => x.supplierId === row.id)
									.map((x) => x.price)
									.reduce((x, y) => (x || 0) + (y || 0), 0)
							),
					},
				}}
				value={supplierDatabase.data}
			/>
		</>
	)
}

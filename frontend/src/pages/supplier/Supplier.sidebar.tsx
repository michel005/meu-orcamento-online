import React from 'react'
import { Button } from '../../components/button/Button'
import { Supplier } from '../../types/Entities.type'
import { useData } from '../../hooks/useData'
import { useNavigate } from 'react-router-dom'

export const SupplierSidebar = () => {
	const supplierData = useData<Supplier>('supplier')
	const supplierTabData = useData<string>('supplier_tab', 'Info')
	const navigate = useNavigate()

	return (
		<>
			<Button
				leftIcon="add"
				variation="sidebar"
				onClick={() => {
					supplierTabData.setData('Info')
					supplierData.setData({
						active: true,
					})
					navigate('/supplier/form')
				}}
			>
				Novo Fornecedor
			</Button>
		</>
	)
}

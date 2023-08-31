import React, { CSSProperties, useContext, useEffect, useState } from 'react'
import { ButtonGroup } from '../../components/button/ButtonGroup'
import { Button } from '../../components/button/Button'
import { Table } from '../../components/Table'
import { useDatabase } from '../../hooks/useDatabase'
import { AddressType, Supplier } from '../../types/Entities.type'
import { useNavigate } from 'react-router-dom'
import { DivColumn } from '../../components/DivColumn'
import { useForm } from '../../hooks/useForm'
import { useData } from '../../hooks/useData'
import { SupplierFormPageStyle } from './SupplierFormPage.style'
import { DivRow } from '../../components/DivRow'
import { Label } from '../../components/Label.style'
import { useMessage } from '../../hooks/useMessage'
import { InputGroup } from '../../components/input/InputGroup'
import { useValidation } from '../../hooks/useValidation'
import { Tabs } from '../../components/Tabs'
import { ConfigContext } from '../../contexts/ConfigContext'
import { SupplierFormPage_Info } from './SupplierFormPage_Info'
import { SupplierFormPage_Products } from './SupplierFormPage_Products'

export const SupplierFormPage = () => {
	const { status } = useContext(ConfigContext)
	const supplierData = useData<Supplier>('supplier')
	const supplierTabData = useData<string>('supplier_tab', 'Info')
	const navigate = useNavigate()

	useEffect(() => {
		if (status.data) {
			if (!supplierData.data) {
				navigate('/supplier')
			}
		}
	}, [status.data])

	return (
		<SupplierFormPageStyle>
			{supplierData.data?.name && (
				<DivRow
					className="supplierInfo"
					style={
						{
							'--base64': `url(${supplierData.data?.picture?.base64})`,
						} as CSSProperties
					}
				>
					{supplierData.data?.picture && <img src={supplierData.data?.picture?.base64} />}
					<DivColumn>
						<h1>{supplierData.data?.name}</h1>
						<p>{supplierData.data?.email}</p>
						<p>{supplierData.data?.phone}</p>
					</DivColumn>
				</DivRow>
			)}
			{!supplierData.data?.id && <h1>Novo Fornecedor</h1>}
			{!supplierData.data?.id && <SupplierFormPage_Info />}
			{supplierData.data?.id && (
				<Tabs
					tabs={{
						Info: {
							label: 'Informações',
							children: <SupplierFormPage_Info />,
						},
						Products: {
							label: 'Produtos',
							children: <SupplierFormPage_Products />,
						},
					}}
					currentTab={supplierTabData.data}
					onChange={supplierTabData.setData}
				/>
			)}
		</SupplierFormPageStyle>
	)
}

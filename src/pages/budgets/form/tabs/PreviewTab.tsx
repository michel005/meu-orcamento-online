import React from 'react'
import style from './PreviewTab.module.scss'
import { useData } from '../../../../hooks/useData'
import { Budget, Customer, Service } from '../../../../types/Entities.type'
import { Label } from '../../../../components/Label.style'
import { DivColumn } from '../../../../components/DivColumn'
import { useDatabase } from '../../../../hooks/useDatabase'
import { DivRow } from '../../../../components/DivRow'
import { Table } from '../../../../components/table/Table'
import { NumberUtils } from '../../../../utils/NumberUtils'

export const PreviewTab = () => {
	const formData = useData<Budget>('budgetForm')
	const databaseCustomer = useDatabase<Customer>('customer')

	const customer = databaseCustomer.data.find((x) => x._id == formData.data.customerId)
	const address = Object.keys(customer?.address || {}).map(
		(x) => (customer?.address as any)?.[x] || ''
	)

	return (
		<div className={style.previewTab}>
			<div className={style.page}>
				<header>
					<h1>{formData.data.title}</h1>
					<p>{formData.data.description}</p>
				</header>
				{customer && (
					<DivColumn className={style.customerInfo}>
						<DivRow>
							{customer.picture && <img src={customer.picture} />}
							<DivRow className={style.userInfoColumns}>
								<DivColumn>
									<DivColumn style={{ gap: '4px' }}>
										<Label>Nome Completo</Label>
										<p>{customer.name}</p>
									</DivColumn>
									<DivColumn style={{ gap: '4px' }}>
										<Label>E-mail</Label>
										<p>{customer?.email || 'Não informado'}</p>
									</DivColumn>
								</DivColumn>
								<DivColumn>
									<DivColumn style={{ gap: '4px' }}>
										<Label>Telefone</Label>
										<p>{customer?.phone || 'Não informado'}</p>
									</DivColumn>
									<DivColumn style={{ gap: '4px' }}>
										<Label>Endereço</Label>
										<p>
											{address.length > 0
												? address.join(', ')
												: 'Não informado'}
										</p>
									</DivColumn>
								</DivColumn>
							</DivRow>
						</DivRow>
					</DivColumn>
				)}
				<DivColumn className={style.productsTable}>
					<h3>Produtos e Serviços</h3>
					<Table<
						Service & {
							sum?: any
						}
					>
						header={{
							name: {
								label: 'Nome',
								valueModifier: (row, rowIndex) => (
									<DivRow>
										{row.picture && <img src={row.picture} />}
										<p style={{ alignSelf: 'center' }}>{row.name}</p>
									</DivRow>
								),
							},
							amount: {
								alignment: 'center',
								label: 'Quantidade',
							},
							price: {
								alignment: 'right',
								label: 'Valor Unitário',
								type: 'currency',
							},
							sum: {
								alignment: 'right',
								label: 'Total',
								type: 'currency',
								valueModifier: (row) => (row.amount || 0) * (row.price || 0),
							},
						}}
						footer={
							<tr>
								<th colSpan={3} data-alignment="left">
									Total Geral
								</th>
								<th data-alignment="right">
									{NumberUtils.numberToCurrency(
										(formData.data?.services || [])
											.map((row) => (row.amount || 0) * (row.price || 0))
											.reduce((x, y) => x + y, 0)
									)}
								</th>
							</tr>
						}
						value={formData.data?.services || []}
						pagination={false}
					/>
				</DivColumn>
			</div>
		</div>
	)
}

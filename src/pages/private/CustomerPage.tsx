import React, { useEffect } from 'react'
import { usePage } from '../../hooks/usePage'
import { SortUtils } from '../../utils/SortUtils'
import style from './CustomerPage.module.scss'
import { CustomerCard } from './customers/CustomerCard'
import { CustomerForm } from './customers/CustomerForm'
import { CustomerType } from '../../types/AllTypes'
import { CustomerFilter } from './customers/CustomerFilter'
import { Table } from '../../components/Table'
import { ButtonGhost } from '../../components/Button'
import { FlexRow } from '../../components/FlexRow'
import { CustomerBag } from './customers/CustomerBag'
import { PersonType } from '../../constants/PersonType'
import { Label } from '../../components/Label'
import { UserPicture } from '../../components/UserPicture'

export const CustomerPage = () => {
	const { form, api, pageData, apiData } = usePage('customer')

	const filteredData = apiData.data
		.filter(
			(x: CustomerType) =>
				!pageData.data.general_search ||
				x.full_name.toLowerCase().includes(pageData.data.general_search.toLowerCase()) ||
				x.email.toLowerCase().includes(pageData.data.general_search.toLowerCase()) ||
				x.document_number
					.toLowerCase()
					.includes(pageData.data.general_search.toLowerCase()) ||
				JSON.stringify(x.address || {})
					.toLowerCase()
					.includes(pageData.data.general_search.toLowerCase())
		)
		.filter((x: CustomerType) => !pageData.data?.favorite || x.favorite)
		// .filter((x: CustomerType) => x.active === pageData.data?.active)
		.filter(
			(x: CustomerType) =>
				!pageData.data?.personType || pageData.data?.personType === x.person_type
		)
		.sort((x: CustomerType, y: CustomerType) => SortUtils.sort(x, y, 'full_name'))

	useEffect(() => {
		api.getAll()
		form.close()
	}, [])

	return (
		<div className={style.customerPage} data-page="customer">
			{form.originalValue && <CustomerForm />}
			<CustomerFilter />
			{pageData.data.view === 'table' && (
				<div className={style.pageContent}>
					<Table
						definition={{
							full_name: {
								header: 'Nome Completo',
								type: 'string',
								valueOverride: (row: CustomerType) => {
									return (
										<>
											<UserPicture
												picture={row.picture?.value}
												id={row._id}
												name={row.full_name}
												size="32px"
											/>
											<div className={style.tableFullNameAndEmail}>
												<a
													onClick={() => {
														form.show(row, () => api.getAll())
													}}
												>
													{row.full_name}
												</a>
												<p>{row.email}</p>
											</div>
										</>
									)
								},
								priority: 'primary',
							},
							email: {
								header: 'E-mail',
								type: 'string',
							},
							person_type: {
								header: 'Tipo',
								type: 'string',
								valueOverride: (row: CustomerType) => {
									return (
										<Label color={row.person_type === 'PF' ? 'green' : 'red'}>
											{PersonType[row.person_type]}
										</Label>
									)
								},
								priority: 'secondary',
							},
							locale: {
								header: 'Local',
								type: 'string',
								valueOverride: (row: CustomerType) => {
									return (
										<>
											{row.address?.city} - {row.address?.state} -{' '}
											{row.address?.country}
										</>
									)
								},
							},
							active: {
								header: 'Situação',
								type: 'domain',
								keyValue: [
									['true', 'Ativo'],
									['false', 'Inativo'],
								],
								width: '100px',
								priority: 'secondary',
							},
							commands: {
								alignment: 'center',
								header: '',
								type: 'string',
								valueOverride: (customer) => {
									return (
										<FlexRow>
											<ButtonGhost
												className={style.favoriteButton}
												leftIcon="favorite"
												data-favorite={customer.favorite}
												onClick={() => {
													api.updateProperty({
														id: customer._id,
														silently: true,
														propName: 'favorite',
														propValue: !customer?.favorite,
														onSuccess: () => {
															api.getAll({ silently: true })
														},
													})
												}}
											/>
											<CustomerBag
												customer={customer}
												arrowPosition="top-right"
												cardMode={true}
												onSuccess={() => api.getAll({ silently: true })}
											/>
										</FlexRow>
									)
								},
								width: '10px',
								priority: 'primary',
							},
						}}
						value={filteredData}
					/>
				</div>
			)}
			{pageData.data.view === 'cards' && (
				<div className={style.pageContent}>
					{filteredData.map((customer: CustomerType) => {
						return (
							<CustomerCard
								key={customer._id}
								customer={customer}
								onClose={() => api.getAll()}
							/>
						)
					})}
				</div>
			)}
		</div>
	)
}

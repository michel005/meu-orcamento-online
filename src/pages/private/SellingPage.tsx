import React from 'react'
import style from './SellingPage.module.scss'
import { usePage } from '../../hooks/usePage'
import { ProductType, SellType } from '../../types/AllTypes'
import { Table } from '../../components/Table'
import { UserPicture } from '../../components/UserPicture'
import { SellStatus } from '../../constants/SellStatus'

export const SellingPage = () => {
	const { api, form, apiData, pageData } = usePage<SellType>('sell')

	return (
		<div className={style.sellingPage}>
			<div className={style.pageContent}>
				<Table
					definition={{
						created: {
							header: 'Data',
							type: 'date',
							valueOverride: (row: ProductType) => {
								return row.created.split(' ')[0]
							},
							width: '100px',
						},
						customer: {
							header: 'Cliente',
							type: 'string',
							valueOverride: (row: SellType) => {
								return (
									<>
										<UserPicture
											picture={row.customer.picture?.value}
											name={row.customer.full_name}
											size="32px"
										/>
										<div className={style.tableTitleAndDescription}>
											<a
												onClick={() => {
													form.show(row, () => api.getAll())
												}}
											>
												{row.customer.full_name}
											</a>
											<p>{row.customer.email}</p>
										</div>
									</>
								)
							},
						},
						finalPrice: {
							alignment: 'right',
							header: 'Valor',
							type: 'currency',
							width: '10%',
						},
						status: {
							header: 'Situação',
							type: 'domain',
							keyValue: Object.keys(SellStatus).map((x) => [x, SellStatus[x]]),
							width: '10%',
						},
					}}
					value={apiData.data || []}
				/>
			</div>
		</div>
	)
}

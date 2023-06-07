import React, { useContext } from 'react'
import style from './AccountPage.module.scss'
import { DatabaseContext } from '../../context/DatabaseContext'
import { Table } from '../../components/Table'
import { MovementUtils } from '../../utils/MovementUtils'
import { PageContext } from '../../context/PageContext'
import { ModalContext } from '../../context/ModalContext'
import { AccountCategories } from '../../constants/AccountCategories'
import { DateUtils } from '../../utils/DateUtils'

export const AccountPage = () => {
	const { accounts, movements } = useContext(DatabaseContext)
	const { show } = useContext(ModalContext)
	const { data } = useContext(PageContext)

	return (
		<div className={style.accountPage}>
			<div className={style.content}>
				<Table
					definition={[
						{
							field: 'name',
							label: 'Nome da Conta',
						},
						{
							field: 'category',
							label: 'Categoria',
							valueModifier: (row: any) => AccountCategories[row.category],
						},
						{
							field: 'balance',
							label: 'Saldo Atual',
							align: 'right',
							valueModifier: (row: any) =>
								(MovementUtils.balance(movements, row) / 100).toLocaleString(
									'pt-br',
									{
										style: 'currency',
										currency: 'BRL',
									}
								),
						},
						{
							field: 'futurebalance',
							label: 'Saldo Previsto',
							align: 'right',
							valueModifier: (row: any) =>
								(
									MovementUtils.futureBalance(
										movements,
										row,
										DateUtils.dateToString(
											new Date(
												new Date().getFullYear(),
												new Date().getMonth() + 1,
												0
											)
										)
									) / 100
								).toLocaleString('pt-br', {
									style: 'currency',
									currency: 'BRL',
								}),
						},
					]}
					footer={[
						<>
							<td colSpan={2}>Saldo Geral</td>
							<td data-alignment="right">
								{(
									MovementUtils.balance(
										movements.filter(
											(x) =>
												!data.account?.category ||
												x.account?.category === data.account?.category
										)
									) / 100
								).toLocaleString('pt-br', {
									style: 'currency',
									currency: 'BRL',
								})}
							</td>
							<td data-alignment="right">
								{(
									MovementUtils.futureBalance(
										movements.filter(
											(x) =>
												!data.account?.category ||
												x.account?.category === data.account?.category
										),
										null,
										DateUtils.dateToString(
											new Date(
												new Date().getFullYear(),
												new Date().getMonth() + 1,
												0
											)
										)
									) / 100
								).toLocaleString('pt-br', {
									style: 'currency',
									currency: 'BRL',
								})}
							</td>
						</>,
					]}
					onClick={(row) => {
						show({
							entity: 'account',
							modal: { ...row },
						})
					}}
					value={accounts.filter(
						(x) => !data.account?.category || x.category === data.account?.category
					)}
				/>
			</div>
		</div>
	)
}

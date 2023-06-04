import React, { useContext } from 'react'
import style from './AccountPage.module.scss'
import { AccountType, DatabaseContext } from '../../context/DatabaseContext'
import { Table } from '../../components/Table'
import { MovementUtils } from '../../utils/MovementUtils'
import { PageContext } from '../../context/PageContext'
import { ModalContext } from '../../context/ModalContext'

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
							field: 'type',
							label: 'Tipo',
							valueModifier: (row: any) => AccountType[row.type],
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
					]}
					footer={[
						<>
							<td colSpan={2}>Saldo Geral</td>
							<td data-alignment="right">
								{(
									MovementUtils.balance(
										movements.filter(
											(x) =>
												!data.account?.type ||
												x.account?.type === data.account?.type
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
						(x) => !data.account?.type || x.type === data.account?.type
					)}
				/>
			</div>
		</div>
	)
}

import React, { useContext, useState } from 'react'
import { CalendarInput } from '../components/CalendarInput'
import { Dropdown } from '../components/Dropdown'
import { Select } from '../components/Select'
import { Table } from '../components/Table'
import { Account, DatabaseContext, Movement } from '../context/DatabaseContext'
import { DateUtils } from '../utils/DateUtils'
import style from './MovementPage.module.scss'
import { MovementStatus } from '../constants/MovementStatus'
import { MovementUtils } from '../utils/MovementUtils'
import { ModalContext } from '../context/ModalContext'

export const MovementPage = () => {
	const databaseContext = useContext(DatabaseContext)
	const { show } = useContext(ModalContext)

	const [selectedAccount, setSelectedAccount] = useState<any | null>(null)
	const [selectedDate, setSelectedDate] = useState<any | null>({
		start: DateUtils.dateToString(new Date(new Date().getFullYear(), new Date().getMonth(), 1)),
		end: DateUtils.dateToString(
			new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)
		),
	})

	const allMovements = MovementUtils.status(databaseContext.movements)
		.filter((movement) => !selectedAccount?.id || selectedAccount?.id === movement?.account?.id)
		.filter(
			(movement) =>
				selectedDate?.start &&
				selectedDate?.end &&
				DateUtils.betweenString(
					movement?.date || '',
					selectedDate?.start,
					selectedDate?.end
				)
		)

	return (
		<div className={style.movementPage}>
			<div className={style.buttons}>
				<Dropdown
					leftIcon="add"
					list={[
						{
							children: 'Lançamento',
							leftIcon: 'shopping_cart',
							onClick: () => {
								show({
									entity: 'movement',
									modal: {
										date: DateUtils.dateToString(new Date()),
										account: null,
										value: 0,
										description: 'Novo Lançamento',
									},
								})
							},
						},
						{
							children: 'Template',
							leftIcon: 'description',
							list: [
								{
									children: 'Cadastrar',
									leftIcon: 'add',
									onClick: (event) => {
										event((x: any) => !x)
										show({
											entity: 'template',
											modal: {
												day: new Date().getDate(),
												account: null,
												value: 0,
												description: 'Novo Template',
											},
										})
									},
								},
								...databaseContext.templates
									.sort((x, y) => {
										if ((x.description || '') > (y.description || '')) return 1
										if ((x.description || '') < (y.description || '')) return -1
										return 0
									})
									.map((template) => {
										return {
											children: template.description,
											onClick: () => {
												show({
													entity: 'movement',
													modal: {
														...template,
														date: DateUtils.dateToString(
															new Date(
																new Date().getFullYear(),
																new Date().getMonth(),
																template.day || 1
															)
														),
														template: template,
														value: template.value / 100,
													},
												})
											},
										}
									}),
							],
						},
						{
							children: 'Transferência',
							leftIcon: 'sync_alt',
						},
					]}
				>
					Cadastrar
				</Dropdown>
				<Select
					variation="secondary"
					options={databaseContext.accounts || []}
					nullable={true}
					nullableLabel="Todas as Contas"
					idModifier={(account: Account) => account?.id}
					valueModifier={(account: Account) => account?.name}
					value={selectedAccount}
					onChange={setSelectedAccount}
				/>
				<CalendarInput
					variation="secondary"
					value={selectedDate}
					onChange={setSelectedDate}
					range={true}
				/>
			</div>
			<div className={style.calendarAndTable}>
				<div className={style.tableContainer}>
					<Table
						initialSort={{
							field: 'date',
							direction: 'ASC',
						}}
						noDataFoundLabel={
							!selectedDate?.start || !selectedDate?.end
								? 'Selecione um intervalo de datas antes de prosseguir'
								: `Nenhuma movimentação encontrada no período de ${selectedDate.start} até ${selectedDate.end}`
						}
						definition={[
							{
								field: 'date',
								label: 'Data',
							},
							{
								field: 'description',
								label: 'Descrição',
							},
							{
								field: 'account',
								label: 'Conta Financeira',
								valueModifier: (row) => row?.account?.name,
							},
							{
								field: 'value',
								label: 'Valor',
								align: 'right',
								valueModifier: (row) =>
									!row?.value
										? ''
										: (row?.value / 100).toLocaleString('pt-br', {
												style: 'currency',
												currency: 'BRL',
										  }),
							},
							{
								field: 'status',
								label: 'Situação',
								valueModifier: (row: Movement) =>
									MovementStatus[row?.status || 'pendent'],
							},
						]}
						value={allMovements}
						footer={[
							<>
								<td colSpan={3}>Saldo Atual</td>
								<td data-alignment="right">
									{(
										MovementUtils.balance(
											allMovements,
											selectedAccount,
											selectedDate?.end
										) / 100
									).toLocaleString('pt-br', {
										style: 'currency',
										currency: 'BRL',
									})}
								</td>
								<td></td>
							</>,
							<>
								<td colSpan={3}>Saldo Previsto</td>
								<td data-alignment="right">
									{(
										MovementUtils.futureBalance(
											allMovements,
											selectedAccount,
											selectedDate?.end
										) / 100
									).toLocaleString('pt-br', {
										style: 'currency',
										currency: 'BRL',
									})}
								</td>
								<td></td>
							</>,
						]}
						onClick={(row: Movement) => {
							show({
								entity: 'movement',
								modal: { ...row, value: row.value / 100 },
							})
						}}
					/>
				</div>
			</div>
		</div>
	)
}

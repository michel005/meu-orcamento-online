import React, { useContext } from 'react'
import { Table } from '../../components/Table'
import { DatabaseContext } from '../../context/DatabaseContext'
import { DateUtils } from '../../utils/DateUtils'
import style from './MovementPage.module.scss'
import { MovementStatus } from '../../constants/MovementStatus'
import { MovementUtils } from '../../utils/MovementUtils'
import { ModalContext } from '../../context/ModalContext'
import { PageContext } from '../../context/PageContext'
import { MovementType } from '../../types/MovementType'
import { Button } from '../../components/Button'

export const MovementPage = () => {
	const databaseContext = useContext(DatabaseContext)
	const { data } = useContext(PageContext)
	const { show } = useContext(ModalContext)

	const dateFilter = data.movement?.date

	const allMovements = MovementUtils.status(databaseContext.movements)
		.filter((movement) => !data.movement?.status || data.movement?.status === movement?.status)
		.filter(
			(movement) =>
				!data.movement?.account?.id || data.movement?.account?.id === movement?.account?.id
		)
		.filter(
			(movement) => !data.movement?.goal?.id || data.movement?.goal?.id === movement?.goal?.id
		)
		.filter(
			(movement) =>
				dateFilter?.start &&
				dateFilter?.end &&
				DateUtils.betweenString(movement?.date || '', dateFilter.start, dateFilter.end)
		)

	return (
		<div className={style.movementPage}>
			<div className={style.calendarAndTable}>
				<div className={style.tableContainer}>
					<Table
						initialSort={{
							field: 'date',
							direction: 'ASC',
						}}
						noDataFoundLabel={
							!dateFilter
								? 'Selecione um intervalo de datas antes de prosseguir'
								: `Nenhuma movimentação encontrada no período de ${dateFilter.start} até ${dateFilter.end}`
						}
						definition={[
							{
								field: 'date',
								label: 'Data',
							},
							{
								field: 'description',
								label: 'Descrição',
								className: style.description,
								valueModifier: (row) => (
									<span>
										{row.description}
										{row.goal && (
											<Button
												variation="link"
												disabled={true}
												leftIcon="flag"
											/>
										)}
									</span>
								),
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
								valueModifier: (row: MovementType) =>
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
											data.movement?.account || undefined,
											dateFilter?.end
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
											data.movement?.account || undefined,
											dateFilter?.end
										) / 100
									).toLocaleString('pt-br', {
										style: 'currency',
										currency: 'BRL',
									})}
								</td>
								<td></td>
							</>,
						]}
						onClick={(row: MovementType) => {
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

import React, { useContext, useMemo } from 'react'
import { Card } from '../../components/Card'
import style from './DashboardPage.module.scss'
import { Table } from '../../components/Table'
import { DatabaseContext } from '../../context/DatabaseContext'
import { MovementUtils } from '../../utils/MovementUtils'
import { MovementStatus } from '../../constants/MovementStatus'
import { ModalContext } from '../../context/ModalContext'
import { MovementType } from '../../types/MovementType'
import { GoalCard } from '../goal/GoalCard'
import { DashboardUtils } from '../../utils/DashboardUtils'
import { BarChart } from '../../components/BarChart'
import { Alert } from '../../components/Alert'

type CardType = {
	header: string
	description?: string
	value: any
}

type Category = {
	name: string
	value: number
}

export const DashboardPage = () => {
	const { settings, movements, goals, update } = useContext(DatabaseContext)
	const { close, show, showQuestionWithOptions } = useContext(ModalContext)

	const utils = useMemo(() => new MovementUtils(movements), [movements])
	const dashboardUtils = useMemo(() => new DashboardUtils(movements), [movements])
	const balance = utils.balance()
	const pendentMovements = utils.pendentMovements()

	const cardCollection: CardType[] = [
		{
			header: 'Saldo Atual',
			description: 'Soma de todas as movimentações aprovadas do mês atual',
			value: balance.current,
		},
		{
			header: 'Receitas',
			value: balance.income,
		},
		{
			header: 'Despesas',
			value: balance.expense,
		},
		{
			header: 'Balanço Mensal',
			description: 'Soma de todas as movimentações do mês atual',
			value: balance.monthBalance,
		},
	]

	return (
		<div className={style.dashboardPage}>
			<h1>Bem vindo</h1>
			{settings?.showBalanceCards && (
				<div className={style.cardCollection}>
					{cardCollection.map((card, cardKey) => {
						return (
							<Card key={cardKey}>
								<h2>{card.header}</h2>
								{card.description && <p>{card.description}</p>}
								<b>
									{(card.value / 100).toLocaleString('pt-br', {
										style: 'currency',
										currency: 'BRL',
									})}
								</b>
							</Card>
						)
					})}
				</div>
			)}
			{settings?.showPendentMovements && (
				<Card>
					<h2>Lançamentos Pendentes</h2>
					<p>Lançamentos que ainda não foram efetivados até o ultimo dia do mês atual</p>
					{pendentMovements.length > 0 ? (
						<Table
							noDataFoundLabel={'Parabéns, você não possui lançamentos pendentes =]'}
							initialSort={{
								field: 'date',
								direction: 'DESC',
							}}
							blockSort={true}
							definition={[
								{
									field: 'date',
									type: 'date',
									label: 'Data',
								},
								{
									field: 'description',
									label: 'Descrição',
								},
								{
									field: 'value',
									label: 'Valor',
									align: 'right',
									valueModifier: (row) =>
										(row.value / 100).toLocaleString('pt-br', {
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
							onClick={(row) => {
								showQuestionWithOptions(
									'Lançamento Pendente',
									'O que deseja fazer com este lançamento?',
									{
										children: 'Aprovar',
										leftIcon: 'check',
										onClick: () => {
											const tempRow = { ...row }
											tempRow.approved = true
											update('movement', tempRow, () => {
												close('message')
											})
										},
									},
									{
										children: 'Abrir',
										variation: 'secondary',
										leftIcon: 'file_open',
										onClick: () => {
											show({
												entity: 'movement',
												modal: {
													...row,
													value: row.value / 100,
												},
											})
											close('message')
										},
									},
									{
										children: 'Cancelar',
										variation: 'secondary',
										leftIcon: 'close',
										onClick: () => {
											close('message')
										},
									}
								)
							}}
							value={pendentMovements}
						/>
					) : (
						<Alert icon="info">Atualmente você não tem lançamentos pendentes</Alert>
					)}
				</Card>
			)}
			{settings?.showGoals && (
				<div className={style.goals}>
					{goals
						.filter((x) => x.status !== 'CANCELED' && x.status !== 'DONE')
						.map((goal) => {
							return <GoalCard key={goal.id} goal={goal} />
						})}
				</div>
			)}
			{settings?.showBalanceByDayChart && (
				<Card>
					<h2>Saldo por Dia</h2>
					<div className={style.balanceByDay}>
						<BarChart
							data={dashboardUtils.balanceByDay.map((balance, balanceDay) => [
								balanceDay + 1,
								balance / 100,
							])}
							valueModifier={(value) =>
								value.toLocaleString('pt-br', {
									style: 'currency',
									currency: 'BRL',
								})
							}
						/>
					</div>
				</Card>
			)}
		</div>
	)
}

import React, { useContext, useMemo } from 'react'
import { Card } from '../components/Card'
import style from './DashboardPage.module.scss'
import { Table } from '../components/Table'
import { DatabaseContext, Movement } from '../context/DatabaseContext'
import { MovementUtils } from '../utils/MovementUtils'
import { MovementStatus } from '../constants/MovementStatus'
import { ModalContext } from '../context/ModalContext'

type CardType = {
	header: string
	value: any
}

type Category = {
	name: string
	value: number
}

export type DashboardPageType = {
	pendentMovements?: Movement[]
	sumByCategory?: Category[]
}

export const DashboardPage = ({ pendentMovements = [], sumByCategory = [] }: DashboardPageType) => {
	const { movements } = useContext(DatabaseContext)
	const { show } = useContext(ModalContext)

	const utils = useMemo(() => new MovementUtils(movements), [movements])
	const balance = utils.balance()

	const cardCollection: CardType[] = [
		{
			header: 'Saldo Atual',
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
			value: balance.monthBalance,
		},
	]

	return (
		<div className={style.dashboardPage}>
			<h1>Bem vindo</h1>
			<div className={style.cardCollection}>
				{cardCollection.map((card, cardKey) => {
					return (
						<Card key={cardKey}>
							<h2>{card.header}</h2>
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
			<Card>
				<h2>Lançamentos Pendentes</h2>
				<p>Lançamentos que ainda não foram efetivados até o ultimo dia do mês atual</p>
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
							valueModifier: (row: Movement) =>
								MovementStatus[row?.status || 'pendent'],
						},
					]}
					onClick={(row) => {
						show({
							entity: 'movement',
							modal: {
								...row,
								value: row.value / 100,
							},
						})
					}}
					value={utils.pendentMovements()}
				/>
			</Card>
			<div className={style.cardCollection} style={{ justifyContent: 'center' }}>
				<div className={style.allForToday}>
					<img src="https://cdn-icons-png.flaticon.com/256/6065/6065481.png" />
				</div>
			</div>
		</div>
	)
}

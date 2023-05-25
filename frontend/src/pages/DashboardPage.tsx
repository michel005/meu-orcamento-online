import React, { useContext } from 'react'
import { Card } from '../components/Card'
import style from './DashboardPage.module.scss'
import { Table } from '../components/Table'
import { BarChart } from '../components/BarChart'
import { DatabaseContext } from '../context/DatabaseContext'

type Card = {
	header: string
	description: string
	value: number
}

type Movement = {
	date: string
	description: string
	value: number
}

type Category = {
	name: string
	value: number
}

export type DashboardPageType = {
	cardCollection?: Card[]
	pendentMovements?: Movement[]
	sumByCategory?: Category[]
}

export const DashboardPage = ({
	cardCollection = [],
	pendentMovements = [],
	sumByCategory = [],
}: DashboardPageType) => {
	return (
		<div className={style.dashboardPage}>
			<h1>Bem vindo</h1>
			<div className={style.cardCollection}>
				{cardCollection.map((card, cardKey) => {
					return (
						<Card key={cardKey}>
							<h2>{card.header}</h2>
							<p>{card.description}</p>
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
			<div className={style.cardCollection}>
				<Card>
					<h2>Lançamentos Pendentes</h2>
					<Table
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
								field: 'value',
								label: 'Valor',
								align: 'right',
								valueModifier: (row) =>
									(row.value / 100).toLocaleString('pt-br', {
										style: 'currency',
										currency: 'BRL',
									}),
							},
						]}
						value={pendentMovements}
					/>
				</Card>
				<Card>
					<h2>Categorias</h2>
					<BarChart data={sumByCategory.map(({ name, value }) => [name, value])} />
				</Card>
			</div>
			<div className={style.cardCollection} style={{ justifyContent: 'center' }}>
				<div className={style.allForToday}>
					<img src="https://cdn-icons-png.flaticon.com/256/6065/6065481.png" />
				</div>
			</div>
		</div>
	)
}

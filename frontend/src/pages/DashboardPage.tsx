import React from 'react'
import { Card } from '../components/Card'
import style from './DashboardPage.module.scss'
import { Table } from '../components/Table'
import { BarChart } from '../components/BarChart'

export const DashboardPage = () => {
	return (
		<div className={style.dashboardPage}>
			<h1>Bem vindo</h1>
			<div className={style.cardCollection}>
				<Card>
					<h2>Saldo Atual</h2>
					<p>Valor acumulado em todas as suas contas até o dia de hoje</p>
					<b>R$ 1200,00</b>
				</Card>
				<Card>
					<h2>Saldo Atual</h2>
					<p>Valor acumulado em todas as suas contas até o dia de hoje</p>
					<b>R$ 1200,00</b>
				</Card>
				<Card>
					<h2>Saldo Atual</h2>
					<p>Valor acumulado em todas as suas contas até o dia de hoje</p>
					<b>R$ 1200,00</b>
				</Card>
				<Card>
					<h2>Saldo Atual</h2>
					<p>Valor acumulado em todas as suas contas até o dia de hoje</p>
					<b>R$ 1200,00</b>
				</Card>
				<Card>
					<h2>Saldo Atual</h2>
					<p>Valor acumulado em todas as suas contas até o dia de hoje</p>
					<b>R$ 1200,00</b>
				</Card>
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
						value={[
							{
								date: '10/05/2023',
								description: 'Recebimento de Salário',
								value: 1200000,
							},
							{
								date: '15/05/2023',
								description: 'Conta de Energia',
								value: -15000,
							},
						]}
					/>
				</Card>
				<Card>
					<h2>Categorias</h2>
					<BarChart
						data={[
							['Carro', 1200],
							['Energia', 150],
							['Água', 70],
							['Alimentação', 480],
						]}
					/>
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

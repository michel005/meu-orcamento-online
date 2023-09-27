import React from 'react'
import style from '../Page.module.scss'
import styleDashboard from './DashboardPage.module.scss'
import { useDatabase } from '../../hooks/useDatabase'
import { Budget, Customer } from '../../types/Entities.type'
import { Card } from '../../components/Card'
import { DivRow } from '../../components/DivRow'
import { DivColumn } from '../../components/DivColumn'
import { Table } from '../../components/table/Table'
import { DateUtils } from '../../utils/DateUtils'
import { SortUtils } from '../../utils/SortUtils'

export const DashboardPage = () => {
	const { data: customerDatabase } = useDatabase<Customer>('customer')
	const { data: budgetDatabase } = useDatabase<Budget>('budget')
	const myUser = customerDatabase.find((x) => x.email === 'mdgrigoli@hotmail.com.br')

	return (
		<div className={style.page}>
			<DivColumn className={styleDashboard.header}>
				<p>Bem vindo,</p>
				<h1>{myUser?.name}</h1>
			</DivColumn>
			<DivRow>
				<Card>
					<h3>Orçamentos pendentes</h3>
					<small>5 mais antigos</small>
					<p>
						Estes orçamentos estão aguardando a aprovação do seu cliente. Caso seu
						cliente demore muito para aprovar o orçamento, recomendamos entrar em
						contato e descobrir se ha algum problema.
					</p>
					<Table
						header={{
							created: {
								label: 'Data de Cadastro',
							},
							title: {
								label: 'Orçamento',
							},
							amount: {
								alignment: 'right',
								label: 'Valor Total',
								type: 'currency',
								valueModifier: (row: Budget) =>
									(row.services || [])
										.map((x: any) => x.amount * x.price)
										.reduce((x: number, y: number) => x + y, 0),
								width: '200px',
							},
						}}
						pagination={false}
						value={budgetDatabase
							.filter((x) => x.status === 'pending')
							.sort((x, y) => SortUtils.sortDate(x, y, 'created', 'DESC'))
							.filter((_, index) => index <= 4)}
					/>
				</Card>
				<Card>
					<h3>Orçamentos aprovados</h3>
					<p>
						Estes orçamentos já foram aprovados pelo seu cliente e estão aguardando sua
						execução.
					</p>
					<Table
						header={{
							created: {
								label: 'Data de Cadastro',
							},
							title: {
								label: 'Orçamento',
							},
							estimatedDate: {
								label: 'Prazo',
								type: 'date',
							},
						}}
						pagination={false}
						value={budgetDatabase.filter((x) => x.status === 'accepted')}
					/>
				</Card>
			</DivRow>
		</div>
	)
}

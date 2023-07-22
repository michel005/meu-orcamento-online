import React from 'react'
import { CardLayout } from '../../components/CardLayout'
import { Card } from '../../components/Card'
import { List } from '../../components/List'
import { Table } from '../../components/Table'
import style from './index.module.scss'
import { BarChart } from '../../components/BarChart'
import { NumberUtils } from '../../utils/NumberUtils'
import { Alert } from '../../components/Alert'

export const DashboardPage = () => {
	return (
		<>
			<h1>Bem vindo, Michel</h1>
			<CardLayout>
				<div data-row>
					<div data-column style={{ flexGrow: 3 }}>
						<Card>
							<h2>Alimentos mais consumidos</h2>
							<p>
								Veja se você realmente esta consumindo alimentos saldáveis com mais
								frequência.
							</p>
							<Table
								definition={[
									{
										field: 'name',
										label: 'Alimento',
									},
									{
										field: 'weight',
										label: 'Peso (kg)',
									},
									{
										field: 'calories',
										label: 'Calorias (kl)',
									},
								]}
								value={[
									{
										name: 'Arroz',
										calories: 1200,
										weight: 1000,
									},
									{
										name: 'Feijão',
										calories: 800,
										weight: 600,
									},
									{
										name: 'Frango',
										calories: 2000,
										weight: 1400,
									},
								]}
							/>
						</Card>
						<Card>
							<h2>Pendências</h2>
							<p>
								Tem algo que você esqueceu de fazer? Sempre observe essa parte e
								sinta-se avisado
							</p>
							<Alert icon="info" variation="primary">
								Ative as notificações em seu navegador
							</Alert>
						</Card>
						<Card>
							<h2>Calorias por treino</h2>
							<p>
								Veja seu equilíbrio entre calorias consumidas por calorias gastas e
								veja se os valores estão de acordo com a sua diéta.
							</p>
							<BarChart
								data={[
									[1, (Math.random() * 10000) / 2],
									[2, Math.random() * 10000],
									[3, Math.random() * 10000],
									[4, Math.random() * 10000],
									[5, Math.random() * 10000],
									[6, Math.random() * 10000],
									[7, Math.random() * 10000],
									[8, Math.random() * 10000],
									[9, Math.random() * 10000],
									[10, Math.random() * 10000],
								]}
								valueModifier={(row) => NumberUtils.numberToCurrency(row)}
							/>
						</Card>
					</div>
					<div data-column style={{ flexGrow: 1 }}>
						<Card header="Execuções do Mês" label="JUL / 2023">
							<p>
								Todas as execuções realizadas neste mês. Sentiu falta de alguma?
								Agora você ja sabe qual você deve priorizar.
							</p>
							<List
								className={style.list}
								itens={[
									{
										left: 'Treino A',
										right: 2,
									},
									{
										left: 'Treino B',
										right: 2,
									},
									{
										left: 'Treino C',
										right: 2,
									},
									{
										left: 'Treino D',
										right: 2,
									},
									{
										left: 'Treino E',
										right: 2,
									},
								]}
							/>
						</Card>
						<Card header="Total de Treinos" label="JUL / 2023">
							<p>Aqui você visualiza quantos treinos você ja realizou neste mês</p>
							<List
								className={style.list}
								itens={[
									{
										left: 'Treino A',
										right: 2,
									},
									{
										left: 'Treino B',
										right: 2,
									},
									{
										left: 'Treino C',
										right: 2,
									},
								]}
							/>
						</Card>
					</div>
				</div>
			</CardLayout>
		</>
	)
}

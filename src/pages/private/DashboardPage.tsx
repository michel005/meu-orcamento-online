import React from 'react'
import style from './DashboardPage.module.scss'
import styled from 'styled-components'
import { Icon } from '../../components/Icon'
import { BarChart } from '../../components/BarChart'

const Card = styled.div`
	@keyframes fadeOut {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	animation: fadeOut 0.25s linear;
	background-color: #fff;
	border: 1px solid #ccc;
	border-radius: var(--border-radius);
	display: flex;
	flex-direction: column;
	gap: 21px;
	min-width: 350px;
	padding: 21px;
	width: 350px;

	i {
		align-self: flex-start;
		border: 1px solid ${(props) => props.color || '#ccc'};
		color: ${(props) => props.color || '#666	'};
		font-size: 22px !important;
		padding: 10px;
	}

	h3 {
		font-size: 1.3em;
	}

	p {
		color: #aaa;
		flex-grow: 1;
		font-size: 16px;
		line-height: 1.3em;
	}
`

const daysInMonth = (month, year) => {
	return new Date(parseInt(year), parseInt(month) + 1, 0).getDate()
}

export const DashboardPage = () => {
	return (
		<div className={style.dashboardPage}>
			<section className={style.quickInfo}>
				<Card>
					<Icon icon="person" />
					<h3>Cadastre um novo cliente</h3>
					<p>
						Cadastrar um cliente ajuda que você tenha aqui, todas as informações dele e
						consiga entrar em contato caso necessário.
					</p>
					<a>Leia mais...</a>
				</Card>
				<Card>
					<Icon icon="shopping_bag" />
					<h3>Cadastre um novo produto</h3>
					<p>Seu cliente trouxe produtos para vender? Saiba como registra-los.</p>
					<a>Leia mais...</a>
				</Card>
				<Card>
					<Icon icon="list" />
					<h3>Lista de espera</h3>
					<p>
						Muitas pessoas estão enteressadas em um mesmo produto? Saiba como gerenciar
						esta situação.
					</p>
					<a>Leia mais...</a>
				</Card>
				<Card>
					<Icon icon="sell" />
					<h3>Registro de vendas</h3>
					<p>
						Efetive a venda de um produto e saiba utilizar todas as ferramentas e
						extrair todas as informações.
					</p>
					<a>Leia mais...</a>
				</Card>
			</section>
			<section>
				<BarChart
					title="Tipos de itens mais vendidos"
					values={[
						['x', Math.random()],
						['a', Math.random()],
						['z', Math.random()],
						['y', Math.random()],
					]}
				/>
				<BarChart
					title="Clientes mais recorrentes"
					values={[
						['x', Math.random()],
						['a', Math.random()],
						['z', Math.random()],
						['y', Math.random()],
						['y', Math.random()],
						['y', Math.random()],
						['y', Math.random()],
						['y', Math.random()],
					]}
				/>
				<BarChart
					title="Vendas por Mês"
					values={new Array(daysInMonth(new Date().getFullYear(), new Date().getMonth()))
						.fill(null)
						.map((_, index) => [`${index + 1}`, Math.random()])}
				/>
			</section>
		</div>
	)
}

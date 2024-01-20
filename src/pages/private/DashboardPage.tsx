import React, { useEffect, useState } from 'react'
import style from './DashboardPage.module.scss'
import { Icon } from '../../components/Icon'
import { BarChart } from '../../components/BarChart'
import { Card } from '../../components/Card'
import axios from 'axios'
import { SessionUtils } from '../../utils/SessionUtils'
import { ChartSellByMonth } from './dashboard/ChartSellByMonth'

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
				<ChartSellByMonth />
			</section>
		</div>
	)
}

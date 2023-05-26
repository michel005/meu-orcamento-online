import React, { useState } from 'react'
import style from './Sidebar.module.scss'
import { Button } from '../components/Button'
import { useLocation, useNavigate } from 'react-router-dom'

const options = [
	['dashboard', 'Dashboard', '/'],
	['wallet', 'Contas', '/accounts'],
	['shopping_cart', 'Lançamentos', '/movements'],
	['description', 'Templates', '/templates'],
	['flag', 'Metas Financeiras', '/goals'],
	['print', 'Relatórios', '/reports'],
	['settings', 'Ajustes', '/settings'],
]

export const Sidebar = () => {
	const [reduced, setReduced] = useState(false)
	const location = useLocation()
	const navigate = useNavigate()

	return (
		<div className={style.sidebar} data-reduced={reduced}>
			<div className={style.menuButton}>
				<Button leftIcon="menu_open" onClick={() => setReduced((x) => !x)} />
				<h2>GerFinWEB</h2>
			</div>
			<div className={style.options}>
				{options.map(([icon, option, path], index) => {
					return (
						<Button
							key={index}
							variation="secondary"
							data-active={location.pathname === path}
							leftIcon={icon.toString()}
							onClick={() => {
								navigate(path)
							}}
						>
							{!reduced && option}
						</Button>
					)
				})}
			</div>
			<div className={style.getStarted}>
				<img src="https://cdni.iconscout.com/illustration/premium/thumb/money-jar-3378163-2810783.png" />
				<b>Primeira vez aqui?</b>
				<p>Separamos alguns artigos especiais para te ajudar.</p>
				<Button variation="link">Comece Agora</Button>
			</div>
			<div className={style.user}>
				<img src="https://randomuser.me/api/portraits/men/40.jpg" />

				<div className={style.userInfo}>
					<b>Roland Coleman</b>
					<p>@roland.coleman</p>
				</div>
			</div>
		</div>
	)
}

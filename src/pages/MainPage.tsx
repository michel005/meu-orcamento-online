import React, { useContext, useState } from 'react'
import style from './MainPage.module.scss'
import { NavbarItems } from '../constants/NavbarItems'
import { NavLink, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { matchPath } from 'react-router'
import { ConfigContext } from '../contexts/ConfigContext'
import { Message } from '../components/Message'
import { NavbarItemsType } from '../constants/NavbarItems.type'
import { SelectCustomerModal } from './customers/modal/SelectCustomerModal'
import { Button } from '../components/button/Button'
import { useDatabase } from '../hooks/useDatabase'
import { Customer } from '../types/Entities.type'
import { Label } from '../components/Label.style'

const FakeElement = ({ item }: { item: NavbarItemsType }) => {
	const Element = item?.element

	return <Element />
}

export const MainPage = () => {
	const { data } = useDatabase<Customer>('customer')
	const [reduced, setReduced] = useState(false)
	const configContext = useContext(ConfigContext)
	const navigate = useNavigate()
	const location = useLocation()

	if (!configContext.status.database) {
		return <h1>Carregando...</h1>
	}

	const myUser = data.find((x) => x.email === 'mdgrigoli@hotmail.com.br')

	return (
		<div className={style.mainPage} data-reduced={reduced}>
			<nav className={style.navbar}>
				<NavLink to="/" className={style.logo}>
					Meu Orçamento <span>Online</span>
				</NavLink>
			</nav>
			<main className={style.container}>
				<aside className={style.sidebar}>
					<Button
						className={style.reduceButton}
						onClick={() => {
							setReduced((x) => !x)
						}}
						leftIcon={reduced ? 'menu' : 'menu_open'}
						variation="ghost"
					/>
					{NavbarItems.filter((item) => item.context.includes('navbar')).map((item) => {
						const isCurrentRoute =
							(item.link === '/' && location.pathname === item.link) ||
							(item.link !== '/' &&
								!!matchPath(
									{
										path: item.link,
										end: false,
										caseSensitive: true,
									},
									location.pathname
								))
						return (
							<Button
								key={item.link}
								onClick={() => {
									navigate(item.link)
								}}
								leftIcon={item.icon}
								variation="ghost"
								data-active={isCurrentRoute}
							>
								{item.title}
							</Button>
						)
					})}
				</aside>
				<section className={style.content}>
					<Routes>
						{NavbarItems.map((item, itemKey) => {
							return (
								<Route
									key={itemKey}
									path={item.link}
									element={<FakeElement item={item} />}
								/>
							)
						})}
						<Route path="*" element={<h1>Página não encontrada</h1>} />
					</Routes>
				</section>
			</main>
			{configContext.modal?.selectCustomer?.showModal && <SelectCustomerModal />}
			{configContext.message.map((messageContent, messageContentIndex) => (
				<Message
					key={messageContentIndex}
					index={messageContentIndex}
					{...messageContent}
				/>
			))}
		</div>
	)
}

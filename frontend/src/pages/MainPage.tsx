import React, { useContext, useState } from 'react'
import style from './MainPage.module.scss'
import { NavbarItems } from '../constants/NavbarItems'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { matchPath } from 'react-router'
import { ConfigContext } from '../contexts/ConfigContext'
import { Message } from '../components/Message'
import { NavbarItemsType } from '../constants/NavbarItems.type'
import { SelectCustomerModal } from './customers/modal/SelectCustomerModal'
import { Button } from '../components/button/Button'
import { DivRow } from '../components/DivRow'
import { useDatabase } from '../hooks/useDatabase'
import { Customer } from '../types/Entities.type'
import { DivColumn } from '../components/DivColumn'
import { Icon } from '../components/Icon'

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
			<nav className={style.options}>
				<DivRow className={style.logo}>
					<div className={style.logoFile}>
						<Icon icon="quick_reference_all" />
					</div>
					<DivColumn className={style.logoDetails}>
						<h1>Meu Orçamento</h1>
						<p>Online</p>
					</DivColumn>
				</DivRow>
				{NavbarItems.filter((item) => item.context.includes('navbar')).map((item) => {
					const isCurrentRoute =
						(item.link === '/' && location.pathname === item.link) ||
						(item.link !== '/' &&
							matchPath(
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
							variation={isCurrentRoute ? 'primary' : 'ghost'}
						>
							{!reduced && item.title}
						</Button>
					)
				})}
				<div style={{ flexGrow: 1 }} />
				{myUser && (
					<DivRow className={style.userInfo}>
						<img src={myUser.picture} />
						<p>{myUser.name}</p>
					</DivRow>
				)}
				<Button
					className={style.reduceButton}
					leftIcon="keyboard_arrow_left"
					variation="ghost"
					onClick={() => {
						setReduced((x) => !x)
					}}
					style={{ alignSelf: 'flex-end', width: 'auto' }}
				/>
			</nav>
			<main>
				<section>
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

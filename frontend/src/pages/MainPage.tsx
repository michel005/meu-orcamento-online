import React, { useContext, useEffect, useMemo } from 'react'
import { MainPageStyle } from './MainPage.style'
import { NavbarItems } from '../constants/NavbarItems'
import { NavLink, Route, Routes, useLocation } from 'react-router-dom'
import { ConfigContext } from '../contexts/ConfigContext'
import { Message } from '../components/Message'
import { useData } from '../hooks/useData'
import { useMessage } from '../hooks/useMessage'

export const MainPage = () => {
	const mainData = useData('main', {
		expand: true,
	})
	const { message, modal } = useContext(ConfigContext)
	const location = useLocation()
	const { showQuestion } = useMessage()

	const currentRoute = useMemo(
		() => NavbarItems.find((x) => x.link === location.pathname),
		[location]
	)

	useEffect(() => {
		if (currentRoute && currentRoute?.title) {
			document.title = currentRoute.title
		} else {
			document.title = 'Meu Bazar Online'
		}
	}, [currentRoute])

	return (
		<MainPageStyle data-hide-menu={!currentRoute?.sidebar || !mainData.data?.expand}>
			<section>
				<nav className="options">
					{NavbarItems.filter((item) => item.context.includes('navbar')).map(
						(item, itemKey) => {
							return <NavLink key={item.link} to={item.link} data-icon={item.icon} />
						}
					)}
					<div style={{ flexGrow: 1 }} />
					<a
						data-icon="logout"
						onClick={() => {
							showQuestion('Deseja realmente sair de sua conta?', '', () => {})
						}}
					/>
					<a
						data-icon={mainData.data?.expand ? 'menu_open' : 'menu'}
						onClick={() => {
							mainData.setDataProp('expand', !mainData.data?.expand)
						}}
					/>
				</nav>
				<nav className="subOptions">
					<header>
						<h2>{currentRoute?.title}</h2>
						{currentRoute?.subTitle && <small>{currentRoute?.subTitle}</small>}
					</header>
					{currentRoute?.sidebar}
				</nav>
			</section>
			<main>
				<section>
					{(!currentRoute?.sidebar || !mainData.data?.expand) && (
						<header>
							<h2>{currentRoute?.title}</h2>
							{currentRoute?.subTitle && <small>{currentRoute?.subTitle}</small>}
						</header>
					)}
					<Routes>
						{NavbarItems.map((item, itemKey) => {
							return (
								<Route
									key={itemKey}
									path={item.link}
									element={item?.element || <></>}
								/>
							)
						})}
						<Route path="*" element={<h1>Página não encontrada</h1>} />
					</Routes>
				</section>
			</main>
			{message.map((messageContent, messageContentIndex) => (
				<Message
					key={messageContentIndex}
					index={messageContentIndex}
					{...messageContent}
				/>
			))}
		</MainPageStyle>
	)
}

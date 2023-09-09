import React, { useContext, useEffect } from 'react'
import { MainPageStyle } from './MainPage.style'
import { NavbarItems } from '../constants/NavbarItems'
import { NavLink, Route, Routes } from 'react-router-dom'
import { ConfigContext } from '../contexts/ConfigContext'
import { Message } from '../components/Message'
import { useData } from '../hooks/useData'
import { useMessage } from '../hooks/useMessage'
import { NavbarItemsType } from '../constants/NavbarItems.type'

const FakeElement = ({ item }: { item: NavbarItemsType }) => {
	const { setSidebar } = useContext(ConfigContext)
	const Element = item?.element
	const Sidebar = item?.sidebar

	useEffect(() => {
		if (item?.sidebar) {
			setSidebar(<Sidebar />)
		} else {
			setSidebar(null)
		}
		return () => {
			setSidebar(null)
		}
	}, [item])

	return <Element />
}

export const MainPage = () => {
	const mainData = useData('main', {
		expand: true,
	})
	const configContext = useContext(ConfigContext)
	const { showQuestion } = useMessage()

	return (
		<MainPageStyle data-hide-menu={!configContext.sidebar || !mainData.data?.expand}>
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
				<nav className="subOptions">{configContext.sidebar}</nav>
			</section>
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
			{configContext.message.map((messageContent, messageContentIndex) => (
				<Message
					key={messageContentIndex}
					index={messageContentIndex}
					{...messageContent}
				/>
			))}
		</MainPageStyle>
	)
}

import React, { useContext, useEffect, useMemo } from 'react'
import { MainPageStyle } from './MainPage.style'
import { NavbarItems } from '../constants/NavbarItems'
import { NavLink, Route, Routes, useLocation } from 'react-router-dom'
import { ConfigContext } from '../contexts/ConfigContext'
import { Message } from '../components/Message'
import { SupplierFormPage_ProductsModal } from './supplier/SupplierFormPage_ProductsModal'

export const MainPage = () => {
	const { message, modal } = useContext(ConfigContext)
	const location = useLocation()

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
		<MainPageStyle>
			<nav>
				{NavbarItems.filter((item) => item.context.includes('navbar')).map(
					(item, itemKey) => {
						return <NavLink to={item.link} data-icon={item.icon}></NavLink>
					}
				)}
			</nav>
			{currentRoute?.sidebar && (
				<nav className="subOptions">
					<header>
						<h2>{currentRoute?.title}</h2>
						<small>{currentRoute?.subTitle}</small>
					</header>
					{currentRoute?.sidebar}
				</nav>
			)}
			<main>
				<section>
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
			{modal.supplierProduct && <SupplierFormPage_ProductsModal />}
			{message.map((messageContent, messageContentIndex) => (
				<Message index={messageContentIndex} {...messageContent} />
			))}
		</MainPageStyle>
	)
}

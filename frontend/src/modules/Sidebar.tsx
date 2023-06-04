import React, { useContext, useState } from 'react'
import style from './Sidebar.module.scss'
import { Button } from '../components/Button'
import { useLocation, useNavigate } from 'react-router-dom'
import { PageContext } from '../context/PageContext'
import { ModalContext } from '../context/ModalContext'

export const Sidebar = () => {
	const { showMessage } = useContext(ModalContext)
	const { pages } = useContext(PageContext)
	const [reduced, setReduced] = useState(false)
	const location = useLocation()
	const navigate = useNavigate()

	const currentPage = pages.find((e) => e.path === location.pathname)

	return (
		<div className={style.sidebar} data-reduced={reduced}>
			<div className={style.pages}>
				{pages.map(({ id, icon, name, path }) => {
					return (
						<Button
							key={id}
							data-active={location.pathname === path}
							leftIcon={icon.toString()}
							onClick={() => {
								navigate(path)
							}}
						/>
					)
				})}
				<div style={{ flexGrow: 1 }} />
				<Button
					data-active={location.pathname === '/settings'}
					leftIcon="settings"
					onClick={() => {
						navigate('/settings')
					}}
				/>
				<Button
					leftIcon="logout"
					onClick={() => {
						showMessage('Sair da dua conta', 'Deseja realmente sair da sua conta?')
					}}
				/>
			</div>
			{currentPage?.options && (
				<div className={style.options}>
					<h3>{currentPage?.name}</h3>
					{currentPage?.options}
				</div>
			)}
		</div>
	)
}

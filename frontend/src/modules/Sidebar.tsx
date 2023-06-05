import React, { useContext, useState } from 'react'
import style from './Sidebar.module.scss'
import { Button } from '../components/Button'
import { useLocation, useNavigate } from 'react-router-dom'
import { PageContext } from '../context/PageContext'
import { ModalContext } from '../context/ModalContext'
import { DatabaseContext } from '../context/DatabaseContext'

export const Sidebar = () => {
	const { refresh } = useContext(DatabaseContext)
	const { showMessage } = useContext(ModalContext)
	const { pages } = useContext(PageContext)
	const location = useLocation()
	const navigate = useNavigate()

	const [reduced, setReduced] = useState<boolean>(false)

	const currentPage = pages.find((e) => e.path === location.pathname)

	return (
		<div className={style.sidebar} data-reduced={reduced || !currentPage?.options}>
			<div className={style.pages}>
				<Button
					disabled={!currentPage?.options}
					leftIcon={reduced ? 'menu' : 'menu_open'}
					onClick={() => setReduced((x) => !x)}
				/>
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
				<Button leftIcon="refresh" onClick={refresh} />
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
			<div className={style.options}>
				<h3>{currentPage?.name}</h3>
				{currentPage?.options}
			</div>
		</div>
	)
}

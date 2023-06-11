import React, { useContext, useState } from 'react'
import style from './Sidebar.module.scss'
import { Button } from '../components/Button'
import { useLocation, useNavigate } from 'react-router-dom'
import { PageContext } from '../context/PageContext'

export const Sidebar = () => {
	const { pages } = useContext(PageContext)
	const location = useLocation()
	const navigate = useNavigate()

	const [reduced, setReduced] = useState<boolean>(false)

	return (
		<div className={style.sidebar} data-reduced={reduced}>
			{pages.map(({ id, icon, name, path }) => {
				return (
					<Button
						key={id}
						data-active={location.pathname === path}
						leftIcon={icon.toString()}
						onClick={() => {
							navigate(path)
						}}
					>
						<span>{name}</span>
					</Button>
				)
			})}
		</div>
	)
}

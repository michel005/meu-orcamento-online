import React from 'react'
import { Button } from '../../components/Button'
import { useLocation, useNavigate } from 'react-router-dom'
import { SidebarOptions } from '../../constants/SidebarOptions'
import style from './MainPageContextOptions.module.scss'

export const MainPageContextOptions = () => {
	const location = useLocation()
	const navigate = useNavigate()

	const currentOption = SidebarOptions.find((x) => x.path === location.pathname)

	return (
		<div className={style.mainPageContextOptions}>
			<div className={style.centered}>
				{SidebarOptions.filter((x) => !x.hide).map((option) => {
					return (
						<Button
							data-active={option.path === location.pathname}
							leftIcon={option.icon}
							onClick={() => {
								navigate(option.path)
							}}
							variation="link"
						>
							{option.label}
						</Button>
					)
				})}
			</div>
		</div>
	)
}

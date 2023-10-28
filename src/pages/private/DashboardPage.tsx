import React, { useContext } from 'react'
import { SessionContext } from '../../contexts/SessionContext'
import style from './DashboardPage.module.scss'
import { UserPicture } from '../../components/UserPicture'

export const DashboardPage = () => {
	const { currentUser } = useContext(SessionContext)

	return (
		<div className={style.dashboardPage}>
			<header>
				<UserPicture
					picture={currentUser.picture}
					name={currentUser.full_name}
					size="56px"
				/>
				<div className={style.welcome}>
					<h3>Bem vindo</h3>
					<h1>{currentUser.full_name}</h1>
				</div>
			</header>
		</div>
	)
}

import React, { useContext } from 'react'
import style from './GoalPage.module.scss'
import { DatabaseContext } from '../../context/DatabaseContext'
import { GoalCard } from './GoalCard'
import { PageContext } from '../../context/PageContext'

export const GoalPage = () => {
	const { goals } = useContext(DatabaseContext)
	const { data } = useContext(PageContext)

	return (
		<div className={style.goalPage}>
			{goals
				.filter((x) => !data.goal?.status || x.status === data.goal.status)
				.map((goal) => {
					return <GoalCard goal={goal} />
				})}
		</div>
	)
}

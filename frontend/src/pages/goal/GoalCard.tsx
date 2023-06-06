import { Button } from '../../components/Button'
import { Label } from '../../components/Label'
import { ProgressBar } from '../../components/ProgressBar'
import { Card } from '../../components/Card'
import { GoalType } from '../../types/GoalType'
import style from './GoalCard.module.scss'
import React, { useContext } from 'react'
import { ModalContext } from '../../context/ModalContext'
import { GoalStatus } from '../../constants/GoalStatus'
import { DatabaseContext } from '../../context/DatabaseContext'
import { MovementUtils } from '../../utils/MovementUtils'

export type GoalCardType = {
	goal: GoalType
	buttons?: any
}

export const GoalCard = ({ goal, buttons }: GoalCardType) => {
	const { movements } = useContext(DatabaseContext)
	const { show } = useContext(ModalContext)

	const balance = new MovementUtils(movements).goalBalance(goal)

	return (
		<Card
			className={style.card}
			data-archived={goal.status === 'DONE' || goal.status === 'CANCELED'}
		>
			<div className={style.header}>
				<Button
					className={style.title}
					variation="link"
					onClick={() => {
						show({
							entity: 'goal',
							modal: { ...goal, targetValue: goal.targetValue / 100 },
						})
					}}
				>
					<h2>{goal.name}</h2>
				</Button>
				{buttons && <div className={style.buttons}>{buttons}</div>}
			</div>
			<div className={style.labels}>
				<Label icon="source_notes">{GoalStatus[goal.status]}</Label>
				{goal.targetDate && <Label icon="calendar_month">{goal.targetDate}</Label>}
			</div>
			<p>{goal.description}</p>
			<ProgressBar
				progress={(100 * balance.current) / goal.targetValue}
				progress2={(100 * balance.future) / goal.targetValue}
			/>
			<div className={style.values}>
				<h3>
					{(balance.current / 100).toLocaleString('pt-br', {
						style: 'currency',
						currency: 'BRL',
					})}
				</h3>
				{balance.future !== balance.current && (
					<h3 className={style.fade}>
						{(balance.future / 100).toLocaleString('pt-br', {
							style: 'currency',
							currency: 'BRL',
						})}
					</h3>
				)}
				<div style={{ flexGrow: 1 }} />
				<h3>
					{(goal.targetValue / 100).toLocaleString('pt-br', {
						style: 'currency',
						currency: 'BRL',
					})}
				</h3>
			</div>
		</Card>
	)
}

import React, { useContext, useState } from 'react'
import style from './GoalPage.module.scss'
import { DatabaseContext } from '../../context/DatabaseContext'
import { GoalCard } from './GoalCard'
import { PageContext } from '../../context/PageContext'
import { Button } from '../../components/Button'
import { ModalContext } from '../../context/ModalContext'
import { GoalUtils } from '../../utils/GoalUtils'
import { MovementUtils } from '../../utils/MovementUtils'
import { DateUtils } from '../../utils/DateUtils'

export const GoalPage = () => {
	const { goals, movements, templates } = useContext(DatabaseContext)
	const { show } = useContext(ModalContext)
	const { data } = useContext(PageContext)

	const [showOthers, setShowOthers] = useState<boolean>(false)

	return (
		<div className={style.goalPage}>
			{goals
				.filter((x) => !data.goal?.status || x.status === data.goal.status)
				.filter(
					(x) =>
						showOthers ||
						data.goal?.status ||
						(x.status !== 'CANCELED' && x.status !== 'DONE')
				)
				.map((goal) => {
					const template = templates.find((x) => x.goal?.id === goal.id)
					const monthsToFinish = GoalUtils.monthsToFinish(goal)
					const currentBalance = new MovementUtils(movements).goalBalance(goal).current

					return (
						<GoalCard
							key={goal.id}
							goal={goal}
							buttons={
								<>
									{!template && (
										<Button
											variation="secondary"
											onClick={() => {
												show({
													entity: 'template',
													modal: {
														description: goal.name,
														goal: goal,
														recurrence: 'ONE_PER_MONTH',
														value:
															Math.round(
																(goal.targetValue -
																	currentBalance) /
																	monthsToFinish
															) / 100,
													},
												})
											}}
										>
											Criar Template
										</Button>
									)}
									{template &&
										goal.status !== 'CANCELED' &&
										goal.status !== 'DONE' && (
											<Button
												variation="secondary"
												onClick={() => {
													show({
														entity: 'movement',
														modal: {
															date: DateUtils.dateToString(
																new Date(
																	new Date().getFullYear(),
																	new Date().getMonth(),
																	template.day || 1
																)
															),
															description: template.description,
															account: template.account,
															goal: template.goal,
															template: template,
															value: template.value / 100,
														},
													})
												}}
											>
												Nova Lançamento
											</Button>
										)}
								</>
							}
						/>
					)
				})}
			{!data.goal?.status && (
				<Button
					variation="link"
					rightIcon={!showOthers ? 'expand_more' : 'expand_less'}
					onClick={() => {
						setShowOthers((x) => !x)
					}}
				>
					{!showOthers ? 'Mostrar' : 'Esconder'} Cancelados e Concluídos
				</Button>
			)}
		</div>
	)
}

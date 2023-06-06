import React, { useContext, useEffect, useState } from 'react'
import { Modal } from '../../components/Modal'
import { ModalContext } from '../../context/ModalContext'
import { DatabaseContext, Template } from '../../context/DatabaseContext'
import { FormLayout } from '../../components/FormLayout'
import { TemplateRecurrence } from '../../constants/TemplateRecurrence'
import { GoalCard } from '../goal/GoalCard'
import { Button } from '../../components/Button'
import { Card } from '../../components/Card'
import style from './TemplateModal.module.scss'

export type TemplateModalType = {
	entity: Template
}

export const TemplateModal = ({ entity }: TemplateModalType) => {
	const { accounts, goals, create, update, remove } = useContext(DatabaseContext)
	const { close, showQuestion } = useContext(ModalContext)

	const [template, setTemplate] = useState<Template>(entity)
	const [showGoals, setShowGoals] = useState<boolean>(false)

	useEffect(() => {
		setTemplate((x) => ({ ...x, ...entity }))
	}, [entity])

	return (
		<Modal
			className={style.modal}
			style={{ zIndex: 'calc(var(--zindex-modal) + 2)' }}
			header="Formulário de Template"
			onClose={() => {
				close('template')
			}}
			buttons={[
				{
					leftIcon: 'save',
					children: 'Salvar',
					onClick: () => {
						let tmp = { ...template }
						tmp.value = tmp.value * 100
						if (template.id) {
							update('template', tmp, () => close('template'))
						} else {
							create('template', tmp, () => close('template'))
						}
					},
				},
				{
					leftIcon: 'delete',
					children: 'Excluir',
					disabled: !template.id,
					variation: 'secondary',
					onClick: () => {
						showQuestion(
							'Exclusão de Template',
							'Deseja realmente excluir este template?',
							() => {
								remove('template', template?.id || '', () => close('template'))
							}
						)
					},
				},
			]}
		>
			<FormLayout
				fields={[
					{
						id: 'day',
						type: 'number',
						label: 'Dia de Vencimento',
						info: 'Dia de 1 a 31. Caso no mês o dia não seja válido, será preenchido com o dia mais próximo.',
					},
					{
						id: 'account',
						type: 'select',
						label: 'Conta Financeira',
						nullable: true,
						nullableLabel: 'Sem conta',
						options: accounts,
						variation: 'secondary',
						idModifier: (row) => row?.id,
						valueModifier: (row) => row?.name,
					},
					{
						id: 'description',
						label: 'Descrição',
					},
					{
						id: 'value',
						type: 'number',
						label: 'Valor',
					},
					{
						id: 'recurrence',
						type: 'select',
						label: 'Recorrência',
						options: Object.keys(TemplateRecurrence).map((x) => x),
						variation: 'secondary',
						idModifier: (x) => x,
						valueModifier: (x) => TemplateRecurrence[x],
					},
				]}
				onChange={setTemplate}
				value={template}
			>
				{(fields) => {
					return (
						<>
							<div data-row>
								{fields.day}
								{fields.account}
							</div>
							{fields.recurrence}
							{fields.description}
							{fields.value}
							<h3>Meta Financeira</h3>
							{template.goal ? (
								<>
									<GoalCard
										goal={template.goal}
										buttons={
											<Button
												leftIcon="delete"
												variation="link"
												onClick={() => {
													setTemplate((x) => {
														x.goal = null
														return { ...x }
													})
												}}
											/>
										}
									/>
								</>
							) : (
								<>
									{showGoals ? (
										<Card className={style.goalCard}>
											{goals
												.filter(
													(x) =>
														x.status !== 'CANCELED' &&
														x.status !== 'DONE'
												)
												.map((goal) => {
													return (
														<Button
															key={goal.id}
															onClick={() => {
																setShowGoals(false)
																setTemplate((x) => {
																	x.goal = { ...goal }
																	return { ...x }
																})
															}}
														>
															{goal.name}
														</Button>
													)
												})}
											<Button
												variation="secondary"
												onClick={() => {
													setShowGoals(false)
												}}
											>
												Cancelar
											</Button>
										</Card>
									) : (
										<Button
											leftIcon="add"
											variation="secondary"
											onClick={() => {
												setShowGoals(true)
											}}
										>
											Atribuir Meta Financeira
										</Button>
									)}
								</>
							)}
						</>
					)
				}}
			</FormLayout>
		</Modal>
	)
}

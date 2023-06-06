import React, { useContext, useEffect, useState } from 'react'
import { Modal } from '../../components/Modal'
import { ModalContext } from '../../context/ModalContext'
import { DatabaseContext } from '../../context/DatabaseContext'
import { FormLayout } from '../../components/FormLayout'
import { Alert } from '../../components/Alert'
import { Button } from '../../components/Button'
import { MovementType } from '../../types/MovementType'
import { GoalCard } from '../goal/GoalCard'
import { Card } from '../../components/Card'
import style from './MovementModal.module.scss'
import { useFormValidation } from '../../hook/useFormValidation'

export type MovementModalType = {
	entity: MovementType
}

export const MovementModal = ({ entity }: MovementModalType) => {
	const { accounts, goals, create, update, remove } = useContext(DatabaseContext)
	const { show, showQuestion, close } = useContext(ModalContext)

	const { validate, errors } = useFormValidation((movement: MovementType, errors) => {
		if (!movement.date) {
			errors.set('date', 'A data é obrigatória')
		}
		if (!movement.account) {
			errors.set('account', 'A conta financeira é obrigatória')
		}
		if (!movement.description || movement.description.trim() === '') {
			errors.set('description', 'A descrição é obrigatória')
		}
		if (!movement.value || movement.value === 0) {
			errors.set('value', 'O valor é obrigatório e deve ser maior que zero')
		}
	})

	const [movement, setMovement] = useState<MovementType>(entity)
	const [showGoals, setShowGoals] = useState<boolean>(false)

	useEffect(() => {
		setMovement((x) => ({ ...x, ...entity }))
	}, [entity])

	return (
		<Modal
			className={style.modal}
			style={{ zIndex: 'calc(var(--zindex-modal) + 1)' }}
			header="Formulário de Movimentação"
			onClose={() => {
				close('movement')
			}}
			buttons={[
				{
					leftIcon: 'save',
					children: 'Salvar',
					onClick: () => {
						let tmp = { ...movement }
						tmp.value = tmp.value * 100

						if (!validate(tmp)) {
							return
						}
						if (tmp.id) {
							update('movement', tmp, () => close('movement'))
						} else {
							create('movement', tmp, () => close('movement'))
						}
					},
				},
				{
					leftIcon: 'delete',
					children: 'Excluir',
					disabled: !movement.id,
					variation: 'secondary',
					onClick: () => {
						showQuestion(
							'Exclusão de Lançamento',
							'Deseja realmente excluir este lançamento?',
							() => {
								remove('movement', movement?.id || '', () => {
									close('movement')
								})
							}
						)
					},
				},
			]}
		>
			<FormLayout
				fields={[
					{
						id: 'date',
						type: 'date',
						label: 'Data de Vencimento',
					},
					{
						id: 'account',
						type: 'select',
						label: 'Conta Financeira',
						nullableLabel: 'Selecione uma conta',
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
						id: 'approved',
						type: 'checkbox',
						label: 'Aprovado',
					},
				]}
				onChange={setMovement}
				value={movement}
				formValidation={errors}
			>
				{(fields) => {
					return (
						<>
							<div data-row>
								{fields.date}
								{fields.account}
							</div>
							{fields.description}
							{fields.value}
							<div data-row data-no-strech>
								{fields.approved}
							</div>
							{movement.template && (
								<Alert icon="description" variation="secondary">
									Utilizando o template{' '}
									<Button
										onClick={() => {
											show({
												entity: 'template',
												modal: {
													...movement?.template,
													value: (movement?.template?.value || 0) / 100,
												},
											})
										}}
										style={{ display: 'inline' }}
										variation="link"
									>
										<b>{movement.template.description}</b>
									</Button>
								</Alert>
							)}
							<h3>Meta Financeira</h3>
							{movement.goal ? (
								<>
									<GoalCard
										goal={movement.goal}
										buttons={
											<Button
												leftIcon="delete"
												variation="link"
												onClick={() => {
													setMovement((x) => {
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
																setMovement((x) => {
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

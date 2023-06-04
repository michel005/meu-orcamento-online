import React, { useContext, useEffect, useState } from 'react'
import { GoalType } from '../../types/GoalType'
import { Modal } from '../../components/Modal'
import { FormLayout } from '../../components/FormLayout'
import { ModalContext } from '../../context/ModalContext'
import { GoalStatus } from '../../constants/GoalStatus'
import { Alert } from '../../components/Alert'
import { DatabaseContext } from '../../context/DatabaseContext'

export type GoalModalType = {
	entity: GoalType
}

export const GoalModal = ({ entity }: GoalModalType) => {
	const { create, update, remove } = useContext(DatabaseContext)
	const {
		close,
		modalCollection,
		show,
		update: updateModal,
		showQuestion,
	} = useContext(ModalContext)

	const [goal, setGoal] = useState(entity)

	const afterSave = (response: any) => {
		const responseGoal = response.data
		if (!entity.id) {
			showQuestion(
				'Criar template com base na sua meta?',
				'Criar um template torna mais fácil a tarefa de criar uma movimentação onde você movimenta a sua meta. Deseja criar um template?',
				() => {
					show({
						entity: 'template',
						modal: {
							description: responseGoal.name,
							goal: responseGoal,
							value: responseGoal.targetValue / 10,
						},
					})
				}
			)
		}
		updateModal({
			entity: 'movement',
			modal: {
				goal: responseGoal,
			},
		})
		updateModal({
			entity: 'template',
			modal: {
				goal: responseGoal,
			},
		})
		close('goal')
	}

	useEffect(() => {
		setGoal((x) => ({ ...x, ...entity }))
	}, [entity])

	return (
		<Modal
			header="Formulário de Meta Financeira"
			onClose={() => close('goal')}
			buttons={[
				{
					children: 'Salvar',
					leftIcon: 'save',
					onClick: () => {
						let tmp = { ...goal }
						tmp.targetValue = tmp.targetValue * 100
						if (tmp.id) {
							update('goal', tmp, afterSave)
						} else {
							create('goal', tmp, afterSave)
						}
					},
				},
				{
					children: 'Excluir',
					leftIcon: 'delete',
					variation: 'secondary',
					disabled: !goal.id,
					onClick: () => {
						showQuestion(
							'Exclusão de Meta Financeira',
							'Deseja realmente excluir esta meta financeira?',
							() => {
								remove('goal', goal?.id || '', () => close('goal'))
							}
						)
					},
				},
			]}
		>
			<FormLayout
				fields={[
					{
						id: 'name',
						label: 'Nome da Meta',
					},
					{
						id: 'description',
						label: 'Descrição',
					},
					{
						id: 'status',
						label: 'Situação',
						type: 'select',
						options: Object.keys(GoalStatus).map((x) => x),
						idModifier: (row) => row,
						valueModifier: (row) => GoalStatus[row],
						variation: 'secondary',
					},
					{
						id: 'targetValue',
						label: 'Valor',
						type: 'number',
					},
					{
						id: 'targetDate',
						label: 'Data Limite',
						type: 'date',
					},
				]}
				value={goal}
				onChange={setGoal}
			>
				{(fields) => (
					<>
						{fields.name}
						{fields.description}
						{fields.status}
						<h3>Objetivo</h3>
						<div data-row>
							{fields.targetValue}
							{fields.targetDate}
						</div>
						<Alert icon="info">
							Para acumular valores, atribua essa meta a todas as movimentações na
							hora de registrar uma nova movimentação.
						</Alert>
					</>
				)}
			</FormLayout>
		</Modal>
	)
}

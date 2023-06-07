import { Button } from '../../components/Button'
import React, { useContext } from 'react'
import { ModalContext } from '../../context/ModalContext'
import { PageContext } from '../../context/PageContext'
import { GoalStatus } from '../../constants/GoalStatus'
import { Select } from '../../components/Select'

export const GoalOptions = () => {
	const { show } = useContext(ModalContext)
	const { data, defineData } = useContext(PageContext)

	return (
		<>
			<Button
				leftIcon="add"
				variation="sidebar"
				onClick={() => {
					show({
						entity: 'goal',
						modal: {
							name: 'Nova Meta Financeira',
							status: 'OPEN',
						},
					})
				}}
			>
				Cadastrar
			</Button>
			<div style={{ flexGrow: 1 }} />
			<Select
				label="Situações"
				variation="sidebar"
				options={Object.keys(GoalStatus)}
				idModifier={(x: string) => x}
				valueModifier={(x: string) => GoalStatus[x]}
				nullable={true}
				nullableLabel="Todas as Situações"
				value={data.goal?.status}
				onChange={(x) => {
					defineData('goal', 'status', x)
				}}
			/>
		</>
	)
}

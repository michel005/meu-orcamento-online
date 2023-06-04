import { Button } from '../../components/Button'
import React, { useContext } from 'react'
import { ModalContext } from '../../context/ModalContext'
import { ButtonGroup } from '../../components/ButtonGroup'
import { PageContext } from '../../context/PageContext'
import { GoalStatus } from '../../constants/GoalStatus'

export const GoalOptions = () => {
	const { show } = useContext(ModalContext)
	const { data, defineData } = useContext(PageContext)

	return (
		<>
			<Button
				leftIcon="add"
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
			<h5>Filtros</h5>
			<ButtonGroup
				sidebarMode={true}
				list={Object.keys(GoalStatus).map((x) => ({
					id: x,
					value: x,
					label: GoalStatus[x],
				}))}
				nullable={true}
				nullableLabel="Todas as Situações"
				value={{ id: data.goal?.status }}
				onChange={(x) => {
					defineData('goal', 'status', x?.value)
				}}
			/>
		</>
	)
}

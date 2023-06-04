import { Button } from '../../components/Button'
import { DateUtils } from '../../utils/DateUtils'
import { CalendarInput } from '../../components/CalendarInput'
import React, { useContext } from 'react'
import { Account, DatabaseContext } from '../../context/DatabaseContext'
import { ModalContext } from '../../context/ModalContext'
import { PageContext } from '../../context/PageContext'
import { Select } from '../../components/Select'
import { Dropdown } from '../../components/Dropdown'
import { ButtonGroup } from '../../components/ButtonGroup'
import { MovementStatus } from '../../constants/MovementStatus'
import { Bag } from '../../components/Bag'
import { GoalType } from '../../types/GoalType'

export const MovementOptions = () => {
	const { accounts, goals, templates } = useContext(DatabaseContext)
	const { show, showMessage } = useContext(ModalContext)
	const { data, defineData } = useContext(PageContext)

	return (
		<>
			<Button
				leftIcon="add"
				onClick={() => {
					show({
						entity: 'movement',
						modal: {
							date: DateUtils.dateToString(new Date()),
							account: null,
							value: 0,
							description: 'Novo Lançamento',
						},
					})
				}}
			>
				Movimentação
			</Button>
			<Button
				leftIcon="add"
				onClick={() => {
					show({
						entity: 'movement',
						modal: {
							date: DateUtils.dateToString(new Date()),
							account: null,
							value: 0,
							description: 'Novo Lançamento',
						},
					})
				}}
			>
				Transferência
			</Button>
			<Dropdown
				leftIcon="add"
				sidebarMode={true}
				list={templates
					.sort((x, y) => {
						if ((x.day || '') > (y.day || '')) return 1
						if ((x.day || '') < (y.day || '')) return -1
						return 0
					})
					.map((template) => {
						return {
							children: (
								<>
									{template.description}
									{template.day && <Bag side="right">{template.day}</Bag>}
								</>
							),
							onClick: () => {
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
							},
						}
					})}
			>
				Template
			</Dropdown>
			<h5>Filtros</h5>
			<CalendarInput
				label="Período"
				range={true}
				variation="secondary"
				sidebarMode={true}
				value={data?.movement?.date}
				onChange={(x) => {
					defineData('movement', 'date', x)
				}}
			/>
			<Select
				label="Contas"
				variation="secondary"
				sidebarMode={true}
				options={accounts || []}
				nullable={true}
				nullableLabel="Todas as Contas"
				idModifier={(account: Account) => account?.id}
				valueModifier={(account: Account) => account?.name}
				value={data?.movement?.account}
				onChange={(x) => {
					defineData('movement', 'account', x)
				}}
			/>
			<Select
				label="Metas Financeiras"
				variation="secondary"
				sidebarMode={true}
				options={goals || []}
				nullable={true}
				nullableLabel="Todas as Metas"
				idModifier={(goal: GoalType) => goal?.id}
				valueModifier={(goal: GoalType) => goal?.name}
				value={data?.movement?.goal}
				onChange={(x) => {
					defineData('movement', 'goal', x)
				}}
			/>
			<ButtonGroup
				sidebarMode={true}
				orientation="vertical"
				list={Object.keys(MovementStatus).map((x) => ({
					id: x,
					value: x,
					label: MovementStatus[x],
				}))}
				value={data?.movement?.status}
				nullable={true}
				nullableLabel="Todas as Situações"
				onChange={(x) => {
					defineData('movement', 'status', x?.value)
				}}
			/>
			<h5>Filtros Rápidos</h5>
			<Button
				leftIcon="calendar_month"
				variation="link"
				onClick={() => {
					defineData('movement', 'date', {
						start: DateUtils.dateToString(new Date()),
						end: DateUtils.dateToString(new Date()),
					})
				}}
			>
				Hoje
			</Button>
			<Button
				leftIcon="calendar_month"
				variation="link"
				onClick={() => {
					defineData('movement', 'date', {
						start: DateUtils.dateToString(
							new Date(new Date().getFullYear(), new Date().getMonth(), 1)
						),
						end: DateUtils.dateToString(
							new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)
						),
					})
				}}
			>
				Mês Atual
			</Button>
			<Button
				leftIcon="calendar_month"
				variation="link"
				onClick={() => {
					const first = new Date().getMonth() >= 0 || new Date().getMonth() <= 5 ? 0 : 6
					defineData('movement', 'date', {
						start: DateUtils.dateToString(new Date(new Date().getFullYear(), first, 1)),
						end: DateUtils.dateToString(
							new Date(new Date().getFullYear(), first + 6, 0)
						),
					})
				}}
			>
				Semestre Atual
			</Button>
		</>
	)
}

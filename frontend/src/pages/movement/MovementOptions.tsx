import { Button } from '../../components/Button'
import { DateUtils } from '../../utils/DateUtils'
import { CalendarInput } from '../../components/CalendarInput'
import React, { useContext } from 'react'
import { DatabaseContext } from '../../context/DatabaseContext'
import { ModalContext } from '../../context/ModalContext'
import { PageContext } from '../../context/PageContext'
import { Select } from '../../components/Select'
import { Dropdown } from '../../components/Dropdown'
import { MovementStatus } from '../../constants/MovementStatus'
import { Bag } from '../../components/Bag'
import { GoalType } from '../../types/GoalType'
import { AccountType } from '../../types/AccountType'

export const MovementOptions = () => {
	const { accounts, goals, templates } = useContext(DatabaseContext)
	const { show } = useContext(ModalContext)
	const { data, defineData } = useContext(PageContext)

	return (
		<>
			<Button
				leftIcon="add"
				variation="sidebar"
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
				variation="sidebar"
				leftIcon="add"
				onClick={() => {
					show({
						entity: 'transfer',
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
				variation="sidebar"
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
			<div style={{ flexGrow: 1 }} />
			<CalendarInput
				label="Período"
				range={true}
				variation="sidebar"
				value={data?.movement?.date}
				onChange={(x) => {
					defineData('movement', 'date', x)
				}}
			/>
			<Select
				label="Contas"
				variation="sidebar"
				options={accounts || []}
				nullable={true}
				nullableLabel="Todas as Contas"
				idModifier={(account: AccountType) => account?.id}
				valueModifier={(account: AccountType) => account?.name}
				value={data?.movement?.account}
				onChange={(x) => {
					defineData('movement', 'account', x)
				}}
			/>
			<Select
				label="Metas Financeiras"
				variation="sidebar"
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
			<Select
				label="Situação"
				variation="sidebar"
				options={Object.keys(MovementStatus)}
				nullable={true}
				nullableLabel="Todas as Situações"
				value={data?.movement?.status}
				idModifier={(x: string) => x}
				valueModifier={(x: string) => MovementStatus[x]}
				onChange={(x) => {
					defineData('movement', 'status', x)
				}}
			/>
		</>
	)
}

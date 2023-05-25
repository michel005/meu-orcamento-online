import React, { useContext, useState } from 'react'
import { Button } from '../components/Button'
import { CalendarInput } from '../components/CalendarInput'
import { Select } from '../components/Select'
import { Table } from '../components/Table'
import { Account, DatabaseContext, Movement } from '../context/DatabaseContext'
import style from './MovementPage.module.scss'
import { Dropdown } from '../components/Dropdown'
import { Modal } from '../components/Modal'
import { FormLayout } from '../components/FormLayout'
import { DateUtils } from '../utils/DateUtils'

export const MovementPage = () => {
	const databaseContext = useContext(DatabaseContext)
	const [selectedAccount, setSelectedAccount] = useState<any | null>(null)
	const [selectedDate, setSelectedDate] = useState<any | null>(null)
	const [showForm, setShowForm] = useState<Movement | null>(null)

	return (
		<div className={style.movementPage}>
			<div className={style.buttons}>
				<Dropdown
					list={[
						{
							children: 'Rápido',
							leftIcon: 'add',
							onClick: () => {
								setShowForm({
									date: DateUtils.dateToString(new Date()),
									account: null,
									value: 0,
									description: 'Novo Lançamento',
								})
							},
						},
						{
							children: 'Lançamento',
							leftIcon: 'shopping_cart',
						},
						{
							children: 'Por template',
							leftIcon: 'description',
						},
					]}
				>
					Cadastrar
				</Dropdown>
				<Select
					variation="secondary"
					options={databaseContext.accounts || []}
					nullable={true}
					nullableLabel="Todas as Contas"
					idModifier={(account: Account) => account?.id}
					valueModifier={(account: Account) => account?.name}
					value={selectedAccount}
					onChange={setSelectedAccount}
				/>
				<CalendarInput
					variation="secondary"
					value={selectedDate}
					onChange={setSelectedDate}
					range={true}
				/>
			</div>
			<div className={style.calendarAndTable}>
				<div className={style.tableContainer}>
					<Table
						definition={[
							{
								field: 'date',
								label: 'Data',
							},
							{
								field: 'description',
								label: 'Descrição',
							},
							{
								field: 'account',
								label: 'Conta Financeira',
								valueModifier: (row) => row?.account?.name,
							},
							{
								field: 'value',
								label: 'Valor',
								align: 'right',
								valueModifier: (row) =>
									!row?.value
										? ''
										: (row?.value / 100).toLocaleString('pt-br', {
												style: 'currency',
												currency: 'BRL',
										  }),
							},
						]}
						value={databaseContext.movements}
						onClick={(row) => {
							setShowForm({ ...row, value: row.value / 100 })
						}}
					/>
				</div>
			</div>
			{showForm && (
				<Modal
					header="Formulário de Movimentação"
					onClose={() => {
						setShowForm(null)
					}}
				>
					<FormLayout
						fields={[
							{
								id: 'date',
								label: 'Data',
								type: 'date',
								variation: 'secondary',
							},
							{
								id: 'description',
								label: 'Descrição',
							},
							{
								id: 'account',
								label: 'Conta Financeira',
								type: 'select',
								options: databaseContext.accounts || [],
								idModifier: (account: Account) => account?.id,
								valueModifier: (account: Account) => account?.name,
								variation: 'secondary',
							},
							{
								id: 'value',
								label: 'Valor',
								type: 'number',
								leftButton: {
									leftIcon: 'money',
									disabled: true,
								},
							},
						]}
						value={showForm}
						onChange={setShowForm}
						footer={
							<>
								<Button
									leftIcon="save"
									onClick={() => {
										let movement = { ...showForm, value: showForm.value * 100 }
										if (showForm.id) {
											databaseContext.update('movement', movement, () => {
												setShowForm(null)
											})
										} else {
											databaseContext.create('movement', movement, () => {
												setShowForm(null)
											})
										}
									}}
								>
									Salvar
								</Button>
								{showForm.id && (
									<Button
										leftIcon="delete"
										variation="secondary"
										onClick={() => {
											databaseContext.remove(
												'movement',
												showForm.id || '',
												() => {
													setShowForm(null)
												}
											)
										}}
									>
										Excluir
									</Button>
								)}
							</>
						}
					>
						{(fields) => (
							<>
								<div data-row>
									{fields.date}
									{fields.account}
								</div>
								{fields.description}
								{fields.value}
							</>
						)}
					</FormLayout>
				</Modal>
			)}
		</div>
	)
}

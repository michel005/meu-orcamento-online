import React, { useContext, useState } from 'react'
import style from './AccountPage.module.scss'
import { Account, AccountType, DatabaseContext } from '../context/DatabaseContext'
import { Button } from '../components/Button'
import { Table } from '../components/Table'
import { Modal } from '../components/Modal'
import { FormLayout } from '../components/FormLayout'
import { Label } from '../components/Label'
import { MonthName } from '../constants/Months'
import { ButtonGroup } from '../components/ButtonGroup'

export const AccountPage = () => {
	const databaseContext = useContext(DatabaseContext)
	const [showForm, setShowForm] = useState<Account | null>(null)

	return (
		<div className={style.accountPage}>
			<div className={style.content}>
				<div className={style.buttons}>
					<Button
						leftIcon="add"
						onClick={() => {
							setShowForm({
								name: 'Nova Conta',
								type: 'CREDIT',
							})
						}}
					>
						Cadastrar
					</Button>
				</div>
				<Table
					definition={[
						{
							field: 'name',
							label: 'Nome da Conta',
						},
						{
							field: 'type',
							label: 'Tipo',
							valueModifier: (row: any) => AccountType[row.type],
						},
					]}
					selected={showForm}
					onChangeSelected={(row) => {
						setShowForm({ ...row })
					}}
					value={databaseContext.accounts}
				/>
			</div>
			{showForm && (
				<div className={style.details}>
					<div className={style.header}>
						<h1>{showForm.name}</h1>
						<Button
							leftIcon="close"
							variation="link"
							onClick={() => {
								setShowForm(null)
							}}
						/>
					</div>
					<div className={style.buttons}>
						<Label>{AccountType[showForm.type]}</Label>
					</div>

					<FormLayout
						footer={
							<>
								<Button
									leftIcon="save"
									onClick={() => {
										if (showForm.id) {
											databaseContext.update('account', showForm, () => {
												setShowForm(null)
											})
										} else {
											databaseContext.create('account', showForm, () => {
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
												'account',
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
						value={showForm}
						onChange={setShowForm}
						footerAlignment="left"
						fields={[
							{
								id: 'name',
								label: 'Nome da Conta',
							},
							{
								id: 'type',
								type: 'select',
								nullable: false,
								options: Object.keys(AccountType).map((x) => x),
								idModifier: (type) => type,
								valueModifier: (type) => AccountType[type],
								label: 'Tipo',
							},
						]}
					>
						{(fields) => (
							<>
								{fields.name}
								{fields.type}
							</>
						)}
					</FormLayout>

					{showForm.id && (
						<>
							<h2>Links úteis</h2>
							<Button variation="link" leftIcon="print">
								Movimentações por Mês
							</Button>
							<Button variation="link" leftIcon="print">
								Movimentações por Período
							</Button>
						</>
					)}
				</div>
			)}
		</div>
	)
}

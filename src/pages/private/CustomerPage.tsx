import React, { useEffect, useState } from 'react'
import style from './CustomerPage.module.scss'
import { Button, ButtonWhite } from '../../components/Button'
import { useApi } from '../../hooks/useApi'
import { CustomerCard } from './customers/CustomerCard'
import { CustomerType } from '../../types/AllTypes'
import { useForm } from '../../hooks/useForm'
import { CustomerFormSidebar } from './customers/CustomerFormSidebar'

export const CustomerPage = () => {
	const { originalValue, show } = useForm<CustomerType>('customer')
	const { getAll, data } = useApi('customer')
	const [viewOption, setViewOption] = useState('table')
	const [personType, setPersonType] = useState(null)

	const refreshPage = () => {
		const query: any = {}
		if (personType) {
			query.person_type = personType
		}
		getAll({
			query: query,
		})
	}

	useEffect(() => {
		refreshPage()
	}, [personType])

	return (
		<div className={style.customerPage}>
			<div className={style.customerPageContent}>
				<div className={style.pageHeader}>
					<Button
						leftIcon="person"
						onClick={() => {
							show(
								{
									active: true,
								},
								refreshPage
							)
						}}
					>
						Novo Cliente
					</Button>
					<hr />
					<label className={style.faded}>{data.length} registro(s)</label>
					<div style={{ flexGrow: 1 }} />
					<label>Tipo de Pessoa</label>
					{personType === 'PF' ? (
						<Button
							leftIcon="person"
							onClick={() => setPersonType((x) => (!x || x === 'PJ' ? 'PF' : null))}
						>
							Física
						</Button>
					) : (
						<ButtonWhite
							leftIcon="person"
							onClick={() => setPersonType((x) => (!x || x === 'PJ' ? 'PF' : null))}
						>
							Física
						</ButtonWhite>
					)}
					{personType === 'PJ' ? (
						<Button
							leftIcon="group"
							onClick={() => setPersonType((x) => (!x || x === 'PF' ? 'PJ' : null))}
						>
							Jurídica
						</Button>
					) : (
						<ButtonWhite
							leftIcon="group"
							onClick={() => setPersonType((x) => (!x || x === 'PF' ? 'PJ' : null))}
						>
							Jurídica
						</ButtonWhite>
					)}
					<hr />
					{viewOption === 'cards' ? (
						<Button
							leftIcon="cards"
							onClick={() => {
								setViewOption('cards')
							}}
							title="Mostrar clientes em formato de cartão"
						/>
					) : (
						<ButtonWhite
							leftIcon="cards"
							onClick={() => {
								setViewOption('cards')
							}}
							title="Mostrar clientes em formato de cartão"
						/>
					)}
					{viewOption === 'table' ? (
						<Button
							leftIcon="table_view"
							onClick={() => {
								setViewOption('table')
							}}
							title="Mostrar clientes em formato de tabela"
						/>
					) : (
						<ButtonWhite
							leftIcon="table_view"
							onClick={() => {
								setViewOption('table')
							}}
							title="Mostrar clientes em formato de tabela"
						/>
					)}
					<hr />
					<Button leftIcon="refresh" onClick={refreshPage} />
				</div>
				<hr />
				<div className={style.pageContent}>
					{data.map((customer) => {
						return (
							<CustomerCard
								key={customer._id}
								customer={customer}
								onClose={refreshPage}
							/>
						)
					})}
				</div>
			</div>
			{originalValue && <CustomerFormSidebar />}
		</div>
	)
}

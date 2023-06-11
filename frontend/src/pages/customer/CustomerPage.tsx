import React, { useContext, useState } from 'react'
import style from './CustomerPage.module.scss'
import { Table } from '../../components/Table'
import { Button } from '../../components/Button'
import { DatabaseContext } from '../../context/DatabaseContext'
import { Path } from '../../components/Path'
import { useNavigate } from 'react-router-dom'
import { PageContext } from '../../context/PageContext'
import { PersonType } from '../../constants/PersonType'
import { Pagination } from '../../components/Pagination'
import { usePagination } from '../../hook/usePagination'

export const CustomerPage = () => {
	const { content } = useContext(DatabaseContext)
	const { defineData } = useContext(PageContext)

	const pagination = usePagination(content.customer || [], 5)
	const navigate = useNavigate()

	return (
		<div className={style.dashboardPage}>
			<Path
				paths={[
					{
						name: <h1>Clientes</h1>,
					},
				]}
			/>
			<div className={style.filters}>
				<Button
					leftIcon="add"
					onClick={() => {
						defineData('customer', 'detail', {
							fullName: 'Novo Cliente',
							type: 'PF',
						})
						navigate('/customer/details')
					}}
				>
					Cadastrar
				</Button>
				<div style={{ flexGrow: 1 }} />
				<Button leftIcon="filter_alt">Filtros</Button>
			</div>
			<Table
				definition={[
					{
						field: 'picture',
						type: 'image',
						label: '',
					},
					{
						field: 'fullName',
						label: 'Nome Completo',
					},
					{
						field: 'type',
						label: 'Tipo de Pessoa',
						valueModifier: (row) => PersonType[row.type],
					},
					{
						field: 'email',
						label: 'E-mail',
					},
					{
						field: 'addresses',
						label: 'Endereços',
						width: '200px',
						valueModifier: (row) => (
							<Button
								variation="secondary"
								disabled={true}
								style={{
									marginBlock: '-7px',
									opacity: 1,
								}}
							>
								{(row.addresses || []).length === 1
									? '1 endereço'
									: (row.addresses || []).length === 0
									? 'Sem endereços'
									: `${(row.addresses || []).length} endereços`}
							</Button>
						),
					},
				]}
				noDataFoundLabel="Nenhum cliente cadatsrado"
				onClick={(row) => {
					defineData('customer', 'detail', { ...row })
					navigate('/customer/details')
				}}
				value={pagination.result}
			/>
			<Pagination {...pagination} />
		</div>
	)
}

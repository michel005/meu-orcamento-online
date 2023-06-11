import React, { useContext } from 'react'
import style from './ProductPage.module.scss'
import { Table } from '../../components/Table'
import { Button } from '../../components/Button'
import { ModalContext } from '../../context/ModalContext'
import { DatabaseContext } from '../../context/DatabaseContext'
import { Path } from '../../components/Path'
import { useNavigate } from 'react-router-dom'
import { PageContext } from '../../context/PageContext'
import { DateUtils } from '../../utils/DateUtils'

export const ProductPage = () => {
	const { content } = useContext(DatabaseContext)
	const { defineData } = useContext(PageContext)

	const navigate = useNavigate()

	return (
		<div className={style.dashboardPage}>
			<Path
				paths={[
					{
						name: <h1>Produtos</h1>,
					},
				]}
			/>
			<div className={style.filters}>
				<Button
					leftIcon="add"
					onClick={() => {
						defineData('product', 'detail', {
							name: 'Novo Produto',
							active: true,
						})
						navigate('/product/details')
					}}
				>
					Cadastrar
				</Button>
				<Button
					leftIcon="download"
					variation="secondary"
					onClick={() => {
						navigate('/product/input')
					}}
				>
					Entrada
				</Button>
				<Button
					leftIcon="upload_file"
					variation="secondary"
					onClick={() => {
						defineData('product', 'output', {
							date: DateUtils.dateToString(new Date()),
						})
						navigate('/product/output')
					}}
				>
					Saída
				</Button>
				<div style={{ flexGrow: 1 }} />
				<Button leftIcon="filter_alt">Filtros</Button>
			</div>
			<Table
				definition={[
					{
						field: 'images',
						type: 'imageList',
						label: '',
						width: '150px',
					},
					{
						field: 'name',
						label: 'Produto',
					},
					{
						field: 'currentAmount',
						label: 'Quantidade',
						width: '250px',
					},
					{
						field: 'price',
						label: 'Preço',
						align: 'right',
						width: '250px',
						valueModifier: (row) =>
							(row.price / 100).toLocaleString('pt-br', {
								style: 'currency',
								currency: 'BRL',
							}),
					},
				]}
				onClick={(row) => {
					defineData('product', 'detail', { ...row, price: row.price / 100 })
					navigate('/product/details')
				}}
				value={content.product}
			/>
		</div>
	)
}

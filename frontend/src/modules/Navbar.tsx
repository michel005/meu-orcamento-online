import React, { useContext } from 'react'
import style from './Navbar.module.scss'
import { Button } from '../components/Button'
import { Input } from '../components/Input'
import { PageContext } from '../context/PageContext'
import { DatabaseContext } from '../context/DatabaseContext'
import { ModalContext } from '../context/ModalContext'
import { useNavigate } from 'react-router-dom'

export const Navbar = () => {
	const { content } = useContext(DatabaseContext)
	const { data, defineData } = useContext(PageContext)

	const navigate = useNavigate()

	return (
		<div className={style.navbar}>
			<div className={style.header}>
				<Button leftIcon="description" variation="link" disabled={true} />{' '}
				<span>Meu Estoque</span>
			</div>

			<div className={style.search}>
				<Input
					className={style.searchInput}
					onChange={(value) => {
						defineData('navbar', 'search', value)
					}}
					placeholder="Buscar.."
					rightButton={{
						leftIcon: 'search',
					}}
					type="search"
					searchOptionsWithGroups={[
						{
							label: 'Produtos',
							options: content.product
								.filter(
									(product) =>
										JSON.stringify({ ...product, id: '' })
											.toUpperCase()
											.indexOf(data.navbar.search.toUpperCase()) !== -1
								)
								.map((product) => ({
									children: product.name,
									onClick: () => {
										defineData('navbar', 'search', '')
										defineData('product', 'detail', {
											...product,
											price: (product?.price || 0) / 100,
										})
										navigate('/product/details')
									},
								})),
						},
						{
							label: 'Clientes',
							options: content.customer
								.filter(
									(customer) =>
										JSON.stringify({ ...customer, id: '' })
											.toUpperCase()
											.indexOf(data.navbar.search.toUpperCase()) !== -1
								)
								.map((customer) => ({
									children: customer.fullName,
									onClick: () => {
										defineData('navbar', 'search', '')
										defineData('customer', 'detail', {
											...customer,
										})
										navigate('/customer/details')
									},
								})),
						},
					]}
					value={data.navbar.search}
				/>
			</div>
		</div>
	)
}

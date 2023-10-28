import React, { useEffect, useState } from 'react'
import style from './ProductPage.module.scss'
import { Button, ButtonGhost } from '../../components/Button'
import { useApi } from '../../hooks/useApi'
import { CustomerFormSidebar } from './customers/CustomerFormSidebar'
import { ProductFormSidebar } from './products/ProductFormSidebar'
import { useForm } from '../../hooks/useForm'
import { CustomerType, ProductType } from '../../types/AllTypes'
import { ProductCard } from './products/ProductCard'
import { Field } from '../../components/Field'
import { useFormLayout } from '../../hooks/useFormLayout'

export const ProductPage = () => {
	const { originalValue, show, close } = useForm<ProductType>('product')
	const { getAll, data } = useApi('product')
	const { getAll: getAllCustomers, data: customerData } = useApi('customer')
	const [finalFilters, setFinalFilters] = useState<{
		search?: string
	}>({})
	const [filters, setFilters] = useState<{
		search?: string
	}>({})
	const { getField } = useFormLayout<{
		search?: string
	}>({
		definition: {
			search: {
				placeholder: 'Busque por nome, descrição heshtag ou categoria...',
				type: 'text',
				rightSide: (
					<ButtonGhost
						leftIcon="search"
						onClick={() => {
							setFinalFilters((x) => {
								x.search = filters.search
								return { ...x }
							})
						}}
					/>
				),
			},
		},
		value: filters,
		onChange: setFilters,
	})

	const refreshPage = () => {
		const query: any = {}
		if (finalFilters.search) {
			query.search = finalFilters.search
		}
		getAll({
			query: query,
		})
		getAllCustomers()
	}

	useEffect(() => {
		refreshPage()
	}, [finalFilters])

	useEffect(() => {
		close()
	}, [])

	return (
		<div className={style.productPage}>
			<div className={style.customerPageContent}>
				<div className={style.pageHeader}>
					<Button
						leftIcon="shopping_bag"
						onClick={() => {
							show(
								{
									price: 0,
								},
								refreshPage
							)
						}}
					>
						Novo Produto
					</Button>
					<hr />
					<label className={style.faded}>{data.length} registro(s)</label>
					<div style={{ flexGrow: 1 }} />
					<label>Busca Geral</label>
					<div style={{ width: '500px' }}>{getField('search')}</div>
					<hr />
					<Button leftIcon="refresh" onClick={() => refreshPage()} />
				</div>
				<div className={style.pageContent}>
					{data.map((product, key) => {
						return (
							<ProductCard
								key={product._id}
								product={product}
								onClose={refreshPage}
							/>
						)
					})}
				</div>
			</div>
			{originalValue && <ProductFormSidebar customerData={customerData} />}
		</div>
	)
}

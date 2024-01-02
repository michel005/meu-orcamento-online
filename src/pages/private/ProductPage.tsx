import React, { useEffect, useState } from 'react'
import style from './ProductPage.module.scss'
import { usePage } from '../../hooks/usePage'
import { ProductType } from '../../types/AllTypes'
import { useApi } from '../../hooks/useApi'
import { ProductCard } from './products/ProductCard'
import { ProductForm } from './products/ProductForm'
import { AddProductsInBulkForm } from './products/AddProductsInBulkForm'
import { useForm } from '../../hooks/useForm'
import { Button, ButtonSecondary } from '../../components/Button'
import { useFormLayout } from '../../hooks/useFormLayout'
import { ProductDefinition } from '../../definitions/ProductDefinition'
import { useApiData } from '../../hooks/useApiData'
import { ButtonGroup } from '../../components/ButtonGroup'
import { Table } from '../../components/Table'
import { UserPicture } from '../../components/UserPicture'
import { ProductStatus } from '../../constants/ProductStatus'
import { Label } from '../../components/Label'

export const ProductPage = () => {
	const { api, form, apiData, pageData } = usePage<ProductType>('product')
	const [showFilters, setShowFilters] = useState(false)
	const bulkForm = useForm('product_bulk')
	const customerApi = useApi('customer')
	const customerApiData = useApiData('customer')
	const allCategories = (apiData.data as ProductType[])
		.map((x) => (x.categories || '').split(';'))
		.reduce((prev, curr) => [...prev, ...curr], [])
		.filter((x) => x !== '')
	const filterFormLayout = useFormLayout({
		definition: {
			general_search: {
				type: 'text',
				placeholder: 'Busuqe por nome, descrição, categorias etc.',
				leftSide: (
					<ButtonSecondary
						rightBag={
							Object.keys(pageData.data)
								.filter((x) => x !== 'view')
								.filter(
									(x) =>
										pageData.data[x] !== null && pageData.data[x] !== undefined
								).length
						}
						style={{ marginRight: '14px' }}
						leftIcon={showFilters ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}
						onClick={() => {
							setShowFilters((x) => !x)
						}}
					>
						Filtros
					</ButtonSecondary>
				),
				rightSide: (
					<Button
						leftIcon="search"
						onClick={() => {
							api.getAll({
								query: pageData.data,
							})
						}}
					>
						Buscar
					</Button>
				),
			},
			categories: {
				label: 'Categorias',
				type: 'select',
				options: Array.from(new Map(allCategories.map((x) => [x, x])).keys()).sort(),
				idModifier: (value: any) => value,
				valueRender: (value: any) => value,
				multiple: true,
			},
			seller_id: ProductDefinition(null, customerApiData.data).seller_id,
			status: {
				...ProductDefinition(null, customerApiData.data).status,
				multiple: true,
			},
		},
		value: pageData.data,
		onChange: pageData.set,
	})

	useEffect(() => {
		customerApi.getAll()
		api.getAll({
			query: pageData.data,
		})
	}, [])

	return (
		<div className={style.productPage}>
			{form.originalValue && <ProductForm />}
			{bulkForm.originalValue && <AddProductsInBulkForm />}
			<div className={style.productPageContent}>
				<div className={style.filters}>
					<section>
						<Button
							leftIcon="add"
							onClick={() => {
								form.show(
									{
										status: 'AVAILABLE',
									},
									() => api.getAll()
								)
							}}
						>
							Novo Produto
						</Button>
						<Button
							leftIcon="add_shopping_cart"
							onClick={() => {
								bulkForm.show({}, () => api.getAll())
							}}
						>
							Multiplos Produtos
						</Button>
						<ButtonGroup>
							<Button
								leftIcon="table"
								variationOverride={
									pageData.data?.view === 'table' ? 'primary' : 'secondary'
								}
								onClick={() => {
									pageData.setProp('view', () => 'table')
								}}
							/>
							<Button
								leftIcon="cards"
								variationOverride={
									pageData.data?.view === 'cards' ? 'primary' : 'secondary'
								}
								onClick={() => {
									pageData.setProp('view', () => 'cards')
								}}
							/>
						</ButtonGroup>
						{filterFormLayout.getField('general_search')}
					</section>
					{showFilters && (
						<div className={style.allFilters}>
							{filterFormLayout.getField('seller_id')}
							{filterFormLayout.getField('status')}
							{filterFormLayout.getField('categories')}
						</div>
					)}
				</div>
				{pageData.data.view === 'table' && (
					<div className={style.pageContent}>
						<Table
							definition={{
								created: {
									header: 'Data',
									type: 'date',
									valueOverride: (row: ProductType) => {
										return row.created.split(' ')[0]
									},
									width: '150px',
								},
								title: {
									header: 'Produto',
									type: 'string',
									valueOverride: (row: ProductType) => {
										return (
											<>
												<UserPicture
													picture={row.picture}
													name={row.title}
													size="32px"
												/>
												<div className={style.tableTitleAndDescription}>
													<a
														onClick={() => {
															form.show(row, () => api.getAll())
														}}
													>
														{row.title}
													</a>
													<p>{row.description}</p>
												</div>
											</>
										)
									},
								},
								seller_id: {
									header: 'Vendedor',
									type: 'string',
									valueOverride: (row: ProductType) => {
										return (
											<>
												<UserPicture
													picture={row.seller?.picture}
													name={row.seller?.full_name}
													size="32px"
												/>
												{row.seller?.full_name}
											</>
										)
									},
								},
								categories: {
									header: 'Categorias',
									type: 'string',
									valueOverride: (row: ProductType) => {
										return (
											<>
												{(row.categories || '')
													.split(';')
													.filter((x) => x && x !== '')
													.sort()
													.map((category) => {
														return <Label>{category}</Label>
													})}
											</>
										)
									},
								},
								price: {
									alignment: 'right',
									header: 'Valor',
									type: 'currency',
									width: '10%',
								},
								status: {
									header: 'Situação',
									type: 'domain',
									keyValue: Object.keys(ProductStatus).map((x) => [
										x,
										ProductStatus[x],
									]),
									width: '10%',
								},
							}}
							value={apiData.data}
						/>
					</div>
				)}
				{pageData.data.view === 'cards' && (
					<div className={style.pageContent}>
						{apiData.data.map((product: ProductType) => {
							return (
								<ProductCard
									key={product._id}
									product={product}
									onClose={() => api.getAll()}
								/>
							)
						})}
					</div>
				)}
			</div>
		</div>
	)
}

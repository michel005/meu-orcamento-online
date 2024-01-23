import React, { useEffect, useMemo, useState } from 'react'
import style from './ProductPage.module.scss'
import { usePage } from '../../hooks/usePage'
import { ProductType } from '../../types/AllTypes'
import { useApi } from '../../hooks/useApi'
import { Button, ButtonGhost, ButtonSecondary, ButtonWhite } from '../../components/Button'
import { useFormLayout } from '../../hooks/useFormLayout'
import { ProductDefinition } from '../../definitions/ProductDefinition'
import { useApiData } from '../../hooks/useApiData'
import { Table } from '../../components/Table'
import { UserPicture } from '../../components/UserPicture'
import { ProductStatus } from '../../constants/ProductStatus'
import { Label } from '../../components/Label'
import { Bag } from '../../components/Bag'
import { NumberUtils } from '../../utils/NumberUtils'
import { ButtonGroup } from '../../components/ButtonGroup'
import { useForm } from '../../hooks/useForm'

export const ProductPage = () => {
	const { api, form, apiData, pageData } = usePage<ProductType>('product')
	const [showFilters, setShowFilters] = useState(false)
	const customerApi = useApi('customer')
	const customerApiData = useApiData('customer')
	const customerForm = useForm('customer')
	const sellForm = useForm('sell')
	const allCategories = useMemo(
		() =>
			(apiData.data as ProductType[])
				.map((x) => (x.categories || '').split(';'))
				.reduce((prev, curr) => [...prev, ...curr], [])
				.filter((x) => x !== ''),
		[apiData.data]
	)

	const filterFormLayout = useFormLayout({
		definition: {
			general_search: {
				type: 'text',
				placeholder: 'Busuqe por nome, descrição, categorias etc.',
				leftSide: (
					<ButtonSecondary
						rightBag={
							Object.keys(pageData.data)
								.filter((x) => x !== 'bag')
								.filter(
									(x) =>
										pageData.data[x] !== null &&
										pageData.data[x] !== undefined &&
										JSON.stringify(pageData.data[x]) !== '[]'
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
			<div className={style.productPageContent}>
				<div className={style.filters}>
					<section>
						{filterFormLayout.getField('general_search')}
						{showFilters && (
							<div className={style.allFilters}>
								{filterFormLayout.getField('seller_id')}
								{filterFormLayout.getField('status')}
								{filterFormLayout.getField('categories')}
							</div>
						)}
					</section>
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
						<div style={{ flexGrow: 1 }} />
						<Bag
							button={(show, setShow) => (
								<Button
									className={style.bagButton}
									rightBag={(pageData.data?.bag || []).length}
									leftIcon="shopping_bag"
									onClick={() => {
										if ((pageData.data?.bag || []).length > 0) {
											setShow((x) => !x)
										}
									}}
								>
									Sacola
								</Button>
							)}
							arrowPosition="top-right"
						>
							{(show, setShow) => {
								return (
									<>
										<h3>Sacola de Compras</h3>
										{(pageData.data?.bag || []).map((item: ProductType) => (
											<div className={style.bagItem} key={item._id}>
												<UserPicture
													className={style.bagImage}
													picture={item.picture?.value}
													name={item.title}
													size="36px"
												/>
												<div className={style.bagItemTitleAndPrice}>
													<a
														onClick={() => {
															form.show(item, () => api.getAll())
														}}
													>
														{item.title}
													</a>
													<p>
														{NumberUtils.numberToCurrency(item.price)}
													</p>
												</div>
												<ButtonGhost
													className={style.removeFromBagButton}
													leftIcon="close"
													onClick={() => {
														const wasAdded = (
															pageData.data?.bag || []
														).findIndex((x) => x._id === item._id)
														pageData.setProp('bag', (oldValue) => {
															if (!oldValue) {
																oldValue = []
															}
															oldValue.splice(wasAdded, 1)
															return [...oldValue]
														})
													}}
												/>
											</div>
										))}
										<hr />
										<div className={style.totalValue}>
											<label>Total</label>
											<b>
												{NumberUtils.numberToCurrency(
													(pageData.data?.bag || [])
														.map((x) => x.price)
														.reduce((x, y) => x + y, 0)
												)}
											</b>
										</div>
										{(pageData.data?.bag || []).length > 0 && (
											<ButtonGroup style={{ flexGrow: 1, width: '100%' }}>
												<ButtonWhite
													style={{ flexGrow: 1 }}
													leftIcon="check"
													onClick={() => {
														sellForm.show({
															status: 'PENDING',
														})
													}}
												>
													Finalizar Venda
												</ButtonWhite>
												<ButtonWhite
													style={{ flexGrow: 0 }}
													leftIcon="delete"
													onClick={() => {
														pageData.setProp('bag', () => null)
														setShow(false)
													}}
												/>
											</ButtonGroup>
										)}
									</>
								)
							}}
						</Bag>
					</section>
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
								priority: 'primary',
								valueOverride: (row: ProductType) => {
									return (
										<>
											<UserPicture
												picture={row.picture?.value}
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
								valueOverride: (row: ProductType) => (
									<a
										onClick={() => {
											customerForm.show(row.seller)
										}}
									>
										{row.seller?.full_name}
									</a>
								),
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
													return (
														<Label
															color={
																(
																	pageData.data.categories || []
																).includes(category)
																	? 'var(--active-color)'
																	: ''
															}
															onClick={() => {
																pageData.setProp(
																	'categories',
																	(value: string[]) => {
																		if (!value) {
																			value = []
																		}
																		if (
																			value.includes(category)
																		) {
																			value.splice(
																				value.indexOf(
																					category
																				),
																				1
																			)
																		} else {
																			value.push(category)
																		}
																		return [...value]
																	}
																)
															}}
														>
															{category}
														</Label>
													)
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
								priority: 'primary',
							},
							status: {
								header: 'Situação',
								type: 'domain',
								keyValue: Object.keys(ProductStatus).map((x) => [
									x,
									ProductStatus[x],
								]),
								width: '10%',
								priority: 'secondary',
							},
							bag: {
								header: 'Sacola',
								type: 'string',
								valueOverride: (row: ProductType) => {
									const wasAdded = (pageData.data?.bag || []).findIndex(
										(x) => x._id === row._id
									)
									if (row.status !== 'AVAILABLE') {
										return <></>
									}

									return (
										<>
											{wasAdded === -1 && (
												<Button
													onClick={() => {
														pageData.setProp('bag', (oldValue) => {
															if (!oldValue) {
																oldValue = []
															}
															oldValue.push(row)
															return [...oldValue]
														})
													}}
												>
													Adicionar
												</Button>
											)}
										</>
									)
								},
								width: 'auto',
							},
						}}
						value={apiData.data}
					/>
				</div>
			</div>
		</div>
	)
}

import React, { useEffect, useState } from 'react'
import style from './ProductPage.module.scss'
import { Button, ButtonGhost, ButtonWhite } from '../../components/Button'
import { usePage } from '../../hooks/usePage'
import { ProductType } from '../../types/AllTypes'
import { useApi } from '../../hooks/useApi'
import { ProductCard } from './products/ProductCard'
import { SelectInput } from '../../components/inputs/SelectInput'
import { UserPicture } from '../../components/UserPicture'
import { CustomerForm } from './customers/CustomerForm'
import { ProductForm } from './products/ProductForm'
import { ProductStatus } from '../../constants/ProductStatus'
import { useFormLayout } from '../../hooks/useFormLayout'
import { Bag } from '../../components/Bag'

export const ProductPage = () => {
	const { api, pageData, form } = usePage<ProductType>('product')
	const customerApi = useApi('customer')
	const [filters, setFilters] = useState({})
	const filterFields = useFormLayout({
		definition: {
			seller_id: {
				label: 'Vendedor',
				type: 'select',
				options: customerApi.data,
				idModifier: (x) => x.id,
				placeholder: 'Nenhum vendedor selecionado',
				valueRender: (x) => (
					<div className={style.selectValueRender}>
						<UserPicture size="28px" picture={x.picture} name={x.full_name} />
						<p>{x.full_name}</p>
					</div>
				),
				optionValueRender: (x) => (
					<div className={style.selectValueRender}>
						<UserPicture size="36px" picture={x.picture} name={x.full_name} />
						<div className={style.nameAndEmail}>
							<b>{x.full_name}</b>
							<p>{x.email}</p>
						</div>
					</div>
				),
			},
			status: {
				label: 'Situação',
				type: 'select',
				options: Object.keys(ProductStatus).map((status) => [
					status,
					ProductStatus[status],
				]),
				idModifier: (value: any) => value[0],
				valueRender: (value: any) => value[1],
				multiple: true,
			},
			search: {
				label: 'Busca Geral',
				type: 'text',
				placeholder: 'Nome do produto, código ou descrição',
			},
		},
		value: filters,
		onChange: setFilters,
	})

	const apiData: ProductType[] = api.data || []

	const refreshPage = (filters = pageData.data) => {
		const query: any = {}
		if (filters.seller_id) {
			query.seller_id = filters.seller_id
		}
		if (filters.search) {
			query.search = filters.search
		}
		if (filters.status) {
			query.status = filters.status
		}
		api.getAll({
			query,
		})
	}

	useEffect(() => {
		refreshPage()
	}, [pageData.data.seller_id])

	useEffect(() => {
		if (pageData.data) {
			setFilters({ ...pageData.data })
		}
		customerApi.getAll()
		form.close()
		refreshPage()
	}, [])

	return (
		<div className={style.productPage}>
			{form.originalValue && <ProductForm />}
			<div className={style.productPageContent}>
				<div className={style.pageHeader}>
					<Button
						leftIcon="add"
						onClick={() => {
							form.show(
								{
									status: 'AVAILABLE',
								},
								refreshPage
							)
						}}
					>
						Novo Produto
					</Button>
					<hr />
					<label className={style.faded}>{apiData.length} registro(s)</label>
					<div style={{ flexGrow: 1 }} />
					<Bag
						button={(show, setShow) => (
							<Button
								className={style.showFiltersButton}
								variationOverride={show ? 'primary' : 'white'}
								leftIcon="filter_alt"
								rightBag={
									pageData.data
										? Object.keys(pageData.data).filter(
												(x) => pageData.data?.[x]
										  ).length
										: 0
								}
								onClick={() => {
									setShow((x) => !x)
								}}
							/>
						)}
						arrowPosition="top-right"
					>
						{(_: unknown, setShow: any) => (
							<>
								{filterFields.getField('seller_id')}
								{filterFields.getField('search')}
								{filterFields.getField('status')}
								<hr />
								<Button
									disabled={
										JSON.stringify(pageData.data) === JSON.stringify(filters)
									}
									leftIcon="search"
									onClick={() => {
										pageData.set({ ...filters })
										refreshPage(filters)
										setShow(false)
									}}
								>
									Buscar
								</Button>
							</>
						)}
					</Bag>
					<hr />
					<Button
						leftIcon="refresh"
						onClick={() => {
							refreshPage()
						}}
					/>
				</div>
				<div className={style.pageContent}>
					{apiData.map((product) => {
						return (
							<ProductCard key={product.id} product={product} onClose={refreshPage} />
						)
					})}
				</div>
			</div>
		</div>
	)
}

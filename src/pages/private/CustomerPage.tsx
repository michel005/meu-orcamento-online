import React, { useEffect, useRef } from 'react'
import { Bag } from '../../components/Bag'
import { Button, ButtonWhite } from '../../components/Button'
import { usePage } from '../../hooks/usePage'
import { SortUtils } from '../../utils/SortUtils'
import style from './CustomerPage.module.scss'
import { CustomerCard } from './customers/CustomerCard'
import { CustomerForm } from './customers/CustomerForm'

export const CustomerPage = () => {
	const { form, api, pageData } = usePage('customer')

	const filteredData = api.data
		.filter((x) => !pageData.data?.favorite || x.favorite)
		.filter(
			(x) => (x.active && pageData.data?.active) || (!x.active && pageData.data?.inactive)
		)
		.filter(
			(x) =>
				(x.person_type === 'PF' && pageData.data?.pf) ||
				(x.person_type === 'PJ' && pageData.data?.pj)
		)
		.sort((x, y) => SortUtils.sort(x, y, 'name'))

	const ref = useRef(null)
	const importRef = useRef(null)

	const refreshPage = () => {
		api.getAll()
		if (ref.current) {
			ref.current.scroll({
				top: 0,
				left: 0,
				behavior: 'smooth',
			})
		}
	}

	useEffect(() => {
		refreshPage()
		form.close()
	}, [])

	return (
		<div className={style.customerPage} data-page="customer">
			{form.originalValue && <CustomerForm />}
			<div className={style.customerPageContent} ref={ref}>
				<div className={style.pageHeader}>
					<Button
						className={style.personAddButton}
						leftIcon="person_add"
						onClick={() => {
							form.show(
								{
									active: true,
									address: {},
								},
								refreshPage
							)
						}}
					>
						Novo Cliente
					</Button>
					<ButtonWhite
						leftIcon="download"
						onClick={() => {
							importRef.current.click()
						}}
					>
						Importar
					</ButtonWhite>
					<input
						className={style.importJSONInput}
						type="file"
						ref={importRef}
						onChange={(event) => {
							const file = event.target.files[0]

							if (file) {
								const reader = new FileReader()

								reader.onload = (e) => {
									const content = e.target.result
									const jsonValue = JSON.parse(String(content))
									form.show(
										{
											...jsonValue,
											id: undefined,
											picture: null,
											favorite: false,
											address_id: undefined,
											active: true,
										},
										refreshPage
									)
								}

								reader.readAsText(file)
							}
						}}
					/>
					<hr />
					<label className={style.faded}>{filteredData.length} registro(s)</label>
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
					>
						<hr />
						<Button
							leftIcon="person"
							rightBag={api.data.filter((x) => x.person_type === 'PF').length}
							variationOverride={pageData.data?.pf ? 'primary' : 'ghost'}
							onClick={() => {
								pageData.setProp('pf', (x) => !x)
							}}
						>
							Pessoa Física
						</Button>
						<Button
							leftIcon="group"
							rightBag={api.data.filter((x) => x.person_type === 'PJ').length}
							variationOverride={pageData.data?.pj ? 'primary' : 'ghost'}
							onClick={() => {
								pageData.setProp('pj', (x) => !x)
							}}
						>
							Pessoa Jurídica
						</Button>
						<Button
							leftIcon="person_check"
							rightBag={api.data.filter((x) => x.active).length}
							variationOverride={pageData.data?.active ? 'primary' : 'ghost'}
							onClick={() => {
								pageData.setProp('active', (x) => !x)
							}}
						>
							Ativos
						</Button>
						<Button
							leftIcon="person_cancel"
							rightBag={api.data.filter((x) => !x.active).length}
							variationOverride={pageData.data?.inactive ? 'primary' : 'ghost'}
							onClick={() => {
								pageData.setProp('inactive', (x) => !x)
							}}
						>
							Inativos
						</Button>
						<Button
							leftIcon="favorite"
							rightBag={filteredData.filter((x) => x.favorite).length}
							variationOverride={pageData.data?.favorite ? 'primary' : 'ghost'}
							onClick={() => {
								pageData.setProp('favorite', (x) => !x)
							}}
						>
							Favoritos
						</Button>
					</Bag>
					<hr />
					<Button leftIcon="refresh" onClick={refreshPage} />
				</div>
				<div className={style.pageContent}>
					{filteredData.map((customer) => {
						return (
							<CustomerCard
								key={customer.id}
								customer={customer}
								onClose={refreshPage}
							/>
						)
					})}
				</div>
			</div>
		</div>
	)
}

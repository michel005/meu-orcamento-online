import React, { useEffect, useRef, useState } from 'react'
import style from './CustomerPage.module.scss'
import { Button, ButtonWhite } from '../../components/Button'
import { useApi } from '../../hooks/useApi'
import { CustomerCard } from './customers/CustomerCard'
import { CustomerType } from '../../types/AllTypes'
import { useForm } from '../../hooks/useForm'
import { CustomerFormSidebar } from './customers/CustomerFormSidebar'
import { Bag } from '../../components/Bag'

export const CustomerPage = () => {
	const { originalValue, show, close } = useForm<CustomerType>('customer')
	const { getAll, data } = useApi('customer')
	const [filters, setFilters] = useState({
		favorite: false,
		active: true,
		inactive: false,
		pf: true,
		pj: true,
	})
	const [scrollPosition, setScrollPosition] = useState(0)

	const filteredData = data
		.filter((x) => !filters.favorite || x.favorite)
		.filter((x) => (x.active && filters.active) || (!x.active && filters.inactive))
		.filter(
			(x) => (x.person_type === 'PF' && filters.pf) || (x.person_type === 'PJ' && filters.pj)
		)

	const refreshPage = () => {
		getAll()
	}

	useEffect(() => {
		refreshPage()
		close()
	}, [])

	return (
		<div
			className={style.customerPage}
			data-show-form={!!originalValue}
			data-scroll-position={scrollPosition > 60}
		>
			{originalValue && <CustomerFormSidebar />}
			<div
				className={style.customerPageContent}
				onScroll={(e) => {
					setScrollPosition((e.currentTarget as any).scrollTop)
				}}
			>
				<div className={style.pageHeader}>
					<Button
						className={style.personAddButton}
						leftIcon="person_add"
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
					<ButtonWhite leftIcon="download">Importar</ButtonWhite>
					<hr />
					<label className={style.faded}>{filteredData.length} registro(s)</label>
					<div style={{ flexGrow: 1 }} />
					<Bag
						button={(show, setShow) => (
							<Button
								className={style.showFiltersButton}
								variationOverride={show ? 'primary' : 'white'}
								leftIcon="filter_alt"
								rightBag={Object.keys(filters).filter((x) => filters[x]).length}
								onClick={() => {
									setShow((x) => !x)
								}}
							/>
						)}
					>
						<ButtonWhite
							leftIcon="person"
							rightBag={data.filter((x) => x.person_type === 'PF').length}
							variationOverride={filters.pf ? 'primary' : 'white'}
							onClick={() => {
								setFilters((x) => ({
									...x,
									pf: !x.pf,
								}))
							}}
						>
							Pessoa Física
						</ButtonWhite>
						<ButtonWhite
							leftIcon="group"
							rightBag={data.filter((x) => x.person_type === 'PJ').length}
							variationOverride={filters.pj ? 'primary' : 'white'}
							onClick={() => {
								setFilters((x) => ({
									...x,
									pj: !x.pj,
								}))
							}}
						>
							Pessoa Jurídica
						</ButtonWhite>
						<ButtonWhite
							leftIcon="person_check"
							rightBag={data.filter((x) => x.active).length}
							variationOverride={filters.active ? 'primary' : 'white'}
							onClick={() => {
								setFilters((x) => ({
									...x,
									active: !x.active,
								}))
							}}
						>
							Ativos
						</ButtonWhite>
						<ButtonWhite
							leftIcon="person_cancel"
							rightBag={data.filter((x) => !x.active).length}
							variationOverride={filters.inactive ? 'primary' : 'white'}
							onClick={() => {
								setFilters((x) => ({
									...x,
									inactive: !x.inactive,
								}))
							}}
						>
							Inativos
						</ButtonWhite>
						<ButtonWhite
							leftIcon="favorite"
							rightBag={filteredData.filter((x) => x.favorite).length}
							variationOverride={filters.favorite ? 'primary' : 'white'}
							onClick={() => {
								setFilters((x) => ({
									...x,
									favorite: !x.favorite,
								}))
							}}
						>
							Favoritos
						</ButtonWhite>
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

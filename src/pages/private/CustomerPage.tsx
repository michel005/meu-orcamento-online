import React, { useContext, useEffect, useRef, useState } from 'react'
import style from './CustomerPage.module.scss'
import { Button, ButtonWhite } from '../../components/Button'
import { useApi } from '../../hooks/useApi'
import { CustomerCard } from './customers/CustomerCard'
import { CustomerType } from '../../types/AllTypes'
import { useForm } from '../../hooks/useForm'
import { CustomerFormSidebar } from './customers/CustomerFormSidebar'
import { Bag } from '../../components/Bag'
import { Icon } from '../../components/Icon'
import { ConfigContext } from '../../contexts/ConfigContext'

export const CustomerPage = () => {
	const { loading } = useContext(ConfigContext)
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
	const ref = useRef(null)

	const filteredData = data
		.filter((x) => !filters.favorite || x.favorite)
		.filter((x) => (x.active && filters.active) || (!x.active && filters.inactive))
		.filter(
			(x) => (x.person_type === 'PF' && filters.pf) || (x.person_type === 'PJ' && filters.pj)
		)

	const refreshPage = () => {
		getAll()
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
				ref={ref}
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
				{!loading && filteredData.length === 0 && (
					<div className={style.noDataFound}>
						<div className={style.noDataFoundHeader}>
							<Icon icon="person_search" />
							<h1>Nenhum cliente encontrado</h1>
						</div>
						<p>Existem algumas razões para isso ocorrer:</p>
						<ul>
							<li>
								<b>Você ainda não cadastrou clientes</b>
								<br />
								Cadastre um novo cliente clicando no botão "Novo Cliente"
							</li>
							<li>
								<b>Os filtros selecionados não retornam resultados</b>
								<br />
								Selecione filtros diferentes. Observe os números a esquerda de cada
								opção de filtro, eles mostram quantos registros existem para cada
								opção.
							</li>
						</ul>
					</div>
				)}
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

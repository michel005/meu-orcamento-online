import style from './CustomerFilter.module.scss'
import { ButtonGroup } from '../../../components/ButtonGroup'
import { Button, ButtonSecondary } from '../../../components/Button'
import { ImportCustomerButton } from './ImportCustomerButton'
import React, { useContext, useState } from 'react'
import { useFormLayout } from '../../../hooks/useFormLayout'
import { usePage } from '../../../hooks/usePage'
import { SessionContext } from '../../../contexts/SessionContext'
import { CustomerType } from '../../../types/AllTypes'

export const CustomerFilter = () => {
	const { currentUser } = useContext(SessionContext)
	const { form, api, pageData } = usePage<CustomerType>('customer')
	const [showFilters, setShowFilters] = useState(false)
	const filterFormLayout = useFormLayout({
		definition: {
			general_search: {
				type: 'text',
				placeholder: 'Busque por nome, e-mail ou endereço',
				leftSide: (
					<ButtonSecondary
						style={{ marginRight: '14px' }}
						leftIcon={showFilters ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}
						onClick={() => {
							setShowFilters((x) => !x)
						}}
					>
						Filtros
					</ButtonSecondary>
				),
			},
		},
		value: pageData.data,
		onChange: pageData.set,
	})

	return (
		<div className={style.filters}>
			<section>
				<Button
					leftIcon="person_add"
					onClick={() => {
						form.show(
							{
								picture: null,
								active: true,
								address: {},
							},
							() => api.getAll()
						)
					}}
				>
					Novo Cliente
				</Button>
				<ImportCustomerButton onClose={() => api.getAll()} />
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
					<ButtonGroup>
						<Button
							leftIcon="groups_2"
							variationOverride={!pageData.data?.favorite ? 'primary' : 'secondary'}
							onClick={() => {
								pageData.setProp('favorite', () => false)
							}}
						>
							Todos
						</Button>
						<Button
							leftIcon="favorite"
							variationOverride={pageData.data?.favorite ? 'primary' : 'secondary'}
							onClick={() => {
								pageData.setProp('favorite', () => true)
							}}
						>
							Favoritos
						</Button>
					</ButtonGroup>
					<ButtonGroup>
						<Button
							leftIcon="groups"
							variationOverride={
								pageData.data.personType === null ? 'primary' : 'secondary'
							}
							onClick={() => {
								pageData.setProp('personType', () => null)
							}}
						>
							Todos
						</Button>
						<Button
							leftIcon="person"
							variationOverride={
								pageData.data?.personType === 'PF' ? 'primary' : 'secondary'
							}
							onClick={() => {
								pageData.setProp('personType', () => 'PF')
							}}
						>
							Física
						</Button>
						<Button
							leftIcon="group"
							variationOverride={
								pageData.data?.personType === 'PJ' ? 'primary' : 'secondary'
							}
							onClick={() => {
								pageData.setProp('personType', () => 'PJ')
							}}
						>
							Jurídica
						</Button>
					</ButtonGroup>
				</div>
			)}
		</div>
	)
}
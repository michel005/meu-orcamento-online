import { Button } from '../../components/Button'
import React, { useContext } from 'react'
import { PageContext } from '../../context/PageContext'
import { ModalContext } from '../../context/ModalContext'
import { AccountCategories } from '../../constants/AccountCategories'
import { Select } from '../../components/Select'

export const AccountOptions = () => {
	const { data, defineData } = useContext(PageContext)
	const { show } = useContext(ModalContext)

	return (
		<>
			<Button
				leftIcon="add"
				variation="sidebar"
				onClick={() => {
					show({
						entity: 'account',
						modal: {
							name: 'Nova Conta',
						},
					})
				}}
			>
				Cadastrar
			</Button>
			<div style={{ flexGrow: 1 }} />
			<Select
				label="Categoria"
				variation="sidebar"
				options={Object.keys(AccountCategories)}
				nullable={true}
				nullableLabel="Todas as Categorias"
				idModifier={(category: string) => category}
				valueModifier={(category: string) => AccountCategories[category]}
				value={data.account?.category}
				onChange={(x) => {
					defineData('account', 'category', x)
				}}
			/>
		</>
	)
}

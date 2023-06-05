import { Button } from '../../components/Button'
import { ButtonGroup } from '../../components/ButtonGroup'
import React, { useContext } from 'react'
import { AccountType, DatabaseContext } from '../../context/DatabaseContext'
import { PageContext } from '../../context/PageContext'
import { ModalContext } from '../../context/ModalContext'

export const AccountOptions = () => {
	const { accounts } = useContext(DatabaseContext)
	const { data, defineData } = useContext(PageContext)
	const { show } = useContext(ModalContext)

	const allAccounts = Object.keys(AccountType).map((x) => ({
		id: x,
		value: x,
		label: AccountType[x],
		bag: accounts.filter((y) => y.type === x).length.toString(),
	}))

	return (
		<>
			<Button
				leftIcon="add"
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
			<h5>Filtros</h5>
			<ButtonGroup
				variation="secondary"
				orientation="vertical"
				list={allAccounts}
				nullable={true}
				nullableLabel="Todos os Tipos"
				nullableBag={accounts.length}
				value={{ id: data.account?.type }}
				onChange={(x) => {
					defineData('account', 'type', x?.value)
				}}
			/>
		</>
	)
}

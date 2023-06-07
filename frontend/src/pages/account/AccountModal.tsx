import React, { useContext, useEffect, useState } from 'react'
import { Modal } from '../../components/Modal'
import { ModalContext } from '../../context/ModalContext'
import { DatabaseContext } from '../../context/DatabaseContext'
import { FormLayout } from '../../components/FormLayout'
import { useFormValidation } from '../../hook/useFormValidation'
import { AccountType } from '../../types/AccountType'
import { AccountCategories, AccountCategoriesDescription } from '../../constants/AccountCategories'
import { Alert } from '../../components/Alert'

export type AccountModalType = {
	entity: AccountType
}

export const AccountModal = ({ entity }: AccountModalType) => {
	const { accounts, create, update, remove } = useContext(DatabaseContext)
	const { showQuestion, close } = useContext(ModalContext)

	const { validate, errors } = useFormValidation((account: AccountType, errors) => {
		if (!account.name || account.name.trim() === '') {
			errors.set('name', 'Nome da conta é obrigatório')
		}
		const accountWithSameName = accounts.find(
			(x) => x.name.toUpperCase() === account.name.toUpperCase()
		)
		if (accountWithSameName && accountWithSameName.id !== account.id) {
			errors.set('name', 'Nome já foi utilizado por outra conta')
		}
		if (!account.category) {
			errors.set('category', 'Categoria é obrigatório')
		}
	})

	const [account, setAccount] = useState<AccountType>(entity)

	useEffect(() => {
		setAccount((x) => ({ ...x, ...entity }))
	}, [entity])

	return (
		<Modal
			noOverflow={true}
			style={{ zIndex: 'var(--zindex-modal)' }}
			header="Formulário de Conta Financeira"
			onClose={() => {
				close('account')
			}}
			buttons={[
				{
					leftIcon: 'save',
					children: 'Salvar',
					onClick: () => {
						if (!validate(account)) {
							return
						}
						if (account.id) {
							update('account', account, () => close('account'))
						} else {
							create('account', account, () => close('account'))
						}
					},
				},
				{
					leftIcon: 'delete',
					children: 'Excluir',
					disabled: !account.id,
					variation: 'secondary',
					onClick: () => {
						showQuestion(
							'Exclusão de Conta Financeira',
							'Deseja realmente excluir esta conta?',
							() => {
								remove('account', account?.id || '', () => {
									close('account')
								})
							}
						)
					},
				},
			]}
		>
			<FormLayout
				fields={[
					{
						id: 'name',
						label: 'Nome da Conta',
					},
					{
						id: 'category',
						type: 'select',
						label: 'Categoria',
						options: Object.keys(AccountCategories).map((x) => x),
						idModifier: (type) => type,
						valueModifier: (type) => AccountCategories[type],
						variation: 'secondary',
						nullableLabel: 'Selecione uma categoria',
					},
				]}
				onChange={setAccount}
				value={account}
				formValidation={errors}
			>
				{(fields) => {
					return (
						<>
							<div data-row>
								{fields.name}
								{fields.category}
							</div>
							{account.category && (
								<Alert icon="info">
									{AccountCategoriesDescription[account.category]}
								</Alert>
							)}
						</>
					)
				}}
			</FormLayout>
		</Modal>
	)
}

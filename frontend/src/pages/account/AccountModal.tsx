import React, { useContext, useEffect, useState } from 'react'
import { Modal } from '../../components/Modal'
import { ModalContext } from '../../context/ModalContext'
import { Account, AccountType, DatabaseContext } from '../../context/DatabaseContext'
import { FormLayout } from '../../components/FormLayout'
import { useFormValidation } from '../../hook/useFormValidation'

export type AccountModalType = {
	entity: Account
}

export const AccountModal = ({ entity }: AccountModalType) => {
	const { create, update, remove } = useContext(DatabaseContext)
	const { showQuestion, close } = useContext(ModalContext)

	const { validate, errors } = useFormValidation((account: Account, errors) => {
		if (!account.name || account.name.trim() === '') {
			errors.set('name', 'Nome da conta é obrigatório')
		}
		if (!account.type) {
			errors.set('type', 'Tipo da conta é obrigatório')
		}
	})

	const [account, setAccount] = useState<Account>(entity)

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
						id: 'type',
						type: 'select',
						label: 'Tipo de Conta',
						options: Object.keys(AccountType).map((x) => x),
						idModifier: (type) => type,
						valueModifier: (type) => AccountType[type],
						variation: 'secondary',
						nullableLabel: 'Selecione um tipo de conta',
					},
				]}
				onChange={setAccount}
				value={account}
				formValidation={errors}
			>
				{(fields) => {
					return (
						<>
							{fields.name}
							{fields.type}
						</>
					)
				}}
			</FormLayout>
		</Modal>
	)
}

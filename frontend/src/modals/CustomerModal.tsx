import { Modal } from '../components/Modal'
import React from 'react'
import { useFormLayout } from '../hook/useFormLayout'
import { CustomerType } from '../utils/CustomerType'
import { useModalData } from '../hook/useModalData'
import { useDatabase } from '../hook/useDatabase'
import { useFormValidation } from '../hook/useFormValidation'
import style from './CustomerModal.module.scss'
import { PersonType } from '../constants/PersonType'

export const CustomerModal = () => {
	const { save } = useDatabase('customer')
	const { modal, update, close } = useModalData<CustomerType>('customer')
	const { errors, validate } = useFormValidation<CustomerType>((value, errors) => {
		if (!value.fullName || value.fullName.trim().length === 0) {
			errors.set('fullName', 'O nome completo é obrigatório')
		}
		if (!value.email || value.email.trim().length === 0) {
			errors.set('email', 'O e-mail é obrigatório')
		}
		if (!value.personType) {
			errors.set('personType', 'O tipo de pessoa é obrigatório')
		}
		if (!value.document || value.document.trim().length === 0) {
			errors.set('document', 'O CPF/CNPJ é obrigatório')
		}
	})
	const fields = useFormLayout<CustomerType>({
		fields: [
			{
				id: 'birthday',
				label: 'Data de Nascimento',
				type: 'date',
			},
			{
				id: 'profilePicture',
				label: 'Imagem de Usuário',
				type: 'image',
				enableRepositioning: true,
			},
			{
				id: 'fullName',
				label: 'Nome Completo',
			},
			{
				id: 'email',
				label: 'E-mail',
			},
			{
				id: 'personType',
				label: 'Tipo de Pessoa',
				type: 'select',
				options: [null, 'PF', 'PJ'],
				idModifier: (x) => x,
				valueModifier: (x) => PersonType[x],
			},
			{
				id: 'document',
				label: 'CPF/CNPJ',
			},
			{
				id: 'active',
				type: 'checkbox',
				label: 'Ativo',
			},
		],
		value: modal,
		onChange: (value) => update(value),
		formValidation: errors,
	})

	return (
		<Modal
			className={style.customerModal}
			header="Formulário de Clientes"
			onClose={() => close()}
			buttons={[
				{
					children: 'Salvar',
					leftIcon: 'save',
					onClick: () => {
						if (!validate(modal)) {
							return
						}
						save(modal, () => {
							close()
						})
					},
				},
			]}
		>
			<div className={style.content}>
				{fields.profilePicture}
				{fields.fullName}
				{fields.email}
				<div className={style.row}>
					{fields.personType}
					{fields.document}
				</div>
				{fields.birthday}
				{fields.active}
			</div>
		</Modal>
	)
}

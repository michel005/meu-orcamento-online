import React, { useContext } from 'react'
import style from './CustomerFormSidebar.module.scss'
import { useFormLayout } from '../../../hooks/useFormLayout'
import { CustomerDefinition } from '../../../definitions/CustomerDefinition'
import { CustomerType } from '../../../types/AllTypes'
import { Button, ButtonGhost } from '../../../components/Button'
import { useApi } from '../../../hooks/useApi'
import { ConfigContext } from '../../../contexts/ConfigContext'
import { useForm } from '../../../hooks/useForm'
import { ErrorUtils } from '../../../utils/ErrorUtils'

export const CustomerFormSidebar = () => {
	const { create, update, remove } = useApi('customer')
	const { form, edit, close } = useForm<CustomerType>('customer')
	const { setLoading } = useContext(ConfigContext)
	const { fields, setErrors } = useFormLayout<CustomerType>({
		definition: CustomerDefinition(),
		value: form,
		onChange: edit,
	})

	const onSuccess = () => {
		close()
	}

	const onError = (errors: any) => {
		setErrors(ErrorUtils.convertErrors(errors.response.data))
	}

	return (
		<div className={style.customerFormSidebar}>
			<h1>Formulário de Cliente</h1>
			<div className={style.options}>
				<Button
					leftIcon="save"
					onClick={() => {
						if (form?._id) {
							update({
								id: form?._id,
								data: form,
								onSuccess,
								onError,
							})
						} else {
							create({
								data: form,
								onSuccess,
								onError,
							})
						}
					}}
				>
					Salvar
				</Button>
				<ButtonGhost
					leftIcon="save"
					onClick={() => {
						setLoading(true)
						remove({
							id: form?._id,
							onSuccess,
							onError,
						})
					}}
				>
					Excluir
				</ButtonGhost>
				<div style={{ flexGrow: 1 }} />
				<ButtonGhost
					leftIcon="close"
					onClick={() => {
						close(false)
					}}
				>
					Fechar
				</ButtonGhost>
			</div>
			{fields.picture}
			{fields.name}
			{fields.email}
			{fields.phone}
			{fields.birthday}
			{fields.person_type}
			{fields.document_type}
			{fields.document_number}
			{fields.error}
		</div>
	)
}

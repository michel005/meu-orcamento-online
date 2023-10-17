import React, { useContext } from 'react'
import style from './CustomerFormSidebar.module.scss'
import { useFormLayout } from '../../../hooks/useFormLayout'
import { CustomerDefinition } from '../../../definitions/CustomerDefinition'
import { AddressType, CustomerType } from '../../../types/AllTypes'
import { Button, ButtonWhite } from '../../../components/Button'
import { useApi } from '../../../hooks/useApi'
import { ConfigContext } from '../../../contexts/ConfigContext'
import { useForm } from '../../../hooks/useForm'
import { ErrorUtils } from '../../../utils/ErrorUtils'
import { AddressDefinition } from '../../../definitions/AddressDefinition'

export const CustomerFormSidebar = () => {
	const { setMessage } = useContext(ConfigContext)
	const { create, update, remove } = useApi('customer')
	const { form, edit, close } = useForm<CustomerType>('customer')
	const { setLoading } = useContext(ConfigContext)
	const { fields, setErrors } = useFormLayout<CustomerType>({
		definition: CustomerDefinition(),
		value: form,
		onChange: edit,
	})
	const { fields: addressFields, setErrors: setAddressErrors } = useFormLayout<AddressType>({
		definition: AddressDefinition(),
		value: form?.address || {},
		onChange: (value) => {
			form.address = value
			edit(form)
		},
	})

	const onSuccess = () => {
		close()
	}

	const onError = (errors: any) => {
		setErrors(ErrorUtils.convertErrors(errors.response.data))
		setAddressErrors(ErrorUtils.convertErrors(errors.response.data?.address))
	}

	return (
		<div className={style.customerFormSidebar}>
			<div className={style.content}>
				<div className={style.userCard}>
					{fields.picture}
					<div className={style.userCardInfo}>
						<h2>{form.name}</h2>
						<p>{form.email}</p>
						<p>{form.phone}</p>
						<p>{form.birthday}</p>
					</div>
				</div>
				{fields.name}
				{fields.email}
				{fields.phone}
				{fields.birthday}
				{fields.person_type}
				{fields.document_type}
				{fields.document_number}
				{fields.error}
				<h3>Endereço</h3>
				{addressFields.zip_code}
				{addressFields.street_name}
				{addressFields.street_number}
				{addressFields.complement}
				{addressFields.city}
				{addressFields.state}
				{addressFields.country}
				{addressFields.error}
			</div>
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
				{form?._id && (
					<>
						<ButtonWhite
							leftIcon="save"
							onClick={() => {
								setMessage({
									header: 'Deseja realmente excluir este cliente?',
									content: 'Esta operação não pode ser desfaita.',
									type: 'question',
									confirm: () => {
										setLoading(true)
										remove({
											id: form?._id,
											onSuccess,
											onError,
										})
									},
								})
							}}
						>
							Excluir
						</ButtonWhite>
						<ButtonWhite leftIcon="more_horiz" />
					</>
				)}
				<div style={{ flexGrow: 1 }} />
				<ButtonWhite
					leftIcon="close"
					onClick={() => {
						close(false)
					}}
				>
					Fechar
				</ButtonWhite>
			</div>
		</div>
	)
}

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
	const { setMessage, setLoading } = useContext(ConfigContext)
	const { create, update, remove } = useApi('customer')
	const { form, edit, close } = useForm<CustomerType>('customer')
	const { getField, setErrors } = useFormLayout<CustomerType>({
		definition: CustomerDefinition(form),
		value: form,
		onChange: edit,
	})
	const { getField: getAddressField, setErrors: setAddressErrors } = useFormLayout<AddressType>({
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
			<div className={style.userCard}>
				<div
					className={style.userImage}
					style={{ backgroundImage: `url(${form.picture})` }}
				>
					{getField('picture')}
				</div>
			</div>
			<div className={style.content}>
				{getField('name')}
				{getField('email')}
				{getField('phone')}
				{getField('birthday')}
				{getField('person_type')}
				{getField('document_type')}
				{getField('document_number')}
				{getField('error')}
				<h3>Endereço</h3>
				{getAddressField('zip_code')}
				{getAddressField('street_name')}
				{getAddressField('street_number')}
				{getAddressField('complement')}
				{getAddressField('city')}
				{getAddressField('state')}
				{getAddressField('country')}
				{getAddressField('error')}
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

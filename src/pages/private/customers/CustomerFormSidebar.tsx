import React, { useContext, useEffect } from 'react'
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
import { Error } from '../../../components/Error'

export const CustomerFormSidebar = () => {
	const { setMessage, setLoading } = useContext(ConfigContext)
	const { create, update, remove } = useApi('customer')
	const { form, edit, close } = useForm<CustomerType>('customer')
	const { getField, setErrors } = useFormLayout<CustomerType>({
		definition: CustomerDefinition(form),
		value: form,
		onChange: edit,
		disableAll: !form.active,
	})
	const { getField: getAddressField, setErrors: setAddressErrors } = useFormLayout<AddressType>({
		definition: AddressDefinition(),
		value: form?.address || {},
		onChange: (value) => {
			form.address = value
			edit(form)
		},
		disableAll: !form.active,
	})

	const onSuccess = () => {
		close()
	}

	const onError = (errors: any) => {
		setErrors(ErrorUtils.convertErrors(errors.response.data))
		setAddressErrors(ErrorUtils.convertErrors(errors.response.data?.address))
	}

	useEffect(() => {
		;(form as any)?.ref?.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
	}, [form])

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
			{!form.active && (
				<>
					<Error message="Cliente inativo. Para realizar alterações, ative este usuário novamente." />
					<Button style={{ borderRadius: 0 }} leftIcon="person_check">
						Ativar
					</Button>
				</>
			)}
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
					disabled={!form.active}
					onClick={() => {
						if (form?.id) {
							update({
								id: form?.id,
								data: {
									...form,
									ref: undefined,
								},
								onSuccess,
								onError,
							})
						} else {
							create({
								data: {
									...form,
									ref: undefined,
								},
								onSuccess,
								onError,
							})
						}
					}}
				>
					Salvar
				</Button>
				{form?.id && (
					<>
						<ButtonWhite
							disabled={!form.active}
							leftIcon="delete"
							onClick={() => {
								setMessage({
									header: 'Deseja realmente excluir este cliente?',
									content:
										'Esta operação não pode ser desfeita. Esta operação não exclui as informações de faturamento deste cliente.',
									type: 'question',
									confirm: () => {
										setLoading(true)
										remove({
											id: form?.id,
											onSuccess,
											onError,
										})
									},
								})
							}}
						>
							Excluir
						</ButtonWhite>
						<ButtonWhite leftIcon="more_horiz" disabled={!form.active} />
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

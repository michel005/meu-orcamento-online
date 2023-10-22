import React, { useContext } from 'react'
import style from './ProductFormSidebar.module.scss'
import { useFormLayout } from '../../../hooks/useFormLayout'
import { ProductType } from '../../../types/AllTypes'
import { Button, ButtonWhite } from '../../../components/Button'
import { useApi } from '../../../hooks/useApi'
import { ConfigContext } from '../../../contexts/ConfigContext'
import { useForm } from '../../../hooks/useForm'
import { ErrorUtils } from '../../../utils/ErrorUtils'
import { ProductDefinition } from '../../../definitions/ProductDefinition'

export const ProductFormSidebar = ({ customerData }) => {
	const { setMessage, setLoading } = useContext(ConfigContext)
	const { create, update, remove } = useApi('product')
	const { form, edit, close } = useForm<ProductType>('product')
	const { getField, getError, setErrors } = useFormLayout<ProductType>({
		definition: ProductDefinition(form, setMessage, edit, customerData),
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
			<div className={style.userCard}>
				<div className={style.userImage}>{getField('picture')}</div>
			</div>
			<div className={style.content}>
				{getField('customer_id')}
				{getField('name')}
				{getField('description')}
				{getField('code')}
				{getField('categories')}
				{getField('hashtags')}
				{getField('price')}
				{getError()}
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
									header: 'Deseja realmente excluir este produto?',
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

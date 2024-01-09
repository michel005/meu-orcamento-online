import React from 'react'
import style from './ProductForm.module.scss'
import { FormModal } from '../../../components/FormModal'
import { usePage } from '../../../hooks/usePage'
import { ProductType } from '../../../types/AllTypes'
import { ProductDefinition } from '../../../definitions/ProductDefinition'
import { useFormLayout } from '../../../hooks/useFormLayout'
import { Button, ButtonGhost, ButtonSecondary, ButtonWhite } from '../../../components/Button'
import { Bag } from '../../../components/Bag'
import { ErrorUtils } from '../../../utils/ErrorUtils'
import { useApiData } from '../../../hooks/useApiData'
import { FlexRow } from '../../../components/FlexRow'

export const ProductForm = () => {
	const { api, form } = usePage<ProductType>('product', ProductDefinition)
	const customerApiData = useApiData('customer')
	const productFormLayout = useFormLayout<ProductType>({
		definition: ProductDefinition(form.form, customerApiData.data),
		value: form.form,
		onChange: form.edit,
	})

	const onSuccess = () => {
		form.close()
	}

	const onError = (errors: any) => {
		productFormLayout.setErrors(ErrorUtils.convertErrors(errors.response.data || {}))
	}

	return (
		<FormModal
			title="Formulário de Produto"
			onClose={() => {
				form.close(false)
			}}
		>
			<div className={style.content}>
				{form.form._id && (
					<section
						className={style.userImage}
						style={
							form.form.picture?.value
								? { backgroundImage: `url(${form.form.picture?.value})` }
								: {}
						}
					>
						{productFormLayout.getField('picture')}
					</section>
				)}
				<section>
					{productFormLayout.getField('seller_id')}
					{productFormLayout.getField('title')}
					{productFormLayout.getField('description')}
					{productFormLayout.getField('categories')}
					<div className={style.formRow}>
						{productFormLayout.getField('code')}
						{productFormLayout.getField('price')}
					</div>
					{productFormLayout.getField('status', {
						optionsPosition: 'top',
					})}
				</section>
			</div>
			<div className={style.options}>
				<Button
					leftIcon="save"
					onClick={() => {
						if (form.form?._id) {
							api.update({
								id: form.form._id,
								data: form.form,
								onSuccess,
								onError,
							})
						} else {
							api.create({
								data: form.form,
								onSuccess,
								onError,
							})
						}
					}}
				>
					Salvar
				</Button>
				{form.form._id && (
					<Bag
						button={(show, setShow) => (
							<ButtonSecondary
								leftIcon="delete"
								onClick={() => {
									setShow(true)
								}}
							>
								Excluir
							</ButtonSecondary>
						)}
						arrowPosition="bottom-left"
					>
						{(show, setShow) => (
							<>
								<p style={{ whiteSpace: 'nowrap' }}>Deseja realmente excluir?</p>
								<FlexRow style={{ justifyContent: 'flex-end' }}>
									<Button
										onClick={() => {
											setShow(false)
											api.remove({
												id: form.form?._id,
												onSuccess,
												onError,
											})
										}}
									>
										Sim
									</Button>
									<ButtonWhite
										onClick={() => {
											setShow(false)
										}}
									>
										Não
									</ButtonWhite>
								</FlexRow>
							</>
						)}
					</Bag>
				)}
				<div style={{ flexGrow: 1 }} />
				{form.form?._id && (
					<Bag
						button={(show, setShow) => (
							<Button
								leftIcon="more_horiz"
								variationOverride={show ? 'secondary' : 'ghost'}
								onClick={() => {
									setShow((x: boolean) => !x)
								}}
							/>
						)}
						arrowPosition="bottom-right"
					>
						{(_: unknown, setShow: any) => (
							<>
								<ButtonGhost
									leftIcon="search"
									onClick={() => {
										window.open(
											`https://www.google.com.br/search?q=${form.form.title}`,
											'_blank'
										)
										setShow(false)
									}}
								>
									Procurar no Google
								</ButtonGhost>
							</>
						)}
					</Bag>
				)}
			</div>
		</FormModal>
	)
}

import React, { useContext, useEffect, useState } from 'react'
import { FormModal } from '../../../components/FormModal'
import { useForm } from '../../../hooks/useForm'
import { useFormLayout } from '../../../hooks/useFormLayout'
import { ProductDefinition } from '../../../definitions/ProductDefinition'
import { useApiData } from '../../../hooks/useApiData'
import style from './AddProductInBulkForm.module.scss'
import { FlexRow } from '../../../components/FlexRow'
import { Button, ButtonSecondary } from '../../../components/Button'
import { ProductType } from '../../../types/AllTypes'
import { v4 as uuid } from 'uuid'
import axios from 'axios'
import { ConfigContext } from '../../../contexts/ConfigContext'

const ProductRow = ({ value, onChange, onChangeMaster, errors, index }) => {
	const formLayout = useFormLayout<ProductType>({
		definition: ProductDefinition(),
		value: value,
		onChange: onChange,
		injectErrors: errors,
	})

	useEffect(() => {
		formLayout.setErrors(errors)
	}, [errors])

	return (
		<FlexRow style={{ alignItems: 'flex-start' }}>
			{formLayout.getField('title')}
			{formLayout.getField('code')}
			{formLayout.getField('price')}
			<ButtonSecondary
				style={{ alignSelf: 'center', flexGrow: 0 }}
				leftIcon="delete"
				onClick={() => {
					onChangeMaster((x) => {
						console.log(JSON.stringify(x))
						x.splice(index, 1)
						return [...x]
					})
				}}
			/>
		</FlexRow>
	)
}

export const AddProductsInBulkForm = () => {
	const { setLoading } = useContext(ConfigContext)
	const customerApiData = useApiData('customer')
	const [errors, setErrors] = useState(null)
	const form = useForm<{
		seller_id?: string
		products: ProductType[]
	}>('product_bulk')
	const formLayout = useFormLayout({
		definition: {
			seller_id: ProductDefinition(null, customerApiData.data).seller_id,
		},
		value: form.form,
		onChange: form.edit,
	})

	return (
		<FormModal title="Adicionar produtos em lote" onClose={() => form.close(false)}>
			<div className={style.content}>
				<p>Esta janela é utilizada para adicionar vários produtos a um mesmo vendedor.</p>
				<section>
					<FlexRow>
						{formLayout.getField('seller_id')}
						<Button
							style={{ flexGrow: 0 }}
							leftIcon="add"
							disabled={!form.form.seller_id}
							onClick={() => {
								form.editProp('products', (x) => {
									if (!x) {
										return [
											{
												code: uuid().replaceAll('-', ''),
											},
										]
									}
									x.push({
										code: uuid().replaceAll('-', ''),
									})
									return [...x]
								})
							}}
						>
							Novo Produto
						</Button>
					</FlexRow>
					{(form.form.products || []).map((product, productIndex) => {
						return (
							<ProductRow
								key={productIndex}
								value={product}
								onChange={(value) => {
									form.editProp('products', (x) => {
										x[productIndex] = { ...value }
										return [...x]
									})
								}}
								onChangeMaster={(value) => form.editProp('products', value)}
								errors={
									errors?.find(([index]) => index === productIndex)?.[1] || {}
								}
								index={productIndex}
							/>
						)
					})}
				</section>
			</div>
			<div className={style.options}>
				<Button
					leftIcon="save"
					onClick={() => {
						setLoading(true)
						axios
							.post('/product/bulk', form.form, {
								headers: {
									authorization: `Baerer ${localStorage.getItem('auth_token')}`,
								},
							})
							.then(() => {
								form.close()
							})
							.catch((response) => {
								setErrors(response.response.data)
							})
							.finally(() => {
								setLoading(false)
							})
					}}
				>
					Salvar
				</Button>
			</div>
		</FormModal>
	)
}

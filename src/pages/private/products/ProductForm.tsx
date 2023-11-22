import React, { useEffect, useMemo, useState } from 'react'
import style from './ProductForm.module.scss'
import { FormModal } from '../../../components/FormModal'
import { usePage } from '../../../hooks/usePage'
import { CustomerType, ProductType, WaitingListType } from '../../../types/AllTypes'
import { ProductDefinition } from '../../../definitions/ProductDefinition'
import { useFormLayout } from '../../../hooks/useFormLayout'
import { useApi } from '../../../hooks/useApi'
import { Button, ButtonGhost, ButtonWhite } from '../../../components/Button'
import { Bag } from '../../../components/Bag'
import { ErrorUtils } from '../../../utils/ErrorUtils'
import { UserPicture } from '../../../components/UserPicture'

export const ProductForm = () => {
	const page = usePage<ProductType>('product', ProductDefinition)
	const customerApi = useApi('customer')
	const waitingListApi = useApi('waitingList')
	const { message, api, form } = page
	const productFormLayout = useFormLayout<ProductType>({
		definition: ProductDefinition(form.form, customerApi.data || []),
		value: form.form,
		onChange: form.edit,
	})
	const [waitingListForm, setWaitingListForm] = useState<WaitingListType>({})
	const waitingListFormLayout = useFormLayout<WaitingListType>({
		definition: {
			customer_id: {
				label: 'Cliente',
				type: 'select',
				options: customerApi.data || [],
				idModifier: (value: CustomerType) => value.id,
				valueRender: (x: CustomerType) => (
					<div className={style.selectValueRender}>
						<UserPicture size="28px" picture={x.picture} name={x.full_name} />
						<p>{x.full_name}</p>
					</div>
				),
				optionValueRender: (x: CustomerType) => (
					<div className={style.selectValueRender}>
						<UserPicture size="36px" picture={x.picture} name={x.full_name} />
						<div className={style.nameAndEmail}>
							<b>{x.full_name}</b>
							<p>{x.email}</p>
						</div>
					</div>
				),
			},
		},
		value: waitingListForm,
		onChange: setWaitingListForm,
	})
	const [tab, setTab] = useState('general')
	const randomId = useMemo(() => Math.random(), [])

	const onSuccess = () => {
		form.close()
	}

	const onError = (errors: any) => {
		productFormLayout.setErrors(ErrorUtils.convertErrors(errors.response.data.product || {}))
	}

	useEffect(() => {
		customerApi.getAll()
		if (form.form.id) {
			waitingListApi.getAll({
				query: {
					product: form.form.id,
				},
			})
		}
	}, [])

	return (
		<FormModal
			onClose={() => {
				form.close(false)
			}}
		>
			<div className={style.content}>
				<section>
					<div
						className={style.userImage}
						style={{
							backgroundImage:
								form.form.picture && form.form.picture.startsWith('http')
									? `url(${form.form.picture}?randomId=${randomId})`
									: `url(${form.form.picture})`,
						}}
					>
						{productFormLayout.getField('picture', {
							fullWidth: true,
						})}
					</div>
				</section>
				<section>
					<h1>Formulário de Produto</h1>
					<div className={style.tabs}>
						<Button
							data-error={true}
							leftIcon="description"
							variationOverride={tab === 'general' ? 'primary' : 'ghost'}
							onClick={() => {
								setTab('general')
							}}
							rightBag={
								Object.keys(productFormLayout.errors).length > 0
									? Object.keys(productFormLayout.errors).length
									: undefined
							}
						>
							Dados Gerais
						</Button>
						<Button
							leftIcon="group"
							variationOverride={tab === 'waiting' ? 'primary' : 'ghost'}
							onClick={() => {
								setTab('waiting')
							}}
							rightBag={
								waitingListApi.data.length > 9 ? '+9' : waitingListApi.data.length
							}
						>
							Lista de Espera
						</Button>
					</div>
					{tab === 'general' && (
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
					)}
					{tab === 'waiting' && (
						<section>
							<div className={style.formRow}>
								{waitingListFormLayout.getField('customer_id')}
								<Button
									leftIcon="refresh"
									disabled={!form.form.id}
									onClick={() => {
										waitingListApi.getAll({
											query: {
												product: form.form.id,
											},
										})
									}}
								/>
								<Button
									leftIcon="add"
									disabled={!form.form.id || !waitingListForm.customer_id}
									onClick={() => {
										waitingListApi.create({
											data: {
												customer_id: waitingListForm.customer_id,
												product_id: form.form.id,
											},
											onSuccess: () => {
												setWaitingListForm({})
												waitingListApi.getAll({
													query: {
														product: form.form.id,
													},
												})
											},
										})
									}}
								>
									Adicionar
								</Button>
							</div>
							<ol>
								{waitingListApi.data.map((x, xIndex) => {
									return (
										<li>
											<a
												onClick={() => {
													waitingListApi.removeByQuery({
														query: {
															product: form.form.id,
															customer: x.customer.id,
														},
														onSuccess: () => {
															waitingListApi.getAll({
																query: {
																	product: form.form.id,
																},
															})
														},
													})
												}}
											>
												{x.customer.full_name}
											</a>
										</li>
									)
								})}
							</ol>
						</section>
					)}
				</section>
			</div>
			<div className={style.options}>
				<Button
					leftIcon="save"
					onClick={() => {
						if (form.form?.id) {
							api.update({
								data: {
									product: JSON.parse(
										JSON.stringify({
											...form.form,
										})
									),
								},
								onSuccess,
								onError,
							})
						} else {
							api.create({
								data: {
									product: JSON.parse(
										JSON.stringify({
											...form.form,
										})
									),
								},
								onSuccess,
								onError,
							})
						}
					}}
				>
					Salvar
				</Button>
				{form.form.id && (
					<ButtonWhite
						leftIcon="delete"
						onClick={() => {
							message.question(
								'Deseja realmente excluir este produto?',
								'Esta operação não pode ser desfeita.',
								() => {
									api.remove({
										id: form.form?.id,
										onSuccess,
										onError,
									})
								}
							)
						}}
					>
						Excluir
					</ButtonWhite>
				)}
				<div style={{ flexGrow: 1 }} />
				{form.form?.id && (
					<Bag
						button={(show, setShow) => (
							<Button
								leftIcon="more_horiz"
								variationOverride={show ? 'primary' : 'white'}
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
								<ButtonGhost leftIcon="save">Salvar</ButtonGhost>
							</>
						)}
					</Bag>
				)}
			</div>
		</FormModal>
	)
}

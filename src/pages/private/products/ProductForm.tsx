import React, { useEffect, useMemo, useState } from 'react'
import style from './ProductForm.module.scss'
import { FormModal } from '../../../components/FormModal'
import { usePage } from '../../../hooks/usePage'
import { CustomerType, ProductType, WaitingListType } from '../../../types/AllTypes'
import { ProductDefinition } from '../../../definitions/ProductDefinition'
import { useFormLayout } from '../../../hooks/useFormLayout'
import { useApi } from '../../../hooks/useApi'
import { Button, ButtonGhost, ButtonSecondary, ButtonWhite } from '../../../components/Button'
import { Bag } from '../../../components/Bag'
import { ErrorUtils } from '../../../utils/ErrorUtils'
import { UserPicture } from '../../../components/UserPicture'
import { SelectInput } from '../../../components/inputs/SelectInput'
import { Tabs } from '../../../components/Tabs'
import { useApiData } from '../../../hooks/useApiData'
import { SortUtils } from '../../../utils/SortUtils'
import { FlexRow } from '../../../components/FlexRow'

export const ProductForm = () => {
	const { api, form } = usePage<ProductType>('product', ProductDefinition)
	const customerApiData = useApiData('customer')
	const waitingListApiData = useApiData('waitingList')
	const waitingListApi = useApi('waitingList')
	const productFormLayout = useFormLayout<ProductType>({
		definition: ProductDefinition(form.form, customerApiData.data),
		value: form.form,
		onChange: form.edit,
	})
	const [waitingListForm, setWaitingListForm] = useState<WaitingListType>({})

	const waitingListIds = (waitingListApiData?.data || []).map(
		(x: WaitingListType) => x?.customer?.id
	)
	const selectCustomers = (customerApiData.data || []).filter(
		(x: CustomerType) => !waitingListIds.includes(x.id) && x.id !== form.form.seller_id
	)
	const [tab, setTab] = useState('general')
	const randomId = useMemo(() => Math.random(), [])

	const onSuccess = () => {
		form.close()
	}

	const onError = (errors: any) => {
		productFormLayout.setErrors(ErrorUtils.convertErrors(errors.response.data.product || {}))
	}

	useEffect(() => {
		if (form?.form?.id) {
			waitingListApi.getAll({
				query: {
					product: form.form.id,
				},
			})
		}
	}, [form?.form?.id])

	return (
		<FormModal
			title="Formulário de Produto"
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
						{productFormLayout.getField('picture')}
					</div>
				</section>
				<section>
					<Tabs
						value={tab}
						onChange={setTab}
						options={[
							[
								'general',
								{
									icon: 'description',
									buttonText: 'Dados Gerais',
									bag:
										Object.keys(productFormLayout.errors).length > 0
											? Object.keys(productFormLayout.errors).length
											: undefined,
									content: (
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
									),
								},
							],
							form.form.id && [
								'waiting',
								{
									icon: 'group',
									buttonText: 'Lista de Espera',
									bag:
										waitingListApiData.data.length > 9
											? '+9'
											: waitingListApiData.data.length,
									content: (
										<section>
											{selectCustomers.length > 0 && (
												<div className={style.formRow}>
													<SelectInput
														field="customer_id"
														label="Cliente"
														options={selectCustomers.sort((x, y) =>
															SortUtils.sort(x, y, 'full_name')
														)}
														placeholder="Selecione um cliente"
														numberOfOptions={3}
														idModifier={(value: CustomerType) =>
															value.id
														}
														valueRender={(x: CustomerType) => (
															<div
																className={style.selectValueRender}
															>
																<UserPicture
																	size="28px"
																	picture={x.picture}
																	name={x.full_name}
																/>
																<p>{x.full_name}</p>
															</div>
														)}
														optionValueRender={(x: CustomerType) => (
															<div
																className={style.selectValueRender}
															>
																<UserPicture
																	size="36px"
																	picture={x.picture}
																	name={x.full_name}
																/>
																<div className={style.nameAndEmail}>
																	<b>{x.full_name}</b>
																	<p>{x.email}</p>
																</div>
															</div>
														)}
														value={waitingListForm.customer_id}
														onChange={(value: string) => {
															setWaitingListForm((x) => {
																x.customer_id = value
																return { ...x }
															})
														}}
														rightSide={
															<ButtonWhite
																leftIcon="add"
																disabled={
																	!form.form.id ||
																	!waitingListForm.customer_id
																}
																onClick={() => {
																	waitingListApi.create({
																		data: {
																			customer_id:
																				waitingListForm.customer_id,
																			product_id:
																				form.form.id,
																		},
																		onSuccess: () => {
																			setWaitingListForm({})
																			waitingListApi.getAll({
																				query: {
																					product:
																						form.form
																							.id,
																				},
																			})
																		},
																	})
																}}
															/>
														}
													/>
												</div>
											)}
											<div className={style.waitingList}>
												{waitingListApiData.data.map((x) => {
													return (
														<div
															className={style.waitingListItem}
															key={x.customer.id}
														>
															<UserPicture
																picture={x?.customer?.picture}
																name={x?.customer?.full_name}
																size="38px"
															/>
															<div className={style.waitingListInfo}>
																<b>{x?.customer?.full_name}</b>
																<small>{x?.customer?.email}</small>
															</div>
															<ButtonGhost
																leftIcon="delete"
																onClick={() => {
																	waitingListApi.removeByQuery({
																		query: {
																			product: form.form.id,
																			customer: x.customer.id,
																		},
																		onSuccess: () => {
																			waitingListApi.getAll({
																				query: {
																					product:
																						form.form
																							.id,
																				},
																			})
																		},
																	})
																}}
															/>
														</div>
													)
												})}
											</div>
										</section>
									),
								},
							],
						]}
					/>
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
												id: form.form?.id,
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
				{form.form?.id && (
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

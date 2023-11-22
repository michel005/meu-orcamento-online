import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Bag } from '../../../components/Bag'
import { Button, ButtonGhost, ButtonWhite } from '../../../components/Button'
import { Error } from '../../../components/Error'
import { AddressDefinition } from '../../../definitions/AddressDefinition'
import { CustomerDefinition } from '../../../definitions/CustomerDefinition'
import { useFormLayout } from '../../../hooks/useFormLayout'
import { usePage } from '../../../hooks/usePage'
import { usePageData } from '../../../hooks/usePageData'
import { AddressType, CustomerType } from '../../../types/AllTypes'
import { ErrorUtils } from '../../../utils/ErrorUtils'
import { FileUtils } from '../../../utils/FileUtils'
import style from './CustomerForm.module.scss'
import { FormModal } from '../../../components/FormModal'

export const CustomerForm = () => {
	const page = usePage<CustomerType>('customer', CustomerDefinition)
	const { message, api, form } = page
	const customerFormLayout = useFormLayout<CustomerType>({
		definition: CustomerDefinition(form.form),
		value: form.form,
		onChange: form.edit,
	})
	const addressFormLayout = useFormLayout<AddressType>({
		definition: AddressDefinition(),
		value: form.form.address,
		onChange: (value) => {
			form.form.address = { ...value }
			form.edit(form.form)
		},
	})
	const [tab, setTab] = useState('general')
	const randomId = useMemo(() => Math.random(), [])
	const productPageData = usePageData('product')
	const navigate = useNavigate()

	const onSuccess = () => {
		form.close()
	}

	const onError = (errors: any) => {
		customerFormLayout.setErrors(ErrorUtils.convertErrors(errors.response.data.customer || {}))
		addressFormLayout.setErrors(ErrorUtils.convertErrors(errors.response.data.address || {}))
	}

	useEffect(() => {
		customerFormLayout.setDisableAll(!form.form.active)
		addressFormLayout.setDisableAll(!form.form.active)
	}, [form.form])

	return (
		<FormModal
			onClose={() => {
				form.close(false)
			}}
		>
			{!form.form.active && (
				<div className={style.error}>
					<Error message="Cliente inativo. Para realizar alterações, ative este cliente novamente." />
				</div>
			)}
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
						{customerFormLayout.getField('picture', {
							size: '300px',
						})}
					</div>
				</section>
				<section>
					<h1>Formulário de Cliente</h1>
					<div className={style.tabs}>
						<Button
							leftIcon="person"
							variationOverride={tab === 'general' ? 'primary' : 'ghost'}
							onClick={() => {
								setTab('general')
							}}
							rightBag={
								Object.keys(customerFormLayout.errors).length > 0
									? Object.keys(customerFormLayout.errors).length
									: undefined
							}
						>
							Dados Gerais
						</Button>
						<Button
							leftIcon="map"
							variationOverride={tab === 'address' ? 'primary' : 'ghost'}
							onClick={() => {
								setTab('address')
							}}
							rightBag={
								Object.keys(addressFormLayout.errors).length > 0
									? Object.keys(addressFormLayout.errors).length
									: undefined
							}
						>
							Endereço
						</Button>
					</div>
					{tab === 'general' && (
						<section>
							{customerFormLayout.getField('full_name')}
							{customerFormLayout.getField('email')}
							<div className={style.contentRow}>
								{customerFormLayout.getField('phone')}
								{customerFormLayout.getField('birthday')}
							</div>
							<div className={style.contentRow}>
								{customerFormLayout.getField('person_type')}
								{customerFormLayout.getField('document_type')}
							</div>
							{customerFormLayout.getField('document_number')}
							{customerFormLayout.getField('error')}
						</section>
					)}
					{tab === 'address' && (
						<section>
							<div className={style.contentRow}>
								{addressFormLayout.getField('zip_code')}
								{addressFormLayout.getField('street_name')}
							</div>
							<div className={style.contentRow}>
								{addressFormLayout.getField('street_number')}
								{addressFormLayout.getField('complement')}
							</div>
							<div className={style.contentRow}>
								{addressFormLayout.getField('city')}
								{addressFormLayout.getField('state')}
							</div>
							{addressFormLayout.getField('country')}
							{addressFormLayout.getField('error')}
						</section>
					)}
				</section>
			</div>
			<div className={style.options}>
				{!form.form.active ? (
					<Button
						leftIcon="person_check"
						onClick={() => {
							page.api.update({
								data: {
									customer: JSON.parse(
										JSON.stringify({
											...form.form,
											address: undefined,
											active: true,
										})
									),
									address: form.form.address,
								},
								onSuccess: (response) => {
									form.edit({
										...response.customer,
										address: response.address,
									})
								},
							})
						}}
					>
						Ativar
					</Button>
				) : (
					<>
						<Button
							leftIcon="save"
							disabled={!form.form.active}
							onClick={() => {
								if (form.form?.id) {
									api.update({
										data: {
											customer: JSON.parse(
												JSON.stringify({
													...form.form,
													address: undefined,
												})
											),
											address: form.form.address,
										},
										onSuccess,
										onError,
									})
								} else {
									api.create({
										data: {
											customer: JSON.parse(
												JSON.stringify({
													...form.form,
													address: undefined,
												})
											),
											address: form.form.address,
										},
										onSuccess,
										onError,
									})
								}
							}}
						>
							Salvar
						</Button>
					</>
				)}
				{form.form.id && (
					<ButtonWhite
						leftIcon="delete"
						onClick={() => {
							message.question(
								'Deseja realmente excluir este cliente?',
								'Esta operação não pode ser desfeita. Esta operação não exclui as informações de faturamento deste cliente.',
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
				<div className={style.adminInfo}>
					{form.form.created && (
						<span className={style.created}>
							Cadastrado dia {form.form.created.split(' ')[0]} as{' '}
							{form.form.created.split(' ')[1]}
						</span>
					)}
					{form.form.updated && (
						<span className={style.updated}>
							Ultima alteração no dia {form.form.updated.split(' ')[0]} as{' '}
							{form.form.updated.split(' ')[1]}
						</span>
					)}
				</div>
				<div style={{ flexGrow: 1 }} />
				{form.form?.id && (
					<ButtonGhost
						className={style.favoriteButton}
						leftIcon="favorite"
						data-favorite={form.form.favorite}
						onClick={() => {
							api.update({
								silently: true,
								data: {
									customer: JSON.parse(
										JSON.stringify({
											...form.form,
											address: undefined,
											favorite: !form.form?.favorite,
										})
									),
									address: form.form.address,
								},
								onSuccess: (response) => {
									form.edit({
										...response.customer,
										address: response.address,
									})
								},
							})
						}}
					/>
				)}
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
								{form.form.active && (
									<ButtonGhost
										leftIcon="person_cancel"
										onClick={() => {
											setShow(false)
											page.api.update({
												data: {
													customer: JSON.parse(
														JSON.stringify({
															...form.form,
															address: undefined,
															active: false,
														})
													),
													address: form.form.address,
												},
												onSuccess: (response) => {
													form.edit({
														...response.customer,
														address: response.address,
													})
												},
											})
										}}
									>
										Inativar
									</ButtonGhost>
								)}
								<ButtonGhost
									leftIcon="shopping_bag"
									onClick={() => {
										setShow(false)
										productPageData.setProp('seller_id', () => form.form.id)
										form.close()
										navigate('/products')
									}}
								>
									Produtos
								</ButtonGhost>
								<ButtonGhost
									leftIcon="copy_all"
									onClick={() => {
										setShow(false)
										form.show({
											...form.form,
											id: undefined,
											picture: undefined,
											favorite: undefined,
											active: true,
											address: {
												...form.form.address,
												id: undefined,
											},
										})
										message.message(
											'Duplicação de Cliente',
											'Lembre de modificar as informações principais do seu cliente. Caso o número do documento ou e-mail já esteja sendo utilizado por outro cliente, não será permitido salvar.'
										)
									}}
								>
									Duplicar
								</ButtonGhost>
								<ButtonGhost
									leftIcon="upload"
									onClick={() => {
										setShow(false)
										const content = JSON.stringify(
											{
												...form.form,
												_id: undefined,
												picture: undefined,
												favorite: undefined,
												created: undefined,
												updated: undefined,
												active: undefined,
												address_id: undefined,
												address: {
													...form.form.address,
													id: undefined,
												},
											},
											null,
											'  '
										)
										FileUtils.saveContent(
											content,
											`${form.form.full_name
												.toUpperCase()
												.replaceAll(' ', '_')}_EXPORTAR.json`
										)
									}}
								>
									Exportar
								</ButtonGhost>
								<hr />
								{form.form.address && (
									<ButtonGhost
										leftIcon="map"
										onClick={() => {
											setShow(false)
											window.open(
												`https://www.google.com/maps?q=${form.form.address.zip_code}+${form.form.address.street_name}+${form.form.address.street_number}+${form.form.address.city}+${form.form.address.state}`,
												'_blank'
											)
										}}
									>
										Google Maps
									</ButtonGhost>
								)}
								{form.form.email && (
									<ButtonGhost
										leftIcon="mail"
										onClick={() => {
											setShow(false)
											window.location.href = `mailto:${form.form.email}`
										}}
									>
										E-mail
									</ButtonGhost>
								)}
								{form.form.phone && (
									<ButtonGhost
										leftIcon="phone_enabled"
										onClick={() => {
											window.location.href = `https://wa.me/${form.form.phone
												.replaceAll('(', '')
												.replaceAll(')', '')
												.replaceAll('-', '')
												.replaceAll(' ', '')}`
											setShow(false)
										}}
									>
										Whatsapp
									</ButtonGhost>
								)}
							</>
						)}
					</Bag>
				)}
			</div>
		</FormModal>
	)
}

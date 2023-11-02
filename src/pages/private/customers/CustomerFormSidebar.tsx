import React, { useEffect, useState } from 'react'
import style from './CustomerFormSidebar.module.scss'
import { CustomerDefinition } from '../../../definitions/CustomerDefinition'
import { CustomerType } from '../../../types/AllTypes'
import { Button, ButtonGhost, ButtonWhite } from '../../../components/Button'
import { ErrorUtils } from '../../../utils/ErrorUtils'
import { Error } from '../../../components/Error'
import { StringUtils } from '../../../utils/StringUtils'
import { Bag } from '../../../components/Bag'
import { FileUtils } from '../../../utils/FileUtils'
import { usePage } from '../../../hooks/usePage'
import { usePageData } from '../../../hooks/usePageData'
import { useNavigate } from 'react-router-dom'

export const CustomerFormSidebar = () => {
	const page = usePage<CustomerType>('customer', CustomerDefinition)
	const productPageData = usePageData('product')
	const { message, api, form, pageData, formLayout } = page
	const [scrollPosition, setScrollPosition] = useState(0)
	const navigate = useNavigate()

	const onSuccess = () => {
		form.close()
	}

	const onError = (errors: any) => {
		formLayout.setErrors(ErrorUtils.convertErrors(errors.response.data))
	}

	useEffect(() => {
		formLayout.setDisableAll(!form.form.active)
	}, [form.form])

	return (
		<div
			className={style.customerFormSidebar}
			data-show={!!form.originalValue}
			data-scroll-position={scrollPosition > 214}
		>
			<div
				className={style.formContent}
				onScroll={(e) => {
					setScrollPosition((e.currentTarget as any).scrollTop)
				}}
			>
				<div className={style.userCard}>
					<div
						className={style.userImage}
						style={{ backgroundImage: `url(${form.form.picture})` }}
					>
						{formLayout.getField('picture')}
					</div>
				</div>
				<div className={style.userCardReduced}>
					{formLayout.getField('picture', {
						size: '48px',
						pictureName: form.form._id
							? StringUtils.initialLetters(form.form.name || 'NF').toUpperCase()
							: null,
					})}
					<h2>{form.form.name || 'Sem nome'}</h2>
				</div>
				{!form.form.active && (
					<div className={style.error}>
						<Error message="Cliente inativo. Para realizar alterações, ative este cliente novamente." />
					</div>
				)}
				<div className={style.content}>
					{formLayout.getField('name')}
					{formLayout.getField('email')}
					{formLayout.getField('phone')}
					{formLayout.getField('birthday')}
					{formLayout.getField('person_type')}
					{formLayout.getField('document_type')}
					{formLayout.getField('document_number')}
					{formLayout.getField('error')}
					<h3>Endereço</h3>
					{formLayout.getField('address').getField('zip_code')}
					{formLayout.getField('address').getField('street_name')}
					{formLayout.getField('address').getField('street_number')}
					{formLayout.getField('address').getField('complement')}
					{formLayout.getField('address').getField('city')}
					{formLayout.getField('address').getField('state')}
					{formLayout.getField('address').getField('country')}
					{formLayout.getField('address').getField('error')}
				</div>
			</div>
			<div className={style.options}>
				{!form.form.active ? (
					<Button
						leftIcon="person_check"
						onClick={() => {
							page.api.update({
								id: form.form._id,
								data: { ...form.form, active: true },
								onSuccess: (response) => {
									console.log({ response })
									form.edit(response)
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
								if (form.form?._id) {
									api.update({
										id: form.form?._id,
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
					</>
				)}
				{form.form?._id && (
					<>
						{form.form.active && (
							<ButtonWhite
								leftIcon="delete"
								onClick={() => {
									message.question(
										'Deseja realmente excluir este cliente?',
										'Esta operação não pode ser desfeita. Esta operação não exclui as informações de faturamento deste cliente.',
										() => {
											api.remove({
												id: form.form?._id,
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
						<Bag
							button={(show, setShow) => (
								<Button
									leftIcon="more_horiz"
									variationOverride={show ? 'primary' : 'white'}
									onClick={() => {
										setShow((x) => !x)
									}}
								/>
							)}
							arrowPosition="bottom"
						>
							{(show, setShow) => (
								<>
									{form.form.active && (
										<ButtonGhost
											leftIcon="person_cancel"
											onClick={() => {
												setShow(false)
												page.api.update({
													id: form.form._id,
													data: { ...form.form, active: false },
													onSuccess: (response) => {
														form.edit(response)
													},
												})
											}}
										>
											Inativar
										</ButtonGhost>
									)}
									{!form.form.favorite ? (
										<ButtonGhost
											leftIcon="heart_plus"
											onClick={() => {
												setShow(false)
												page.api.update({
													id: form.form._id,
													data: { ...form.form, favorite: true },
													onSuccess: (response) => {
														console.log({ response })
														form.edit(response)
													},
												})
											}}
										>
											Favoritar
										</ButtonGhost>
									) : (
										<ButtonGhost
											leftIcon="heart_minus"
											onClick={() => {
												setShow(false)
												page.api.update({
													id: form.form._id,
													data: { ...form.form, favorite: false },
													onSuccess: (response) => {
														console.log({ response })
														form.edit(response)
													},
												})
											}}
										>
											Desfavoritar
										</ButtonGhost>
									)}
									<ButtonGhost
										leftIcon="shopping_bag"
										onClick={() => {
											setShow(false)
											productPageData.setProp('customer', () => form.form._id)
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
												_id: undefined,
												picture: undefined,
												favorite: undefined,
												active: true,
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
												},
												null,
												'  '
											)
											FileUtils.saveContent(
												content,
												`${form.form.name
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
					</>
				)}
				<div style={{ flexGrow: 1 }} />
				<ButtonWhite
					leftIcon="close"
					onClick={() => {
						form.close()
					}}
				/>
			</div>
		</div>
	)
}

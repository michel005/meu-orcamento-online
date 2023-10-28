import React, { useContext, useState } from 'react'
import style from './CustomerFormSidebar.module.scss'
import { useFormLayout } from '../../../hooks/useFormLayout'
import { CustomerDefinition } from '../../../definitions/CustomerDefinition'
import { AddressType, CustomerType } from '../../../types/AllTypes'
import { Button, ButtonGhost, ButtonWhite } from '../../../components/Button'
import { useApi } from '../../../hooks/useApi'
import { ConfigContext } from '../../../contexts/ConfigContext'
import { useForm } from '../../../hooks/useForm'
import { ErrorUtils } from '../../../utils/ErrorUtils'
import { AddressDefinition } from '../../../definitions/AddressDefinition'
import { Error } from '../../../components/Error'
import { StringUtils } from '../../../utils/StringUtils'
import { Bag } from '../../../components/Bag'

export const CustomerFormSidebar = () => {
	const { setMessage, setLoading } = useContext(ConfigContext)
	const { create, update, remove } = useApi('customer')
	const { originalValue, form, edit, close } = useForm<CustomerType>('customer')
	const [scrollPosition, setScrollPosition] = useState(0)
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

	return (
		<div
			className={style.customerFormSidebar}
			data-show={!!originalValue}
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
						style={{ backgroundImage: `url(${form.picture})` }}
					>
						{getField('picture')}
					</div>
				</div>
				<div className={style.userCardReduced}>
					{getField('picture', {
						size: '48px',
						pictureName: form.id
							? StringUtils.initialLetters(form.name || 'NF').toUpperCase()
							: null,
					})}
					<h2>{form.name || 'Sem nome'}</h2>
				</div>
				{!form.active && (
					<div className={style.error}>
						<Error message="Cliente inativo. Para realizar alterações, ative este usuário novamente." />
					</div>
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
			</div>
			<div className={style.options}>
				{!form.active ? (
					<Button leftIcon="person_check">Ativar</Button>
				) : (
					<>
						<Button
							leftIcon="save"
							disabled={!form.active}
							onClick={() => {
								if (form?.id) {
									update({
										id: form?.id,
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
					</>
				)}
				{form?.id && (
					<>
						{form.active && (
							<ButtonWhite
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
									{form.active && (
										<ButtonGhost
											leftIcon="person_cancel"
											onClick={() => {
												setShow(false)
											}}
										>
											Inativar
										</ButtonGhost>
									)}
									{!form.favorite ? (
										<ButtonGhost
											leftIcon="heart_plus"
											onClick={() => {
												setShow(false)
											}}
										>
											Favoritar
										</ButtonGhost>
									) : (
										<ButtonGhost
											leftIcon="heart_minus"
											onClick={() => {
												setShow(false)
											}}
										>
											Desfavoritar
										</ButtonGhost>
									)}
									<ButtonGhost
										leftIcon="shopping_bag"
										onClick={() => {
											setShow(false)
										}}
									>
										Produtos
									</ButtonGhost>
									<ButtonGhost
										leftIcon="copy_all"
										onClick={() => {
											setShow(false)
										}}
									>
										Duplicar
									</ButtonGhost>
									<ButtonGhost
										leftIcon="upload"
										onClick={() => {
											setShow(false)
										}}
									>
										Exportar
									</ButtonGhost>
									<hr />
									{form.address && (
										<ButtonGhost
											leftIcon="map"
											onClick={() => {
												setShow(false)
												window.open(
													`https://www.google.com/maps?q=${form.address.zip_code}+${form.address.street_name}+${form.address.street_number}+${form.address.city}+${form.address.state}`,
													'_blank'
												)
											}}
										>
											Google Maps
										</ButtonGhost>
									)}
									{form.email && (
										<ButtonGhost
											leftIcon="mail"
											onClick={() => {
												setShow(false)
												window.location.href = `mailto:${form.email}`
											}}
										>
											E-mail
										</ButtonGhost>
									)}
									{form.phone && (
										<ButtonGhost
											leftIcon="phone_enabled"
											onClick={() => {
												window.location.href = `https://wa.me/${form.phone
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
						close(false)
					}}
				/>
			</div>
		</div>
	)
}

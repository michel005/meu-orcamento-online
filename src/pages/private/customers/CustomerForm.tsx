import React, { useEffect, useState } from 'react'
import { Button, ButtonGhost, ButtonSecondary, ButtonWhite } from '../../../components/Button'
import { Error } from '../../../components/Error'
import { AddressDefinition } from '../../../definitions/AddressDefinition'
import { CustomerDefinition } from '../../../definitions/CustomerDefinition'
import { useFormLayout } from '../../../hooks/useFormLayout'
import { usePage } from '../../../hooks/usePage'
import { AddressType, CustomerType } from '../../../types/AllTypes'
import { ErrorUtils } from '../../../utils/ErrorUtils'
import style from './CustomerForm.module.scss'
import { FormModal } from '../../../components/FormModal'
import { Tabs } from '../../../components/Tabs'
import { CustomerBag } from './CustomerBag'
import { Bag } from '../../../components/Bag'
import { FlexRow } from '../../../components/FlexRow'

export const CustomerForm = () => {
	const { api, form } = usePage<CustomerType>('customer', CustomerDefinition)
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

	const onSuccess = (response: any) => {
		form.close()
	}

	const onError = (errors: any) => {
		customerFormLayout.setErrors(ErrorUtils.convertErrors(errors.response?.data || {}))
		addressFormLayout.setErrors(ErrorUtils.convertErrors(errors.response?.data?.address || {}))
	}

	useEffect(() => {
		customerFormLayout.setDisableAll(!form.form.active)
		addressFormLayout.setDisableAll(!form.form.active)
	}, [form.form])

	return (
		<FormModal
			title="Formulário de Cliente"
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
				{customerFormLayout.getField('picture')}
				<section>
					<Tabs
						value={tab}
						onChange={setTab}
						options={[
							[
								'general',
								{
									buttonText: 'Dados Gerais',
									icon: 'person',
									bag:
										Object.keys(customerFormLayout.errors).length > 0
											? Object.keys(customerFormLayout.errors).length
											: undefined,
									content: (
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
									),
								},
							],
							[
								'address',
								{
									buttonText: 'Endereço',
									icon: 'map',
									bag:
										Object.keys(addressFormLayout.errors).length > 0
											? Object.keys(addressFormLayout.errors).length
											: undefined,
									content: (
										<section>
											<div className={style.contentRow}>
												{addressFormLayout.getField('zip_code')}
												{addressFormLayout.getField('street_name')}
											</div>
											<div className={style.contentRow}>
												{addressFormLayout.getField('street_number')}
												{addressFormLayout.getField('complement')}
											</div>
											{addressFormLayout.getField('neighborhood')}
											<div className={style.contentRow}>
												{addressFormLayout.getField('city')}
												{addressFormLayout.getField('state')}
											</div>
											{addressFormLayout.getField('country')}
											{addressFormLayout.getField('error')}
										</section>
									),
								},
							],
						]}
					/>
				</section>
			</div>
			<div className={style.options}>
				{!form.form.active ? (
					<Button
						leftIcon="person_check"
						onClick={() => {
							api.updateProperty({
								id: form.form._id,
								silently: true,
								propName: 'active',
								propValue: true,
								onSuccess: (response) => {
									form.edit(response)
									form.callClose()
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
					<ButtonGhost
						className={style.favoriteButton}
						leftIcon="favorite"
						data-favorite={form.form.favorite}
						onClick={() => {
							api.updateProperty({
								id: form.form._id,
								silently: true,
								propName: 'favorite',
								propValue: !form.form?.favorite,
								onSuccess: (response) => {
									form.edit(response)
									form.callClose()
								},
							})
						}}
					/>
				)}
				{form.form?._id && (
					<CustomerBag
						customer={form.form}
						arrowPosition="bottom-right"
						onSuccess={(response) => {
							form.edit(response)
							form.callClose()
						}}
					/>
				)}
			</div>
		</FormModal>
	)
}

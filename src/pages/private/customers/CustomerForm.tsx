import React, { useEffect, useMemo, useState } from 'react'
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
	const randomId = useMemo(() => Math.random(), [])

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
							api.update({
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
					<CustomerBag
						customer={form.form}
						arrowPosition="bottom-right"
						onSuccess={(response) => {
							form.edit({
								...response.customer,
								address: response.address,
							})
						}}
					/>
				)}
			</div>
		</FormModal>
	)
}

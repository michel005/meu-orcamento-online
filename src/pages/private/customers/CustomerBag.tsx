import { CustomerType } from '../../../types/AllTypes'
import { ButtonGhost } from '../../../components/Button'
import { Bag } from '../../../components/Bag'
import React from 'react'
import { usePageData } from '../../../hooks/usePageData'
import { useNavigate } from 'react-router-dom'
import { FileUtils } from '../../../utils/FileUtils'
import { useApi } from '../../../hooks/useApi'
import { useForm } from '../../../hooks/useForm'
import { useMessage } from '../../../hooks/useMessage'

export const CustomerBag = ({
	customer,
	onSuccess,
	arrowPosition,
}: {
	customer: CustomerType
	onSuccess?: (response: any) => void
	arrowPosition?: 'top' | 'top-left' | 'top-right' | 'bottom' | 'bottom-left' | 'bottom-right'
}) => {
	const api = useApi('customer')
	const form = useForm<CustomerType>('customer')
	const message = useMessage()
	const { setProp } = usePageData('product')
	const navigate = useNavigate()

	return (
		<Bag
			button={(show, setShow) => (
				<ButtonGhost
					leftIcon="more_horiz"
					onClick={() => {
						setShow((x) => !x)
					}}
				/>
			)}
			arrowPosition={arrowPosition}
		>
			{(show, setShow) => {
				return (
					<>
						{customer.active && (
							<ButtonGhost
								leftIcon="person_cancel"
								onClick={() => {
									setShow(false)
									api.update({
										data: {
											customer: JSON.parse(
												JSON.stringify({
													...customer,
													address: undefined,
													active: false,
												})
											),
											address: customer.address,
										},
										onSuccess: onSuccess,
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
								setProp('seller_id', () => customer.id)
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
									...customer,
									id: undefined,
									picture: undefined,
									favorite: undefined,
									active: true,
									address: {
										...customer.address,
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
										...customer,
										_id: undefined,
										picture: undefined,
										favorite: undefined,
										created: undefined,
										updated: undefined,
										active: undefined,
										address_id: undefined,
										address: {
											...customer.address,
											id: undefined,
										},
									},
									null,
									'  '
								)
								FileUtils.saveContent(
									content,
									`${customer.full_name
										.toUpperCase()
										.replaceAll(' ', '_')}_EXPORTAR.json`
								)
							}}
						>
							Exportar
						</ButtonGhost>
						<hr />
						{customer.address &&
							customer.address?.city &&
							customer.address?.state &&
							customer.address?.country && (
								<ButtonGhost
									leftIcon="map"
									onClick={() => {
										setShow(false)
										window.open(
											`https://www.google.com/maps?q=${customer.address.zip_code}+${customer.address.street_name}+${customer.address.street_number}+${customer.address.city}+${customer.address.state}`,
											'_blank'
										)
									}}
								>
									Google Maps
								</ButtonGhost>
							)}
						<ButtonGhost
							leftIcon="mail"
							onClick={() => {
								setShow(false)
								window.open(`mailto:${customer.email}`)
							}}
						>
							E-mail
						</ButtonGhost>
						{customer.phone && (
							<ButtonGhost
								leftIcon="phone_enabled"
								onClick={() => {
									setShow(false)
									window.open(
										`https://wa.me/${customer.phone
											.replaceAll('(', '')
											.replaceAll(')', '')
											.replaceAll('-', '')
											.replaceAll(' ', '')}`,
										'_blank'
									)
								}}
							>
								Whatsapp
							</ButtonGhost>
						)}
					</>
				)
			}}
		</Bag>
	)
}

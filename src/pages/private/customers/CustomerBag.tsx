import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Bag } from '../../../components/Bag'
import { ButtonGhost } from '../../../components/Button'
import { useApi } from '../../../hooks/useApi'
import { useForm } from '../../../hooks/useForm'
import { usePageData } from '../../../hooks/usePageData'
import { CustomerType } from '../../../types/AllTypes'
import { FileUtils } from '../../../utils/FileUtils'

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
	const { setProp } = usePageData('product')
	const navigate = useNavigate()

	return (
		<Bag
			button={(_, setShow) => (
				<ButtonGhost
					leftIcon="more_horiz"
					onClick={() => {
						setShow((x) => !x)
					}}
				/>
			)}
			arrowPosition={arrowPosition}
		>
			{(_, setShow) => {
				return (
					<>
						{customer.active && (
							<ButtonGhost
								leftIcon="person_cancel"
								onClick={() => {
									setShow(false)
									api.update({
										id: customer._id,
										data: {
											...customer,
											active: !customer.active,
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
								setProp('seller_id', () => customer._id)
								navigate('/products')
							}}
						>
							Produtos
						</ButtonGhost>
						<ButtonGhost
							leftIcon="copy_all"
							onClick={() => {
								setShow(false)
								form.show(
									{
										...customer,
										_id: undefined,
										picture: undefined,
										favorite: undefined,
										active: true,
									},
									() => onSuccess?.(null)
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

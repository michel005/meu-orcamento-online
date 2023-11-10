import React from 'react'
import style from './CustomerCard.module.scss'
import { UserPicture } from '../../../components/UserPicture'
import { useForm } from '../../../hooks/useForm'
import { CustomerType } from '../../../types/AllTypes'
import { Button, ButtonGhost } from '../../../components/Button'
import { Bag } from '../../../components/Bag'
import { usePageData } from '../../../hooks/usePageData'
import { useNavigate } from 'react-router-dom'
import { useApi } from '../../../hooks/useApi'
import { StringUtils } from '../../../utils/StringUtils'
import { DateUtils } from '../../../utils/DateUtils'

export const CustomerCard = ({ customer, onClose }) => {
	const { show } = useForm<CustomerType>('customer')
	const { update } = useApi('customer')
	const { setProp } = usePageData('product')
	const navigate = useNavigate()

	return (
		<div
			className={style.customerCard}
			data-person-type={customer.person_type}
			data-inactive={!customer.active}
		>
			<div className={style.customerPicture}>
				<UserPicture
					className={style.userPicture}
					picture={customer.picture}
					name={customer.full_name}
					size="170px"
					randomId={Math.random()}
				/>
				{!customer.active && <div className={style.inactive}>INATIVO</div>}
				<div className={style.favorite}>
					<ButtonGhost
						className={style.favoriteButton}
						leftIcon="favorite"
						data-favorite={customer.favorite}
						onClick={() => {
							update({
								data: {
									customer: JSON.parse(
										JSON.stringify({
											...customer,
											address: undefined,
											favorite: !customer?.favorite,
										})
									),
									address: customer.address,
								},
								onSuccess: (response) => {
									onClose?.()
								},
							})
						}}
					/>
				</div>
				<div className={style.buttons}>
					<Bag
						button={(show, setShow) => (
							<ButtonGhost
								leftIcon="more_horiz"
								variationOverride={show ? 'primary' : 'ghost'}
								onClick={() => {
									setShow((x) => !x)
								}}
							/>
						)}
						arrowPosition="top-left"
					>
						{(show, setShow) => {
							return (
								<>
									<ButtonGhost
										leftIcon="shopping_bag"
										onClick={() => {
											setShow(false)
											setProp('customer', () => customer.id)
											navigate('/products')
										}}
									>
										Produtos
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
				</div>
			</div>
			<div className={style.customerInfo}>
				<h3 title={customer.full_name}>
					{StringUtils.firstAndLastName(customer.full_name)}
				</h3>
				<small>{customer.email}</small>
				{(customer.address || customer.birthday) && (
					<div className={style.address}>
						{customer.address?.city && <span>{customer.address?.city}</span>}
						{customer.address?.state && <span>{customer.address?.state}</span>}
						{customer.address?.country && <span>{customer.address?.country}</span>}
						{customer.birthday && (
							<span>
								{Math.round(
									DateUtils.daysBetween(
										DateUtils.dateToString(new Date()),
										customer.birthday
									) / 365
								)}{' '}
								anos
							</span>
						)}
					</div>
				)}
			</div>
			<hr />
			<Button
				className={style.showDetailsButton}
				onClick={() => {
					show(customer, onClose)
				}}
			>
				Mostrar Detalhes
			</Button>
		</div>
	)
}

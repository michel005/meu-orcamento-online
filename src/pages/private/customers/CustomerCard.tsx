import React, { useContext } from 'react'
import style from './CustomerCard.module.scss'
import { UserPicture } from '../../../components/UserPicture'
import { useForm } from '../../../hooks/useForm'
import { CustomerType } from '../../../types/AllTypes'
import { Button, ButtonGhost, ButtonWhite } from '../../../components/Button'
import { Bag } from '../../../components/Bag'
import { ConfigContext } from '../../../contexts/ConfigContext'
import { useApi } from '../../../hooks/useApi'

export const CustomerCard = ({ customer, onClose }) => {
	const { setMessage, setLoading } = useContext(ConfigContext)
	const { show } = useForm<CustomerType>('customer')
	const { remove } = useApi('customer')

	const onSuccess = () => {
		onClose()
	}

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
					name={customer.name}
					size="170px"
				/>
				{!customer.active && <div className={style.inactive}>INATIVO</div>}
				<div className={style.favorite}>
					<ButtonGhost
						className={style.favoriteButton}
						leftIcon="favorite"
						data-favorite={customer.favorite}
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
						{(show, setShow) => (
							<>
								<ButtonGhost
									leftIcon="shopping_bag"
									onClick={() => {
										setShow(false)
									}}
								>
									Produtos
								</ButtonGhost>
								<hr />
								{customer.address && (
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
								{customer.email && (
									<ButtonGhost
										leftIcon="mail"
										onClick={() => {
											setShow(false)
											window.open(`mailto:${customer.email}`)
										}}
									>
										E-mail
									</ButtonGhost>
								)}
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
						)}
					</Bag>
				</div>
			</div>
			<div className={style.customerInfo}>
				<h3 title={customer.name}>{customer.name}</h3>
				<small>{customer.email}</small>
				{customer.address && (
					<div className={style.address}>
						{customer.address?.city && <span>{customer.address?.city}</span>}
						{customer.address?.state && <span>{customer.address?.state}</span>}
						{customer.address?.country && <span>{customer.address?.country}</span>}
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

import React from 'react'
import style from './CustomerCard.module.scss'
import { useForm } from '../../../hooks/useForm'
import { CustomerType } from '../../../types/AllTypes'
import { Button, ButtonGhost } from '../../../components/Button'
import { useApi } from '../../../hooks/useApi'
import { StringUtils } from '../../../utils/StringUtils'
import { DateUtils } from '../../../utils/DateUtils'
import { CustomerBag } from './CustomerBag'
import { PictureField } from '../../../components/inputs/PictureField'

export const CustomerCard = ({ customer, onClose }) => {
	const { show } = useForm<CustomerType>('customer')
	const { updateProperty } = useApi('customer')

	return (
		<div className={style.customerCard} data-inactive={!customer.active}>
			<div className={style.userBackground}>
				<div className={style.buttons}>
					<CustomerBag
						customer={customer}
						arrowPosition="top-left"
						cardMode={true}
						onSuccess={() => {
							onClose()
						}}
					/>
				</div>
				<PictureField
					key={customer._id}
					field="picture"
					value={customer}
					disabled={true}
					name={customer.full_name}
					size="170px"
				/>
				<div className={style.favorite}>
					<ButtonGhost
						className={style.favoriteButton}
						leftIcon="favorite"
						data-favorite={customer.favorite}
						onClick={() => {
							updateProperty({
								id: customer._id,
								silently: true,
								propName: 'favorite',
								propValue: !customer?.favorite,
								onSuccess: () => {
									onClose?.()
								},
							})
						}}
					/>
				</div>
				{!customer.active && <div className={style.inactive}>INATIVO</div>}
			</div>
			<div className={style.customerInfo}>
				<h3 title={customer.full_name}>
					{StringUtils.firstAndLastName(customer.full_name)}
				</h3>
				<small>{customer.email}</small>
				{(customer.address || customer.birthday) && (
					<div className={style.address}>
						{customer.person_type && <span>{customer.person_type}</span>}
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

import React from 'react'
import style from './CustomerCard.module.scss'
import { UserPicture } from '../../../components/UserPicture'
import { useForm } from '../../../hooks/useForm'
import { CustomerType } from '../../../types/AllTypes'

export const CustomerCard = ({ customer, onClose }) => {
	const { show } = useForm<CustomerType>('customer')

	return (
		<div className={style.customerCard} data-person-type={customer.person_type}>
			<div
				className={style.customerPicture}
				style={{ backgroundImage: `url(${customer.picture})` }}
			>
				<UserPicture picture={customer.picture} name={customer.name} size="170px" />
				<span>{customer.person_type === 'PF' ? 'Física' : 'Jurídica'}</span>
			</div>
			<div className={style.customerInfo}>
				<a
					onClick={() => {
						show(customer, onClose)
					}}
				>
					<h3>{customer.name}</h3>
				</a>
				<p>{customer.email}</p>
				<p>{customer.phone}</p>
			</div>
		</div>
	)
}

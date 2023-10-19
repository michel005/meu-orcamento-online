import React, { useContext, useState } from 'react'
import style from './CustomerCard.module.scss'
import { UserPicture } from '../../../components/UserPicture'
import { useForm } from '../../../hooks/useForm'
import { CustomerType } from '../../../types/AllTypes'
import { ButtonGhost, ButtonWhite } from '../../../components/Button'
import { ConfigContext } from '../../../contexts/ConfigContext'
import { useApi } from '../../../hooks/useApi'

export const CustomerCard = ({ customer, onClose }) => {
	const { setMessage, setLoading } = useContext(ConfigContext)
	const { remove } = useApi('customer')
	const { show } = useForm<CustomerType>('customer')
	const [showMoreOptions, setShowMoreOptions] = useState(false)

	return (
		<div
			className={style.customerCard}
			data-person-type={customer.person_type}
			onMouseLeave={() => {
				setShowMoreOptions(false)
			}}
		>
			<div
				className={style.customerPicture}
				style={{ backgroundImage: `url(${customer.picture})` }}
			>
				<UserPicture picture={customer.picture} name={customer.name} size="170px" />
				<span>{customer.person_type === 'PF' ? 'Física' : 'Jurídica'}</span>
				<div className={style.buttons} data-show-more-options={showMoreOptions}>
					<ButtonGhost
						leftIcon="more_horiz"
						onClick={() => {
							setShowMoreOptions((x) => !x)
						}}
					/>
					{showMoreOptions && (
						<div className={style.moreOptions}>
							<ButtonWhite
								leftIcon="delete"
								onClick={() => {
									setShowMoreOptions(false)
									setMessage({
										header: 'Deseja realmente excluir este cliente?',
										content: 'Esta operação não pode ser desfaita.',
										type: 'question',
										confirm: () => {
											setLoading(true)
											remove({
												id: customer._id,
												onSuccess: () => {
													onClose?.()
												},
											})
										},
									})
								}}
							/>
						</div>
					)}
				</div>
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

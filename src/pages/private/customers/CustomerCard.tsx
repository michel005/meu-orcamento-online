import React, { useContext, useRef, useState } from 'react'
import style from './CustomerCard.module.scss'
import { UserPicture } from '../../../components/UserPicture'
import { useForm } from '../../../hooks/useForm'
import { CustomerType } from '../../../types/AllTypes'
import { Button, ButtonGhost } from '../../../components/Button'
import { ConfigContext } from '../../../contexts/ConfigContext'
import { useApi } from '../../../hooks/useApi'

export const CustomerCard = ({ customer, onClose }) => {
	const { setMessage, setLoading } = useContext(ConfigContext)
	const { remove } = useApi('customer')
	const { show, form } = useForm<CustomerType>('customer')
	const [showMoreOptions, setShowMoreOptions] = useState(false)

	return (
		<div
			className={style.customerCard}
			data-person-type={customer.person_type}
			data-inactive={!customer.active}
			onMouseLeave={() => {
				setShowMoreOptions(false)
			}}
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
				<div className={style.buttons} data-show-more-options={showMoreOptions}>
					<ButtonGhost
						leftIcon="more_horiz"
						onClick={() => {
							setShowMoreOptions((x) => !x)
						}}
					/>
					{showMoreOptions && (
						<div className={style.moreOptions}>
							<ButtonGhost leftIcon="favorite">Favoritar</ButtonGhost>
							<ButtonGhost leftIcon="person_cancel">Inativar</ButtonGhost>
							<ButtonGhost leftIcon="shopping_bag">Produtos</ButtonGhost>
							<ButtonGhost
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
							>
								Excluir
							</ButtonGhost>
						</div>
					)}
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

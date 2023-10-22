import React, { useContext, useEffect, useState } from 'react'
import style from './ProductCard.module.scss'
import { UserPicture } from '../../../components/UserPicture'
import { useForm } from '../../../hooks/useForm'
import { ProductType } from '../../../types/AllTypes'
import { ButtonGhost, ButtonWhite } from '../../../components/Button'
import { ConfigContext } from '../../../contexts/ConfigContext'
import { useApi } from '../../../hooks/useApi'
import { NumberUtils } from '../../../utils/NumberUtils'

export const ProductCard = ({ product, onClose }) => {
	const { setMessage, setLoading } = useContext(ConfigContext)
	const { getById } = useApi('customer')
	const { remove } = useApi('product')
	const { show } = useForm<ProductType>('product')
	const [showMoreOptions, setShowMoreOptions] = useState(false)
	const [customer, setCustomer] = useState(null)

	useEffect(() => {
		if (!customer && product?.customer_id) {
			getById({
				id: product?.customer_id,
				onSuccess: (x) => {
					setCustomer(x.data)
				},
			})
		}
	}, [customer, product?.customer_id])

	return (
		<div
			className={style.productCard}
			onMouseLeave={() => {
				setShowMoreOptions(false)
			}}
		>
			<div
				className={style.productPicture}
				style={{ backgroundImage: `url(${product.picture})` }}
			/>
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
									header: 'Deseja realmente excluir este produto?',
									content: 'Esta operação não pode ser desfaita.',
									type: 'question',
									confirm: () => {
										setLoading(true)
										remove({
											id: product._id,
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
			<div className={style.productInfo}>
				<a
					onClick={() => {
						show(product, onClose)
					}}
				>
					<h3>{product.name}</h3>
				</a>
				<p>{product.description}</p>

				{product.categories && (
					<div className={style.categories}>
						{product.categories.split(';').map((category: string) => {
							return <span key={category}>{category}</span>
						})}
					</div>
				)}
				<div className={style.footer}>
					{customer && (
						<UserPicture
							className={style.footerPicture}
							size="48px"
							picture={customer.picture}
							name={customer.name}
						/>
					)}
					<div style={{ flexGrow: 1 }} />
					<h2>
						<span>R$</span>
						{NumberUtils.numberToCurrency(product.price).replace('R$', '')}
					</h2>
				</div>
			</div>
		</div>
	)
}

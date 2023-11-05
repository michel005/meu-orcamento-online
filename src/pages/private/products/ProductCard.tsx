import React from 'react'
import style from './ProductCard.module.scss'
import { UserPicture } from '../../../components/UserPicture'
import { useForm } from '../../../hooks/useForm'
import { ProductType } from '../../../types/AllTypes'
import { Button } from '../../../components/Button'
import { NumberUtils } from '../../../utils/NumberUtils'

export const ProductCard = ({ product, onClose, selected = false, onSelect = (x) => {} }) => {
	const { show } = useForm<ProductType>('product')

	return (
		<div className={style.productCard} data-selected={!!selected}>
			<div className={style.productPicture}>
				<UserPicture
					className={style.userPicture}
					picture={product.picture}
					name={product.name}
					size="170px"
					type="square"
				/>
				<div className={style.selectCard}>
					<input
						type="checkbox"
						checked={selected}
						onChange={(event) => {
							onSelect(event.target.checked)
						}}
					/>
				</div>
			</div>
			<div className={style.productInfo}>
				<h3 title={product.name}>{product.name}</h3>
				<small>{product.description}</small>
				<div className={style.customerAndPrice}>
					{product.customer ? (
						<UserPicture
							size="36px"
							picture={product?.customer?.picture}
							name={product?.customer?.full_name}
						/>
					) : (
						<div style={{ flexGrow: 1 }} />
					)}
					<h2 className={style.price}>{NumberUtils.numberToCurrency(product.price)}</h2>
				</div>
			</div>
			<hr />
			<Button
				className={style.showDetailsButton}
				onClick={() => {
					show(product, onClose)
				}}
			>
				Mostrar Detalhes
			</Button>
		</div>
	)
}

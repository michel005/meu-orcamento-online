import React from 'react'
import style from './ProductCard.module.scss'
import { UserPicture } from '../../../components/UserPicture'
import { useForm } from '../../../hooks/useForm'
import { ProductType } from '../../../types/AllTypes'
import { NumberUtils } from '../../../utils/NumberUtils'
import { ProductStatus } from '../../../constants/ProductStatus'

export const ProductCard = ({ product, onClose }: { product: ProductType; onClose: any }) => {
	const { show } = useForm<ProductType>('product')

	const priceValue = NumberUtils.numberToCurrency(product.price).replace('R$', '').trim()

	return (
		<div className={style.productCard} data-status={product.status}>
			<div
				className={style.productPicture}
				style={{ backgroundImage: `url(${product.picture})` }}
			>
				{!product.picture && (
					<UserPicture
						className={style.picture}
						picture={product.picture}
						name={product.title}
						size="64px"
						type="square"
						randomId={Math.random()}
					/>
				)}
			</div>
			<section style={{ flexGrow: 1 }}>
				<header>
					<div className={style.status}>{ProductStatus[product.status]}</div>
					<a
						onClick={() => {
							show(product, onClose)
						}}
					>
						<b>{product.title}</b>
					</a>
					{product.description && <p>{product.description}</p>}
				</header>
			</section>
			<section className={style.price}>
				<small>R$</small>
				{priceValue.split(',')[0]}
				<span>{priceValue.split(',')[1]}</span>
			</section>
		</div>
	)
}

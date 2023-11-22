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
			<div className={style.productPicture}>
				<UserPicture
					className={style.picture}
					picture={product.picture}
					name={product.title}
					size="170px"
					type="square"
					randomId={Math.random()}
				/>
			</div>
			<div className={style.status}>
				{ProductStatus[product.status]} <div className={style.code}>{product.code}</div>
			</div>
			<div className={style.productInfo}>
				<a
					onClick={() => {
						show(product, onClose)
					}}
				>
					<h3 title={product.title}>{product.title}</h3>
				</a>
				<small>{product.description}</small>
				<div className={style.persons}>
					<div className={style.seller}>
						<UserPicture
							picture={product.customer.picture}
							name={`Vendedor: ${product.customer.full_name}`}
							size="36px"
							randomId={Math.random()}
						/>
					</div>
					<div className={style.waitingList}>
						{(product.product_waiting_list || []).map((x) => {
							return (
								<UserPicture
									picture={x.customer.picture}
									name={x.customer.full_name}
									size="36px"
									randomId={Math.random()}
								/>
							)
						})}
					</div>
				</div>
				<hr />
				<h1 className={style.price}>
					<small>R$</small>
					{priceValue.split(',')[0]}
					<span>{priceValue.split(',')[1]}</span>
				</h1>
			</div>
		</div>
	)
}

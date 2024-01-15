import React, { useState } from 'react'
import style from './ProductCard.module.scss'
import { UserPicture } from '../../../components/UserPicture'
import { useForm } from '../../../hooks/useForm'
import { ProductType } from '../../../types/AllTypes'
import { NumberUtils } from '../../../utils/NumberUtils'
import { ProductStatus } from '../../../constants/ProductStatus'
import { PictureField } from '../../../components/inputs/PictureField'
import { Button } from '../../../components/Button'

export const ProductCard = ({ product, onClose }: { product: ProductType; onClose: any }) => {
	const { show } = useForm<ProductType>('product')

	const priceValue = NumberUtils.numberToCurrency(product.price).replace('R$', '').trim()

	return (
		<div className={style.productCard} data-status={product.status}>
			<div className={style.productPicture}>
				<PictureField
					field="picture"
					disabled={true}
					value={product}
					name={product.title}
					size="170px"
				/>
				<div className={style.status}>{ProductStatus[product.status]}</div>
			</div>
			<section style={{ flexGrow: 1 }}>
				<header>
					<h1>{product.title}</h1>
					{product.description && <p>{product.description}</p>}
				</header>
			</section>
			<section className={style.price}>
				<small>R$</small>
				{priceValue.split(',')[0]}
				<span>{priceValue.split(',')[1]}</span>
			</section>
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

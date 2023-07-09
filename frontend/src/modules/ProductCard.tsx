import style from './ProductCard.module.scss'
import { Image } from '../components/Image'
import { Button } from '../components/Button'
import { Label } from '../components/Label'
import { NumberUtils } from '../utils/NumberUtils'
import React, { useContext } from 'react'
import { ProductType } from '../types/ProductType'
import { ModalContext } from '../context/ModalContext'

export type ProductCardType = {
	row: ProductType
	selectedPrice?: number
	withoutPrices?: boolean
}

export const ProductCard = ({ row, selectedPrice, withoutPrices }: ProductCardType) => {
	const { show } = useContext(ModalContext)

	return (
		<div className={style.productCard}>
			{row.picture && <Image {...row.picture} />}
			<div className={style.details}>
				<Button
					variation="link"
					onClick={() => {
						show('product', structuredClone(row))
					}}
				>
					<h3>{row.name}</h3>
				</Button>
				{(row.group || row.subGroup) && (
					<div className={style.labels}>
						{row.group && <Label variation="purple">{row.group}</Label>}
						{row.subGroup && <Label>{row.subGroup}</Label>}
					</div>
				)}
				<p>{row.description}</p>
				{!withoutPrices && (
					<div className={style.allPrices}>
						{(row.prices || [])
							.filter(
								(_, index) => selectedPrice === undefined || index === selectedPrice
							)
							.map((price, priceKey) => {
								if (selectedPrice !== undefined) {
									return (
										<Button
											key={priceKey}
											className={style.priceRow}
											disabled={true}
										>
											<p>{price.condition}</p>
											<b>{NumberUtils.numberToCurrency(price.value || 0)}</b>
										</Button>
									)
								}
								return (
									<Button
										className={style.priceRow}
										key={priceKey}
										onClick={() => {
											show('productAddCart', {
												product: row,
												selectedPrice: priceKey,
												amount: 1,
												toGo: false,
											})
										}}
									>
										<p>{price.condition}</p>
										<b>{NumberUtils.numberToCurrency(price.value || 0)}</b>
									</Button>
								)
							})}
					</div>
				)}
			</div>
		</div>
	)
}

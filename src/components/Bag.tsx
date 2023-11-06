import React, { useState } from 'react'
import style from './Bag.module.scss'
import { Button } from './Button'

export const Bag = ({
	button,
	children,
	arrowPosition = 'top',
}: {
	button?: (show: boolean, setShow: any) => any
	children: any
	arrowPosition?: 'top' | 'top-left' | 'top-right' | 'bottom' | 'bottom-left' | 'bottom-right'
}) => {
	const [show, setShow] = useState(false)

	return (
		<>
			<div className={style.bag} data-arrow-position={arrowPosition}>
				{show && (
					<div
						className={style.background}
						onClick={() => {
							setShow(false)
						}}
					/>
				)}
				{show && (
					<div className={style.floatingBag} data-context="bag">
						{typeof children === 'function' ? children(show, setShow) : children}
					</div>
				)}
				{button ? (
					button?.(show, setShow)
				) : (
					<Button
						leftIcon="filter"
						variationOverride={show ? 'primary' : 'white'}
						onClick={() => {
							setShow((x) => !x)
						}}
					/>
				)}
			</div>
		</>
	)
}

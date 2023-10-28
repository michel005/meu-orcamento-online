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
	arrowPosition?: 'top' | 'bottom'
}) => {
	const [show, setShow] = useState(false)

	return (
		<div className={style.bag} data-arrow-position={arrowPosition}>
			{show && (
				<div
					className={style.background}
					onClick={() => {
						setShow(false)
					}}
				/>
			)}
			{show && <div className={style.floatingBag}>{children}</div>}
			{button?.(show, setShow) || (
				<Button
					leftIcon="filter"
					variationOverride={show ? 'primary' : 'white'}
					onClick={() => {
						setShow((x) => !x)
					}}
				/>
			)}
		</div>
	)
}

import style from './StickyButtonGroup.module.scss'
import React, { useState } from 'react'
import { StickyButtonGroupType } from './StickyButtonGroup.type'
import { Button } from './Button'

export const StickyButtonGroup = ({ children }: StickyButtonGroupType) => {
	const [show, setShow] = useState<boolean>(true)

	return (
		<div className={style.stickyButtonGroup}>
			<Button
				leftIcon={show ? 'navigate_next' : 'navigate_before'}
				onClick={() => {
					setShow((x) => !x)
				}}
			/>
			{show && children}
		</div>
	)
}

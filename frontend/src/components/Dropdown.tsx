import React, { useState } from 'react'
import { Button, ButtonType } from './Button'
import style from './Dropdown.module.scss'
import { InputType } from './Input'

export type DropdownType = ButtonType & {
	list: ButtonType[]
}

export const Dropdown = ({ list = [], ...props }: DropdownType) => {
	const [showList, setShowList] = useState(false)

	return (
		<div className={style.dropdown} data-show={showList}>
			<Button
				{...props}
				onClick={() => {
					setShowList((x) => !x)
				}}
				rightIcon="expand_less"
			/>
			<div className={style.list}>
				{list.map((item, itemKey) => {
					return (
						<Button
							key={itemKey}
							{...item}
							onClick={(e) => {
								item?.onClick?.(e)
								setShowList(false)
							}}
						/>
					)
				})}
			</div>
		</div>
	)
}

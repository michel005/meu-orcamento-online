import React, { useState } from 'react'
import { Button, ButtonType } from './Button'
import style from './ButtonGroup.module.scss'

export type ButtonGroupItem = {
	id: string | number
	label?: string
	icon?: string
	value: any
}

export type ButtonGroupType = {
	list: ButtonGroupItem[]
	value?: any | null
	variation?: 'primary' | 'secondary'
	onChange: (value: ButtonGroupItem) => void
}

export const ButtonGroup = ({
	list,
	value,
	variation = 'primary',
	onChange = () => null,
}: ButtonGroupType) => {
	const [val, setVal] = useState<ButtonGroupItem | null>(
		list.find((x) => x.id === value.id) || null
	)

	return (
		<div className={style.buttonGroup}>
			{list.map((item) => {
				return (
					<Button
						key={item.id}
						variation={variation}
						data-selected={val?.id === item.id}
						onClick={() => {
							onChange(item)
							setVal(item)
						}}
						leftIcon={item.icon}
					>
						{item.label}
					</Button>
				)
			})}
		</div>
	)
}

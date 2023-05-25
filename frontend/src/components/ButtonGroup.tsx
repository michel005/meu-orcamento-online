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
	onChange: (value: ButtonGroupItem | null) => void
	nullable?: boolean
	nullableLabel?: string
	nullableIcon?: string
}

export const ButtonGroup = ({
	list,
	value,
	variation = 'primary',
	onChange = () => null,
	nullable = false,
	nullableLabel = 'Todos',
	nullableIcon,
}: ButtonGroupType) => {
	const [val, setVal] = useState<ButtonGroupItem | null>(
		(value && list.find((x) => x.id === value.id)) || null
	)

	return (
		<div className={style.buttonGroup}>
			{nullable && (
				<Button
					variation={variation}
					data-selected={!val?.id}
					onClick={() => {
						onChange(null)
						setVal(null)
					}}
					leftIcon={nullableIcon}
				>
					{nullableLabel}
				</Button>
			)}
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

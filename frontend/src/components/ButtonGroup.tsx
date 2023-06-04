import React, { useState } from 'react'
import { Button, ButtonType } from './Button'
import style from './ButtonGroup.module.scss'
import { Bag } from './Bag'

export type ButtonGroupItem = {
	id: string | number
	label?: any
	icon?: string
	value: any
	bag?: any
}

export type ButtonGroupType = {
	list: ButtonGroupItem[]
	value?: any | null
	variation?: 'primary' | 'secondary'
	sidebarMode?: boolean
	onChange: (value: ButtonGroupItem | null) => void
	nullable?: boolean
	nullableLabel?: string
	nullableIcon?: string
	nullableBag?: any
	orientation?: 'horizontal' | 'vertical'
}

export const ButtonGroup = ({
	list,
	value,
	variation = 'primary',
	onChange = () => null,
	nullable = false,
	nullableLabel = 'Todos',
	nullableBag = null,
	nullableIcon,
	orientation = 'horizontal',
	sidebarMode = false,
}: ButtonGroupType) => {
	const [val, setVal] = useState<ButtonGroupItem | null>(
		(value && list.find((x) => x.id === value.id)) || null
	)

	return (
		<div
			className={`${style.buttonGroup} buttonGroup`}
			data-sidebar-mode={sidebarMode}
			data-orientation={orientation}
		>
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
					{nullableBag && (
						<Bag color="white" fixed={true}>
							{nullableBag}
						</Bag>
					)}
				</Button>
			)}
			{[...list].map((item) => {
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
						{item.bag && (
							<Bag color="white" fixed={true}>
								{item.bag}
							</Bag>
						)}
					</Button>
				)
			})}
		</div>
	)
}

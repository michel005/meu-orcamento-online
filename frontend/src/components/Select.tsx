import React, { SelectHTMLAttributes, useState } from 'react'
import style from './Select.module.scss'
import { Button } from './Button'

export type OptionType = {
	id: number
	label: string
	value: any | null
}

export type SelectType = {
	variation?: 'primary' | 'secondary'
	options?: OptionType[]
	nullable?: boolean
	nullableLabel?: string
	onChange?: (value: any) => void
} & SelectHTMLAttributes<HTMLSelectElement>

export const Select = ({
	variation = 'primary',
	options,
	nullable = false,
	nullableLabel = '',
	onChange = () => null,
	...props
}: SelectType) => {
	const [showOptions, setShowOptions] = useState(false)
	const [value, setValue] = useState<any>(props.value)

	const currentValue = options?.find((option) => option.id === value)

	return (
		<div className={style.select} data-show-options={showOptions}>
			<Button
				rightIcon="expand_more"
				variation={variation}
				onClick={() => setShowOptions((x) => !x)}
			>
				{currentValue?.label || nullableLabel}
			</Button>
			<div className={style.options}>
				{options?.map((option) => {
					return (
						<Button
							key={option.id}
							variation={variation}
							onClick={() => {
								setShowOptions(false)
								setValue(option.id)
								onChange(option.value)
							}}
						>
							{option.label}
						</Button>
					)
				})}
			</div>
		</div>
	)
}

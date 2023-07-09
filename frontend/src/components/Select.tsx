import React, { HTMLAttributes, useEffect, useState } from 'react'
import style from './Select.module.scss'
import { Button, ButtonType } from './Button'
import styleButton from './Button.module.scss'

export type SelectType = HTMLAttributes<HTMLSelectElement> & {
	label?: string | null
	help?: any | null
	variation?: 'primary' | 'secondary' | 'link' | 'sidebar'
	options?: any[]
	nullable?: boolean
	nullableLabel?: any
	onChange?: (value: any | null) => void
	idModifier?: (options: any) => any
	valueModifier?: (options: any) => any
	leftButton?: ButtonType | null
	rightButton?: ButtonType | null
	value?: any | null
}

export const Select = ({
	label,
	options,
	idModifier = (option: any) => option?.id,
	valueModifier = (option: any) => option?.label,
	leftButton = null,
	rightButton = null,
	nullable = false,
	nullableLabel = '',
	onChange = () => null,
	value,
	...props
}: SelectType) => {
	const [focus, setFocus] = useState(false)

	return (
		<div className={style.select} data-focus={focus}>
			{label && <label>{label}</label>}
			<div className={style.selectWrapper}>
				{leftButton && (
					<Button
						{...leftButton}
						variation="secondary"
						className={`${styleButton.button} ${style.leftButton}`}
					/>
				)}
				<select
					{...props}
					onFocus={() => setFocus(true)}
					onBlur={() => setFocus(false)}
					value={idModifier(value)}
					onChange={(e) => {
						setFocus(false)
						let selected = e.target.selectedIndex
						if (nullable) {
							selected--
						}
						console.log({ selected })
						onChange(options?.[selected] || null)
					}}
				>
					{nullable && <option>{nullableLabel || 'Sem valor'}</option>}
					{options?.map((option, optionKey) => {
						return (
							<option key={optionKey} value={idModifier(option)}>
								{valueModifier(option)}
							</option>
						)
					})}
				</select>
				{rightButton && (
					<Button
						{...rightButton}
						variation="secondary"
						className={`${styleButton.button} ${style.rightButton}`}
					/>
				)}
			</div>
		</div>
	)
}

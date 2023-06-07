import React, { HTMLAttributes, useEffect, useState } from 'react'
import style from './Select.module.scss'
import { Button } from './Button'

export type SelectType = HTMLAttributes<HTMLSelectElement> & {
	label?: string | null
	help?: any | null
	variation?: 'primary' | 'secondary' | 'sidebar'
	options?: any[]
	nullable?: boolean
	nullableLabel?: string
	onChange?: (value: any) => void
	idModifier?: (options: any) => any
	valueModifier?: (options: any) => any
	value?: any | null
}

export const Select = ({
	label,
	help,
	variation = 'primary',
	options,
	idModifier = (option: any) => option?.id,
	valueModifier = (option: any) => option?.label,
	nullable = false,
	nullableLabel = '',
	onChange = () => null,
	...props
}: SelectType) => {
	const [showOptions, setShowOptions] = useState(false)
	const [value, setValue] = useState<any>(
		options?.find((option) => idModifier(option) === idModifier(props.value))
	)
	const [showHelp, setShowHelp] = useState<boolean>(false)

	useEffect(() => {
		if (props.value !== value) {
			setValue(options?.find((option) => idModifier(option) === idModifier(props.value)))
		}
	}, [props.value])

	return (
		<div className={style.select} data-show-options={showOptions} data-variation={variation}>
			{label && (
				<div className={style.label}>
					{label}
					{help && (
						<div className={style.help}>
							<Button
								variation="link"
								leftIcon="help"
								onClick={() => setShowHelp((x) => !x)}
							/>
							{showHelp && <div className={style.helpFloatingPanel}>{help}</div>}
						</div>
					)}
				</div>
			)}
			<div className={style.insideSelect}>
				<Button
					rightIcon="expand_more"
					variation={variation}
					onClick={() => setShowOptions((x) => !x)}
				>
					<span>{value ? valueModifier(value) : nullableLabel}</span>
				</Button>
				<div className={style.options}>
					{nullable && (
						<Button
							variation={variation}
							data-selected={!value}
							onClick={() => {
								setShowOptions(false)
								setValue(null)
								onChange(null)
							}}
						>
							{nullableLabel || 'Sem valor'}
						</Button>
					)}
					{options?.map((option) => {
						return (
							<Button
								key={idModifier(option)}
								variation={variation}
								data-selected={idModifier(option) === idModifier(value)}
								onClick={() => {
									setShowOptions(false)
									setValue(option)
									onChange(option)
								}}
							>
								{valueModifier(option)}
							</Button>
						)
					})}
				</div>
			</div>
		</div>
	)
}

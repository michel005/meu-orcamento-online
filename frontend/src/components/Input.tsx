import React, { HTMLAttributes, useRef, useState } from 'react'
import { Button, ButtonType } from './Button'
import style from './Input.module.scss'
import styleButton from './Button.module.scss'

interface InputHTMLAttributes<T> extends HTMLAttributes<T> {
	disabled?: boolean | undefined
	max?: number | string | undefined
	min?: number | string | undefined
	placeholder?: string | undefined
	readOnly?: boolean | undefined
	step?: number | string | undefined
	accept?: string | undefined
	value?: any | undefined
}

export type InputType = InputHTMLAttributes<HTMLInputElement> & {
	label?: string
	leftButton?: ButtonType | null
	rightButton?: ButtonType | null
	info?: any | null
	help?: any | null
	masterProps?: any | null
	searchOptions?: ButtonType[]
	searchOptionsWithGroups?: { label: string; options: ButtonType[] }[]
	onChange?: (value: string | Date | null) => void
}

export const Input = ({
	label,
	info,
	help,
	leftButton = null,
	rightButton = null,
	onChange = () => null,
	masterProps = {},
	value,
	type,
	searchOptions = [],
	searchOptionsWithGroups = [],
	...props
}: InputType & {
	type?: string
}) => {
	const [showHelp, setShowHelp] = useState(false)
	const [focus, setFocus] = useState(false)
	const [openSearch, setOpenSearch] = useState(false)
	const ref = useRef<HTMLInputElement>(null)

	return (
		<div
			{...masterProps}
			className={style.input}
			data-type={type}
			data-focus={focus}
			data-search={openSearch}
			data-value={value}
		>
			<div className={style.container}>
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
				<div className={style.inputWithButton}>
					{leftButton && (
						<Button
							{...leftButton}
							variation="secondary"
							className={`${styleButton.button} ${style.leftButton}`}
						/>
					)}
					<input
						ref={ref}
						{...props}
						type={type}
						checked={type === 'checkbox' ? value || false : undefined}
						value={value || ''}
						onBlur={() => {
							setFocus(false)
						}}
						onFocus={() => {
							setFocus(true)
							setOpenSearch(true)
						}}
						onChange={(e: any) => {
							let x = e.target.value
							if (type === 'date') {
								if (x !== '') {
									x = new Date(e.target.value)
								}
							} else if (type === 'checkbox') {
								x = e.target.checked
							}
							onChange(x)
						}}
						data-have-left-button={!!leftButton}
						data-have-right-button={!!rightButton}
					/>
					{type === 'search' && openSearch ? (
						<Button
							leftIcon="close"
							variation="secondary"
							className={`${styleButton.button} ${style.rightButton}`}
							onClick={() => setOpenSearch(false)}
						/>
					) : (
						rightButton && (
							<Button
								{...rightButton}
								variation="secondary"
								className={`${styleButton.button} ${style.rightButton}`}
							/>
						)
					)}
				</div>
			</div>
			<div className={style.searchResults}>
				{searchOptionsWithGroups
					.filter((x) => x.options.length > 0)
					.map((option, optionKey) => {
						return (
							<div key={optionKey} className={style.searchGroup}>
								<h3>{option?.label}</h3>
								{option?.options
									.filter((_, index) => index < 5)
									.map((opt, optKey) => {
										return (
											<Button
												key={optKey}
												{...opt}
												variation="link"
												onClick={(e) => {
													setOpenSearch(false)
													opt?.onClick?.(e)
												}}
											/>
										)
									})}
							</div>
						)
					})}
				{searchOptionsWithGroups && searchOptionsWithGroups.length === 0 && (
					<Button disabled variation="link">
						Nenhum resultado encontrado
					</Button>
				)}
				{!searchOptionsWithGroups &&
					searchOptions
						.filter((_, index) => index < 5)
						.map((option, optionKey) => {
							return (
								<Button
									key={optionKey}
									{...option}
									variation="link"
									onClick={(e) => {
										setOpenSearch(false)
										option?.onClick?.(e)
									}}
								/>
							)
						})}
				{!searchOptionsWithGroups && searchOptions.length === 0 && (
					<Button disabled variation="link">
						Nenhum resultado encontrado
					</Button>
				)}
			</div>
			{info && <small className={style.info}>{info}</small>}
		</div>
	)
}

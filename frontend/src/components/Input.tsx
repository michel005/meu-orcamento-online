import React, { HTMLAttributes, useEffect, useRef, useState } from 'react'
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
	type?:
		| 'color'
		| 'date'
		| 'file'
		| 'number'
		| 'password'
		| 'range'
		| 'text'
		| 'checkbox'
		| 'search'
		| 'select'
		| undefined
	accept?: string | undefined
	value?: any | undefined
}

export type InputType = InputHTMLAttributes<HTMLInputElement> & {
	label?: string
	leftButton?: ButtonType | null
	rightButton?: ButtonType | null
	info?: any | null
	error?: any | null
	help?: any | null
	masterProps?: any | null
	searchOptions?: ButtonType[]
	onChange?: (value: string | Date | null) => void
}

export const Input = ({
	label,
	info,
	help,
	error,
	leftButton = null,
	rightButton = null,
	onChange = () => null,
	masterProps = {},
	value,
	type,
	searchOptions = [],
	...props
}: InputType) => {
	const [showHelp, setShowHelp] = useState(false)
	const [focus, setFocus] = useState(false)
	const [openSearch, setOpenSearch] = useState(false)
	const ref = useRef<HTMLInputElement>(null)

	const getValue = () => {
		if (type === 'file') {
			return ''
		}
		return value || ''
	}

	return (
		<div
			{...masterProps}
			className={style.input}
			data-error={!!error}
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
				{type === 'file' && (
					<>
						<div className={style.fileButton}>
							{!value && (
								<>
									<Button
										leftIcon="folder"
										onClick={() => {
											if (ref.current) {
												ref.current.click()
											}
										}}
									>
										Buscar Arquivo
									</Button>
								</>
							)}
							{!!value && (
								<>
									<Button
										leftIcon="edit"
										onClick={() => {
											if (ref.current) {
												ref.current.click()
											}
										}}
									/>
									<Button
										leftIcon="close"
										variation="secondary"
										onClick={() => {
											onChange(null)
										}}
									/>
									<Button
										className={`${styleButton.button} ${style.showImage}`}
										variation="link"
									>
										{value?.file?.name}
										{!!value && <img src={URL.createObjectURL(value?.file)} />}
									</Button>
								</>
							)}
						</div>
					</>
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
						accept={props.accept}
						ref={ref}
						{...props}
						type={type}
						checked={type === 'checkbox' ? value || false : undefined}
						value={getValue()}
						onBlur={() => {
							setFocus(false)
						}}
						onFocus={() => {
							setFocus(true)
							setOpenSearch(true)
						}}
						onChange={(e: any) => {
							let x = e.target.value
							if (type === 'file') {
								x = {
									file: e.target.files[0],
									value: e.target.value,
								}
							} else if (type === 'date') {
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
				{searchOptions.map((option, optionKey) => {
					return (
						<Button
							{...option}
							key={optionKey}
							variation="link"
							onClick={(e) => {
								setOpenSearch(false)
								option?.onClick?.(e)
							}}
						/>
					)
				})}
				{searchOptions.length === 0 && (
					<Button disabled variation="link">
						Nenhum resultado encontrado
					</Button>
				)}
			</div>
			{info && <small className={style.info}>{info}</small>}
			{error && <small className={style.error}>{error}</small>}
		</div>
	)
}

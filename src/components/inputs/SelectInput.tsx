import React, { useMemo, useState } from 'react'
import { Field } from '../Field'
import { ButtonGhost } from '../Button'
import style from './SelectInput.module.scss'
import fieldStyle from '../Field.module.scss'
import { DateUtils } from '../../utils/DateUtils'

export const SelectInput = ({
	label,
	leftSide,
	info,
	disabled,
	value,
	onChange,
	options = [],
	idModifier = (value: any) => value?.id,
	valueRender = (value: any) => value,
	optionValueRender = undefined,
	error,
}) => {
	const [showOptions, setShowOptions] = useState(false)
	const [filter, setFilter] = useState('')
	let setInputFocus = null

	const currentOption = options.find((x) => idModifier(x) === value)

	const filteredOptions = useMemo(() => {
		const filters = filter.split(';')
		let filtered = options
		for (const f of filters) {
			filtered = filtered.filter((x) => JSON.stringify(x).includes(f))
		}
		return filtered
	}, [filter])

	return (
		<Field
			className={`${style.selectInput} ${showOptions ? style.showOptions : ''}`}
			label={label}
			leftSide={leftSide}
			rightSide={
				!disabled && (
					<ButtonGhost
						className={style.arrowButton}
						leftIcon="keyboard_arrow_down"
						onClick={() => {
							if (!disabled) {
								setFilter('')
								setShowOptions((x) => {
									if (setInputFocus) {
										setInputFocus(!x)
									}
									return !x
								})
							}
						}}
					/>
				)
			}
			info={info}
			input={(setFocus) => {
				setInputFocus = setFocus
				return (
					<div
						className={`${fieldStyle.fieldInput} ${style.selectInput}`}
						data-disabled={disabled}
					>
						<div className={style.currentOption}>
							{value && currentOption ? (
								<>
									{valueRender(currentOption)}
									<ButtonGhost
										className={style.clearButton}
										leftIcon="close"
										onClick={() => {
											if (!disabled) {
												setFilter('')
												onChange(null)
											}
										}}
									/>
								</>
							) : (
								<div className={style.placeholder}>Sem valor selecionado</div>
							)}
						</div>
						{showOptions && (
							<div className={style.options}>
								{options.length > 10 && (
									<div className={style.quickSearch}>
										<Field
											input={(setFocusQuickSearch, id) => (
												<input
													id={id}
													value={filter}
													onChange={(event) => {
														setFilter(event.target.value)
													}}
													placeholder="Busca rápida. Ex: João; PF; Maringá"
													onFocus={() => setFocusQuickSearch(true)}
													onBlur={() => setFocusQuickSearch(false)}
												/>
											)}
										/>
									</div>
								)}
								{filteredOptions.map((option, optionKey) => {
									return (
										<div
											key={optionKey}
											className={style.optionRender}
											data-selected={idModifier(option) === value}
											onClick={() => {
												onChange(idModifier(option))
												setShowOptions(false)
											}}
										>
											{!!optionValueRender
												? optionValueRender(option)
												: valueRender(option)}
										</div>
									)
								})}
							</div>
						)}
					</div>
				)
			}}
			disabled={disabled}
			error={error}
		/>
	)
}

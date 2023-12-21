import React, { useMemo, useRef, useState } from 'react'
import { Field } from '../Field'
import { ButtonGhost } from '../Button'
import style from './SelectInput.module.scss'
import fieldStyle from '../Field.module.scss'
import { SortUtils } from '../../utils/SortUtils'

export const SelectInput = ({
	label = null,
	leftSide = null,
	rightSide = null,
	info = null,
	disabled = null,
	value,
	onChange,
	options = [],
	idModifier = (option: any) => option?.id,
	valueRender = (option: any) => option,
	optionValueRender = undefined,
	optionsPosition = 'bottom',
	numberOfOptions = 5,
	placeholder = null,
	error = null,
	field = null,
	multiple = false,
	nullable = true,
}) => {
	const [showOptions, setShowOptions] = useState(false)
	const [filter, setFilter] = useState(';')
	const optionsRef = useRef<HTMLDivElement>(null)

	const currentOption = multiple
		? (value || []).length > 0
		: options.find((x) => idModifier(x) === value)

	const filteredOptions = useMemo(() => {
		const filters = filter.split(';')
		let filtered = options
		for (const f of filters) {
			filtered = filtered.filter((x) => (x ? JSON.stringify(x).includes(f) : true))
		}
		return filtered
	}, [filter, options])

	return (
		<>
			{showOptions && (
				<div
					className={style.background}
					onClick={() => {
						setShowOptions(false)
					}}
				/>
			)}
			<Field
				field={field}
				className={style.selectInput}
				data-show-options={showOptions}
				data-options-position={optionsPosition}
				data-option-selected={!!currentOption}
				label={label}
				leftSide={leftSide}
				rightSide={
					!disabled && (
						<div className={style.specialOptions}>
							<>
								{nullable && value && currentOption && (
									<ButtonGhost
										className={style.clearButton}
										leftIcon="close"
										onClick={() => {
											if (!disabled) {
												setShowOptions(false)
												setFilter('')
												onChange(null)
											}
										}}
									/>
								)}
								<ButtonGhost
									className={style.arrowButton}
									leftIcon="keyboard_arrow_down"
									onClick={() => {
										if (!disabled) {
											setFilter('')
											setShowOptions((x) => {
												return !x
											})
										}
									}}
								/>
								{rightSide}
							</>
						</div>
					)
				}
				info={info}
				input={() => {
					return (
						<div
							className={`${fieldStyle.fieldInput} ${style.selectInput}`}
							data-disabled={disabled}
							data-show-options={showOptions}
						>
							<div
								className={style.currentOption}
								onClick={() => {
									if (!disabled) {
										setFilter('')
										setShowOptions((x) => {
											return !x
										})
									}
								}}
							>
								{multiple ? (
									<>{(value || []).length} selecionado(s)</>
								) : (
									<>
										{value && currentOption ? (
											<>{valueRender(currentOption)}</>
										) : (
											<div className={style.placeholder}>
												{placeholder || 'Sem valor selecionado'}
											</div>
										)}
									</>
								)}
							</div>
							{showOptions && (
								<div className={style.options} ref={optionsRef}>
									{options.length > numberOfOptions && (
										<div className={style.quickSearch}>
											<Field
												field="filter"
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
												data-selected={
													multiple
														? (value || []).includes(idModifier(option))
														: idModifier(option) === value
												}
												onClick={() => {
													if (multiple) {
														if (
															value &&
															value.includes(idModifier(option))
														) {
															const futureValue = [
																...value.filter(
																	(x: any) =>
																		x !== idModifier(option)
																),
															]
															onChange(
																futureValue.length === 0
																	? null
																	: futureValue
															)
														} else {
															onChange(
																SortUtils.group([
																	...(value || []),
																	idModifier(option),
																])
															)
														}
													} else {
														onChange(idModifier(option))
														setShowOptions(false)
													}
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
		</>
	)
}

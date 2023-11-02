import React, { useMemo, useState } from 'react'
import { Field } from '../Field'
import { ButtonGhost } from '../Button'
import style from './SelectInput.module.scss'
import fieldStyle from '../Field.module.scss'
import { DateUtils } from '../../utils/DateUtils'

export const SelectInput = ({
	label = null,
	leftSide = null,
	info = null,
	disabled = null,
	value,
	onChange,
	options = [],
	idModifier = (option: any) => option?.id,
	valueRender = (option: any) => option,
	optionValueRender = undefined,
	placeholder = null,
	error = null,
	className = null,
	field = null,
}) => {
	const [showOptions, setShowOptions] = useState(false)
	const [filter, setFilter] = useState(';')

	const currentOption = options.find((x) => idModifier(x) === value)

	const filteredOptions = useMemo(() => {
		const filters = filter.split(';')
		let filtered = options
		for (const f of filters) {
			filtered = filtered.filter((x) => (x ? JSON.stringify(x).includes(f) : true))
		}
		return filtered
	}, [filter])

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
				className={`${style.selectInput} ${className} ${
					showOptions ? style.showOptions : ''
				}`}
				label={label}
				leftSide={leftSide}
				rightSide={
					<div className={style.specialOptions}>
						{!disabled && (
							<>
								{value && currentOption && (
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
							</>
						)}
					</div>
				}
				info={info}
				input={() => {
					return (
						<div
							className={`${fieldStyle.fieldInput} ${style.selectInput}`}
							data-disabled={disabled}
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
								{value && currentOption ? (
									<>{valueRender(currentOption)}</>
								) : (
									<div className={style.placeholder}>
										{placeholder || <>Sem valor selecionado</>}
									</div>
								)}
							</div>
							{showOptions && (
								<div className={style.options}>
									{options.length > 3 && (
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
		</>
	)
}

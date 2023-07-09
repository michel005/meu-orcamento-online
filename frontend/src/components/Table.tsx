import React, { useMemo, useState } from 'react'
import style from './Table.module.scss'
import { CSSProperties } from 'styled-components'
import { InputImageValue } from './InputImage'
import { Image } from './Image'
import { IconType } from '../types/IconType'
import { SortUtils } from '../utils/SortUtils'
import { Input } from './Input'
import { Button } from './Button'
import { CalendarInput } from './CalendarInput'
import { Select } from './Select'
import { DateUtils } from '../utils/DateUtils'
import { Calendar } from './Calendar'

export type TableDefinition = {
	align?: string
	className?: string | undefined
	field: string
	headerIcon?: IconType | null
	label: string
	type?: 'string' | 'date' | 'number' | 'image' | 'imageList' | 'currency' | 'boolean' | 'select'
	valueModifier?: (row: any) => any
	width?: string
	selectValues?: Map<string, string>
	filterPlaceholder?: string
}

export type TableType = {
	value: any[]
	definition?: TableDefinition[]
	onClick?: (row: any, index: number) => void
	selected?: any
	onChangeSelected?: (value: any) => void
	noDataFoundLabel?: string
	initialSort?: {
		field?: string
		direction?: 'ASC' | 'DESC'
	}
	blockSort?: boolean | null
	footer?: any[]
	filters?: Map<string, any>
	onChangeFilters?: (value: Map<string, any>) => void
}

export const Table = ({
	definition = [],
	value,
	onClick = () => null,
	selected,
	onChangeSelected,
	noDataFoundLabel = 'Nenhum registro encontrado',
	initialSort = {},
	footer,
	filters,
	onChangeFilters,
}: TableType) => {
	const [sort, setSort] = useState<any>(initialSort)
	const [focusedColumn, setFocusedColumn] = useState<string | null>(null)
	const [showFilter, setShowFilter] = useState<string | null>(null)

	const sortValues = (x: any, y: any) => {
		let result = 0
		const def = definition.find((def) => def.field === sort.field)
		if (def?.type === 'date') {
			if (!sort.field) {
				result = 0
			}
			result = SortUtils.sortDate(x, y, sort.field, sort.direction)
		} else {
			if (!sort.field) {
				result = 0
			}
			if ((x[sort.field] || '') > (y[sort.field] || '')) {
				result = 1
			}
			if ((x[sort.field] || '') < (y[sort.field] || '')) {
				result = -1
			}
			result = sort.direction === 'ASC' ? result : result * -1
		}
		return result
	}

	const filteredValue = useMemo(
		() =>
			value.filter((x) => {
				if (!filters || filters.size === 0) {
					return true
				}

				const allApproved: any = {}
				Array.from(filters.keys()).forEach((a) => {
					allApproved[a] = true
				})
				const find = Array.from(filters.keys()).find((y: string) => {
					const def = definition.find((d) => d.field === y) || ({} as TableDefinition)
					if (!def.type || def.type === 'string') {
						allApproved[y] =
							filters?.get(y) !== null &&
							x[y] !== null &&
							x[y] !== undefined &&
							(x[y] + '').indexOf(filters?.get(y)) !== -1
					} else if (def.type === 'date') {
						allApproved[y] =
							filters?.get(y) !== null &&
							x[y] !== null &&
							x[y] !== undefined &&
							DateUtils.betweenString(
								x[y],
								filters?.get(y)?.start || SortUtils.today,
								filters?.get(y)?.end || SortUtils.today
							)
					} else {
						allApproved[y] = filters?.get(y) !== null && filters?.get(y) === x[y]
					}
				})

				return Object.keys(allApproved).find((a) => !allApproved[a]) ? false : true
			}),
		[value, filters]
	)

	return (
		<table
			className={style.table}
			style={
				{
					'--data-length': value.length.toString(),
				} as React.CSSProperties
			}
		>
			<thead>
				<tr>
					{definition.map((def) => {
						return (
							<th
								onMouseEnter={() => setFocusedColumn(def.field)}
								onMouseLeave={() => setFocusedColumn(null)}
								key={def.field}
								className={def?.className}
								data-alignment={def?.align}
								style={{ '--width': def.width } as CSSProperties}
							>
								<Button
									data-sort-direction={sort.direction}
									leftIcon={def.headerIcon}
									rightIcon={sort.field == def.field ? 'sort' : null}
									variation="link"
									className={style.sortMode}
									onClick={() => {
										setShowFilter((x) => (x ? null : def.field))
									}}
								>
									{def.label}
									{filters?.has(def.field) &&
										filters?.get(def.field) !== null &&
										filters?.get(def.field) !== '' && (
											<Button
												className={style.filterIndicator}
												leftIcon="filter_alt"
												variation="link"
											/>
										)}
								</Button>
								{showFilter && showFilter === def.field && (
									<div className={style.columnOptions}>
										{filters && onChangeFilters && (
											<>
												{def.type === 'select' && (
													<>
														<label
															style={{
																color: '#aaa',
																fontWeight: 'bold',
																display: 'flex',
																flexDirection: 'row',
																fontSize: '14px',
																marginBottom: '-4px',
															}}
														>
															{def.label}
														</label>
														<Select
															placeholder={def.filterPlaceholder}
															value={filters?.get(def.field) || ''}
															onChange={(value) => {
																if (!filters) {
																	filters = new Map()
																}
																if (!value) {
																	filters.delete(def.field)
																} else {
																	filters.set(def.field, value)
																}
																setShowFilter(null)
																onChangeFilters?.(new Map(filters))
															}}
															options={Array.from(
																def?.selectValues?.keys() || []
															)}
															idModifier={(row) => row}
															valueModifier={(row) =>
																def?.selectValues?.get(row)
															}
															nullable={true}
														/>
													</>
												)}
												{def.type === 'date' && (
													<>
														<label
															style={{
																color: '#aaa',
																fontWeight: 'bold',
																display: 'flex',
																flexDirection: 'row',
																fontSize: '14px',
																marginBottom: '-4px',
															}}
														>
															{def.label}
														</label>
														<Calendar
															value={filters?.get(def.field)}
															range={true}
															onChange={(value) => {
																if (!filters) {
																	filters = new Map()
																}
																if (!value) {
																	filters.delete(def.field)
																} else {
																	filters.set(def.field, value)
																}
																if (value?.start && value?.end) {
																	setShowFilter(null)
																}
																onChangeFilters?.(new Map(filters))
															}}
														/>
													</>
												)}
												{def.type === 'boolean' && (
													<>
														<Input
															type="checkbox"
															label={def.label}
															value={filters?.get(def.field)}
															onChange={(value) => {
																if (!filters) {
																	filters = new Map()
																}
																filters.set(def.field, value)
																setShowFilter(null)
																onChangeFilters?.(new Map(filters))
															}}
														/>
														{filters?.has(def.field) &&
															filters?.get(def.field) !== null && (
																<Button
																	onClick={() => {
																		if (!filters) {
																			filters = new Map()
																		}
																		filters.delete(def.field)
																		setShowFilter(null)
																		onChangeFilters?.(
																			new Map(filters)
																		)
																	}}
																>
																	Remover Filtro
																</Button>
															)}
													</>
												)}
												{def.type !== 'date' &&
													def.type !== 'image' &&
													def.type !== 'imageList' &&
													def.type !== 'boolean' &&
													def.type !== 'select' && (
														<Input
															label={def.label}
															placeholder={def.filterPlaceholder}
															value={filters?.get(def.field)}
															onChange={(value) => {
																if (!filters) {
																	filters = new Map()
																}
																if (value === '') {
																	filters.delete(def.field)
																} else {
																	filters.set(def.field, value)
																}
																onChangeFilters?.(new Map(filters))
															}}
														/>
													)}
											</>
										)}
										<Button
											variation={
												sort.field === def.field && sort.direction === 'ASC'
													? 'primary'
													: 'secondary'
											}
											leftIcon="sort"
											data-invert
											onClick={() => {
												setSort((x: any) => {
													x.direction = 'ASC'
													x.field = def.field
													return { ...x }
												})
												setShowFilter(null)
											}}
										>
											Ordem Crescente
										</Button>
										<Button
											variation={
												sort.field === def.field &&
												sort.direction === 'DESC'
													? 'primary'
													: 'secondary'
											}
											leftIcon="sort"
											onClick={() => {
												setSort((x: any) => {
													x.direction = 'DESC'
													x.field = def.field
													return { ...x }
												})
												setShowFilter(null)
											}}
										>
											Ordem Decrescente
										</Button>
									</div>
								)}
							</th>
						)
					})}
				</tr>
			</thead>
			<tbody>
				{filteredValue &&
					filteredValue.sort(sortValues).map((row, rowKey) => {
						return (
							<tr
								data-selected={selected && selected?.id === row.id}
								key={JSON.stringify(row)}
								onClick={() => {
									if (selected !== undefined) {
										onChangeSelected?.(row)
									}
								}}
								onDoubleClick={() => onClick(row, rowKey)}
							>
								{definition.map((def) => {
									if (def?.type === 'image' && row?.[def.field]?.base64) {
										return (
											<td
												data-focus={focusedColumn === def.field}
												key={`${rowKey}_${def.field}`}
												data-alignment={def?.align}
												className={def?.className}
												data-image
											>
												<Image {...row?.[def.field]} />
											</td>
										)
									}
									if (
										def?.type === 'imageList' &&
										(row?.[def.field] || []).length > 0
									) {
										return (
											<td
												data-focus={focusedColumn === def.field}
												key={`${rowKey}_${def.field}`}
												data-alignment={def?.align}
												className={def?.className}
												data-image-list
											>
												<div>
													{(row?.[def.field] || []).map(
														(
															image: InputImageValue,
															imageKey: number
														) => {
															return (
																<Image {...image} key={imageKey} />
															)
														}
													)}
												</div>
											</td>
										)
									}
									if (def.type === 'currency') {
										return (
											<td
												data-focus={focusedColumn === def.field}
												key={`${rowKey}_${def.field}`}
												data-alignment={def?.align}
												className={def?.className}
											>
												{(
													((def?.valueModifier
														? def?.valueModifier(row)
														: row[def.field]) / 100) as number
												).toLocaleString('pt-br', {
													style: 'currency',
													currency: 'BRL',
												})}
											</td>
										)
									}
									return (
										<td
											data-focus={focusedColumn === def.field}
											key={`${rowKey}_${def.field}`}
											data-alignment={def?.align}
											className={def?.className}
										>
											{def?.valueModifier
												? def?.valueModifier(row)
												: row[def.field]}
										</td>
									)
								})}
							</tr>
						)
					})}
				{!filteredValue ||
					(filteredValue.length === 0 && (
						<tr>
							<td colSpan={definition.length}>{noDataFoundLabel}</td>
						</tr>
					))}
			</tbody>
			{footer && filteredValue && filteredValue.length > 0 && (
				<tfoot>
					{footer.map((f, fKey) => {
						return <tr key={fKey}>{f}</tr>
					})}
				</tfoot>
			)}
		</table>
	)
}

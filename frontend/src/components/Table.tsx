import React, { useState } from 'react'
import style from './Table.module.scss'
import { DateUtils } from '../utils/DateUtils'

export type TableDefinition = {
	align?: string
	className?: string | undefined
	field: string
	headerIcon?: string | null
	label: string
	type?: 'string' | 'date' | 'number'
	valueModifier?: (row: any) => any
}

export type TableType = {
	value: any[]
	definition?: TableDefinition[]
	onClick?: (row: any) => void
	selected?: any
	onChangeSelected?: (value: any) => void
	noDataFoundLabel?: string
	initialSort?: {
		field?: string
		direction?: 'ASC' | 'DESC'
	}
	blockSort?: boolean | null
	footer?: any[]
}

export const Table = ({
	definition = [],
	value,
	onClick = () => null,
	selected,
	onChangeSelected,
	noDataFoundLabel = 'Nenhum registro encontrado',
	initialSort = {},
	blockSort = false,
	footer,
}: TableType) => {
	const [sort, setSort] = useState<any>(initialSort)

	const sortValues = (x: any, y: any) => {
		let result = 0
		const def = definition.find((def) => def.field === sort.field)
		if (def?.type === 'date') {
			if (!sort.field) {
				result = 0
			}
			if (
				DateUtils.stringToDate(x[sort.field] || '') >
				DateUtils.stringToDate(y[sort.field] || '')
			) {
				result = 1
			}
			if (
				DateUtils.stringToDate(x[sort.field] || '') <
				DateUtils.stringToDate(y[sort.field] || '')
			) {
				result = -1
			}
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
		}
		return sort.direction === 'ASC' ? result : result * -1
	}

	return (
		<table
			className={style.table}
			style={
				{
					'--data-length': (value.length + (footer?.length || 0)).toString(),
				} as React.CSSProperties
			}
		>
			<thead>
				<tr>
					{definition.map((def) => {
						return (
							<th
								onClick={() => {
									if (blockSort) {
										return
									}
									setSort((x: any) => {
										if (x.field === def.field) {
											if (x.direction === 'ASC') {
												x.direction = 'DESC'
											} else {
												x.direction = 'ASC'
											}
										} else {
											x.direction = 'ASC'
										}
										x.field = def.field
										return { ...x }
									})
								}}
								key={def.field}
								className={def?.className}
								data-alignment={def?.align}
								data-icon={def.headerIcon}
							>
								<div
									data-icon={def.headerIcon}
									data-sort-desc={
										sort.field === def.field && sort.direction === 'DESC'
									}
									data-sort={sort.field === def.field}
								>
									{def.label}
								</div>
							</th>
						)
					})}
				</tr>
			</thead>
			<tbody>
				{value &&
					value.sort(sortValues).map((row, rowKey) => {
						return (
							<tr
								data-selected={selected && selected?.id === row.id}
								key={rowKey}
								onClick={() => {
									if (selected !== undefined) {
										onChangeSelected?.(row)
									}
								}}
								onDoubleClick={() => onClick(row)}
							>
								{definition.map((def) => {
									return (
										<td
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
				{!value ||
					(value.length === 0 && (
						<tr>
							<td colSpan={definition.length}>{noDataFoundLabel}</td>
						</tr>
					))}
			</tbody>
			{footer && value && value.length > 0 && (
				<tfoot>
					{footer.map((f, fKey) => {
						return <tr key={fKey}>{f}</tr>
					})}
				</tfoot>
			)}
		</table>
	)
}

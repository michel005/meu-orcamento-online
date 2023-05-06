import React from 'react'
import { useState } from 'react'

export type TableSortType = {
	column?: string
	direction?: 'ASC' | 'DESC'
}

export type TableType = {
	definition: TableColumnDefinitionType[]
	value: any[]
	onClick: any
}

export type TableColumnDefinitionType = {
	name: string
	header: string
	modifier: (value: any) => any
}

export const Table = ({ definition = [], value = [], onClick = () => null }: TableType) => {
	const [sort, setSort] = useState<TableSortType>({})
	const sortedValue = (value || []).sort((x, y) => {
		if (!sort?.column) {
			return 0
		}
		if (x[sort?.column] > y[sort?.column]) {
			return sort?.direction === 'ASC' ? 1 : -1
		} else if (x[sort?.column] < y[sort?.column]) {
			return sort?.direction === 'ASC' ? -1 : 1
		} else {
			return 0
		}
	})

	return (
		<table data-length={value.length}>
			<thead>
				<tr>
					{definition.map((column, columnKey) => {
						return (
							<td
								data-sort={sort?.column === column.name && !!sort?.column}
								data-sort-desc={
									sort?.column === column.name && sort?.direction === 'DESC'
								}
								onClick={() => {
									setSort((x) => {
										x.direction =
											sort?.column === column.name
												? x.direction === 'ASC'
													? 'DESC'
													: 'ASC'
												: 'ASC'
										x.column = column.name
										return { ...x }
									})
								}}
								key={columnKey}
							>
								{column.header}
							</td>
						)
					})}
				</tr>
			</thead>
			<tbody>
				{sortedValue.map((row, rowKey) => {
					return (
						<tr key={rowKey} onDoubleClick={() => onClick(row)}>
							{definition.map((column, columnKey) => {
								return (
									<td key={columnKey}>
										{column.modifier
											? column.modifier(row[column.name])
											: row[column.name]}
									</td>
								)
							})}
						</tr>
					)
				})}
			</tbody>
		</table>
	)
}

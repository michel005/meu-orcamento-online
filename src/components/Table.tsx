import React, { CSSProperties, useState } from 'react'
import { usePagination } from '../hooks/usePagination'
import { NumberUtils } from '../utils/NumberUtils'
import { SortUtils } from '../utils/SortUtils'
import { Button, ButtonGhost, ButtonSecondary } from './Button'
import { ButtonGroup } from './ButtonGroup'
import { FlexRow } from './FlexRow'
import { Icon } from './Icon'
import style from './Table.module.scss'
import { TableType, TableTypeDefinition } from './Table.type'

export const Table = ({ definition, value }: TableType) => {
	const [pageSize, setPageSize] = useState(10)
	const [sort, setSort] = useState({
		field: Object.keys(definition)[0],
		direction: 'ASC',
	})
	const pagination = usePagination({
		values: value.sort((x, y) =>
			definition[sort.field].type === 'date'
				? SortUtils.sortDate(x, y, sort.field, sort.direction as 'ASC' | 'DESC')
				: SortUtils.sort(x, y, sort.field, sort.direction as 'ASC' | 'DESC')
		),
		length: pageSize,
	})
	const allColumns = Object.keys(definition).map((x) => ({
		...definition[x],
		column: x,
	}))

	const valueModifier = (
		row: any,
		column: TableTypeDefinition & {
			column: string
		}
	) => {
		if (column.valueOverride) {
			return column.valueOverride?.(row)
		} else if (column.type === 'domain') {
			return column.keyValue.find((x) => x?.[0] === String(row?.[column.column]))?.[1]
		} else if (column.type === 'currency') {
			return NumberUtils.numberToCurrency(row?.[column.column])
		}
		return column.valueOverride?.(row) || row[column.column]
	}

	return (
		<table
			className={style.table}
			data-context="table"
			style={{ '--numberOfRows': pagination.slice.length } as CSSProperties}
		>
			<thead className={style.tableHead}>
				<tr className={style.tableHeadRow}>
					{allColumns.map((column) => {
						return (
							<th
								data-priority={column.priority || 'regular'}
								data-column={column.column}
								className={style.tableHeadColumn}
								key={`header_${column.column}`}
								style={{
									width:
										column.width || Math.round(100 / allColumns.length) + '%',
								}}
								data-alignment={column.alignment || 'left'}
								onClick={() => {
									setSort((prevState) => {
										if (prevState.field === column.column) {
											return {
												field: column.column,
												direction:
													prevState.direction === 'ASC' ? 'DESC' : 'ASC',
											}
										} else {
											return {
												field: column.column,
												direction: 'ASC',
											}
										}
									})
								}}
							>
								<FlexRow className={style.tableHeadColumnContent}>
									{column.header}
									{sort.field === column.column && (
										<Icon
											icon={
												sort.direction === 'ASC'
													? 'keyboard_arrow_down'
													: 'keyboard_arrow_up'
											}
										/>
									)}
								</FlexRow>
							</th>
						)
					})}
				</tr>
			</thead>
			<tbody className={style.tableBody}>
				{pagination.slice.map((row, rowIndex) => {
					return (
						<tr className={style.tableBodyRow} key={rowIndex}>
							{allColumns.map((column) => {
								return (
									<td
										data-priority={column.priority || 'regular'}
										className={style.tableBodyColumn}
										key={`body_${rowIndex}_${column.column}`}
										data-alignment={column.alignment || 'left'}
									>
										<div className={style.tableBodyColumnContent}>
											{valueModifier(row, column)}
										</div>
									</td>
								)
							})}
						</tr>
					)
				})}
			</tbody>
			<tfoot className={style.tableFoot}>
				<tr className={style.tableFootRow}>
					<td className={style.tableFootRowPagination} colSpan={allColumns.length}>
						<FlexRow className={style.tableFootRowPaginationContent}>
							{pagination.slice.length !== value.length && (
								<>
									<ButtonGhost
										leftIcon="keyboard_arrow_left"
										onClick={() => {
											if (pagination.currentPage > 0) {
												pagination.goToPrevious()
											}
										}}
									/>
									{new Array(pagination.numberOfPages).fill(0).map((_, index) => {
										return (
											<Button
												key={index}
												variationOverride={
													pagination.currentPage === index
														? 'secondary'
														: 'ghost'
												}
												onClick={() => {
													pagination.goTo(index)
												}}
											>
												{index + 1}
											</Button>
										)
									})}
									<ButtonGhost
										leftIcon="keyboard_arrow_right"
										onClick={() => {
											if (
												pagination.currentPage <
												pagination.numberOfPages - 1
											) {
												pagination.goToNext()
											}
										}}
									/>
								</>
							)}
							{value.length === 0 && <p>Nenhum registro encontrado</p>}
							<div style={{ flexGrow: 1 }} />
							<p>Tamanho da página</p>
							{[5, 10, 20, 50].map((size) => {
								return (
									<Button
										key={size}
										variationOverride={
											pageSize === size ? 'secondary' : 'ghost'
										}
										onClick={() => {
											setPageSize(size)
										}}
									>
										{size}
									</Button>
								)
							})}
						</FlexRow>
					</td>
				</tr>
			</tfoot>
		</table>
	)
}

import React, { useEffect, useState } from 'react'
import { TableType } from './Table.type'
import style from './Table.module.scss'
import { NumberUtils } from '../../utils/NumberUtils'
import { Pagination } from './Pagination'
import { Icon } from '../Icon'
import { DivRow } from '../DivRow'
import { SortUtils } from '../../utils/SortUtils'

export const Table = <T,>({ header, value, footer, pagination = true }: TableType<T>) => {
	const [sort, setSort] = useState<[string, 'ASC' | 'DESC'] | null>(null)
	const [currentPage, setCurrentPage] = useState<number>(0)
	const pageSize = 10

	const valueModifier = (field: string, value: any) => {
		const definition = header?.[field as keyof typeof header]
		if (definition && definition.type === 'currency') {
			return NumberUtils.numberToCurrency(value)
		}
		return value
	}

	const sortedValue = value.sort((x, y) => {
		if (!sort) {
			return 0
		}
		const definition = header?.[sort?.[0] as keyof typeof header]
		if (definition && definition.type === 'date') {
			return SortUtils.sortDate(x, y, sort?.[0], sort[1])
		}
		return SortUtils.sort(x, y, sort?.[0], sort[1])
	})

	const sliceOfValue = pagination
		? [...sortedValue].splice(currentPage * pageSize, pageSize)
		: sortedValue

	useEffect(() => {
		setSort([Object.keys(header)[0], 'ASC'])
	}, [])

	return (
		<div className={style.table}>
			<table>
				<thead>
					<tr>
						{Object.keys(header)
							.filter((field) => header[field as keyof typeof header]?.show !== false)
							.map((field, fieldKey) => {
								return (
									<th
										key={fieldKey}
										data-alignment={
											header[field as keyof typeof header]?.alignment ||
											'left'
										}
										style={
											header[field as keyof typeof header]?.width
												? {
														width: header[field as keyof typeof header]
															?.width,
												  }
												: {}
										}
									>
										<DivRow style={{ gap: '4px', userSelect: 'none' }}>
											<a
												onClick={() => {
													setSort((x) => {
														if (x && x[0] === field && x[1] === 'ASC') {
															return [field, 'DESC']
														}
														return [field, 'ASC']
													})
												}}
											>
												{header[field as keyof typeof header]?.label}
											</a>
											{sort?.[0] === field && (
												<Icon
													icon={
														sort?.[1] === 'ASC'
															? 'keyboard_arrow_down'
															: 'keyboard_arrow_up'
													}
												/>
											)}
										</DivRow>
									</th>
								)
							})}
					</tr>
				</thead>
				<tbody>
					{sliceOfValue &&
						sliceOfValue.map((row, rowKey) => {
							return (
								<tr key={rowKey}>
									{Object.keys(header)
										.filter(
											(field) =>
												header[field as keyof typeof header]?.show !== false
										)
										.map((field, fieldKey) => {
											return (
												<td
													key={fieldKey}
													data-alignment={
														header[field as keyof typeof header]
															?.alignment || 'left'
													}
												>
													{valueModifier(
														field,
														!header[field as keyof typeof header]
															?.valueModifier
															? row[field as keyof typeof header]
															: header[
																	field as keyof typeof header
															  ]?.valueModifier?.(row, rowKey)
													)}
												</td>
											)
										})}
								</tr>
							)
						})}
					{(!sliceOfValue || sliceOfValue.length === 0) && (
						<tr data-not-found={true}>
							<td colSpan={Object.keys(header).length}>Nenhum registro encontrado</td>
						</tr>
					)}
				</tbody>
				{footer && <tfoot>{footer}</tfoot>}
			</table>
			{pagination && (
				<div className={style.pagination}>
					<span>{value?.length || 0} registro(s)</span>
					{(value?.length || 0) > 0 && (
						<Pagination
							currentPage={currentPage}
							onChange={setCurrentPage}
							numberOfRows={value?.length || 0}
							pageSize={pageSize}
						/>
					)}
				</div>
			)}
		</div>
	)
}

import React, { useEffect, useState } from 'react'
import { TableType } from './Table.type'
import { TableStyle } from './Table.style'
import { NumberUtils } from '../../utils/NumberUtils'
import { Pagination } from './Pagination'
import { Icon } from '../Icon'
import { DivRow } from '../DivRow'

export const Table = ({ header, value, page }: TableType) => {
	const [sort, setSort] = useState<[string, 'ASC' | 'DESC'] | null>(null)
	const [currentPage, setCurrentPage] = useState<number>(0)
	const [pageSize, setPageSize] = useState<number>(8)

	const valueModifier = (field: string, value: any) => {
		const definition = header[field]
		if (definition.type === 'currency') {
			return NumberUtils.numberToCurrency(value)
		}
		return value
	}

	const sortedValue = value.sort((x, y) => {
		if (!sort) {
			return 0
		}
		const valueX = x?.[sort?.[0]] || ''
		const valueY = y?.[sort?.[0]] || ''

		if (valueX > valueY) return sort[1] === 'ASC' ? 1 : -1
		if (valueX < valueY) return sort[1] === 'ASC' ? -1 : 1
		return 0
	})

	const sliceOfValue = [...sortedValue].splice(currentPage * pageSize, pageSize)

	useEffect(() => {
		setSort([Object.keys(header)[0], 'ASC'])
	}, [])

	return (
		<TableStyle>
			<thead>
				<tr>
					{Object.keys(header)
						.filter((field) => header[field]?.show !== false)
						.map((field, fieldKey) => {
							return (
								<th
									key={fieldKey}
									data-alignment={header[field]?.alignment || 'left'}
									style={
										header[field]?.width
											? {
													width: header[field]?.width,
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
											{header[field].label}
										</a>
										{sort?.[0] === field && (
											<Icon
												icon={
													sort?.[1] === 'ASC'
														? 'arrow_downward_alt'
														: 'arrow_upward_alt'
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
									.filter((field) => header[field]?.show !== false)
									.map((field, fieldKey) => {
										return (
											<td
												key={fieldKey}
												data-alignment={header[field]?.alignment || 'left'}
											>
												{valueModifier(
													field,
													!header[field]?.valueModifier
														? row[field]
														: header[field]?.valueModifier?.(
																row,
																rowKey
														  )
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
			{sliceOfValue && sliceOfValue.length > 0 && (
				<tfoot>
					<tr data-not-found={true}>
						<th colSpan={Object.keys(header).length} className="pagination">
							<Pagination
								currentPage={currentPage}
								onChange={setCurrentPage}
								numberOfRows={value?.length || 0}
								pageSize={pageSize}
							/>
						</th>
					</tr>
				</tfoot>
			)}
		</TableStyle>
	)
}

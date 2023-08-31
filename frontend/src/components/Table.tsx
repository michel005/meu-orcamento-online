import React, { useState } from 'react'
import { TableType } from './Table.type'
import { TableStyle } from './Table.style'
import { NumberUtils } from '../utils/NumberUtils'

export const Table = ({ header, value }: TableType) => {
	const [showComplement, setShowComplement] = useState<number | null>(null)

	const valueModifier = (field: string, value: any) => {
		const definition = header[field]
		if (definition.type === 'currency') {
			return NumberUtils.numberToCurrency(value)
		}
		return value
	}

	return (
		<TableStyle>
			<thead>
				<tr>
					{Object.keys(header).map((field, fieldKey) => {
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
								{header[field].label}
							</th>
						)
					})}
				</tr>
			</thead>
			<tbody>
				{value &&
					value.map((row, rowKey) => {
						return (
							<tr
								key={rowKey}
								onDoubleClick={() => {
									setShowComplement((x) => {
										if (x !== null && x == rowKey) {
											return null
										} else {
											return rowKey
										}
									})
								}}
							>
								{Object.keys(header).map((field, fieldKey) => {
									return (
										<td
											key={fieldKey}
											data-alignment={header[field]?.alignment || 'left'}
										>
											{valueModifier(
												field,
												!header[field]?.valueModifier
													? row[field]
													: header[field]?.valueModifier?.(row)
											)}
										</td>
									)
								})}
							</tr>
						)
					})}
				{(!value || value.length === 0) && (
					<tr data-not-found={true}>
						<td colSpan={Object.keys(header).length}>Nenhum registro encontrado</td>
					</tr>
				)}
			</tbody>
		</TableStyle>
	)
}

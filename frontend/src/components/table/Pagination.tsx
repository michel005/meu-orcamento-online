import { PaginationStyle } from './Pagination.style'
import React from 'react'
import { PaginationType } from './Pagination.type'
import { Button } from '../button/Button'

export const Pagination = ({
	currentPage,
	onChange,
	pageSize = 10,
	numberOfRows,
}: PaginationType) => {
	const numberOfPages = Math.ceil(numberOfRows / pageSize)

	return (
		<PaginationStyle>
			<Button
				disabled={currentPage === 0}
				variation="ghost"
				leftIcon="chevron_left"
				onClick={() => {
					onChange(currentPage - 1)
				}}
			>
				Anterior
			</Button>
			<div className="pages">
				{new Array(numberOfPages).fill(null).map((_, index) => {
					return (
						<Button
							key={index}
							variation={currentPage === index ? 'secondary' : 'ghost'}
							onClick={() => {
								onChange(index)
							}}
						>
							{index + 1}
						</Button>
					)
				})}
			</div>
			<Button
				disabled={currentPage === numberOfPages - 1}
				variation="ghost"
				rightIcon="chevron_right"
				onClick={() => {
					onChange(currentPage + 1)
				}}
			>
				Próximo
			</Button>
		</PaginationStyle>
	)
}

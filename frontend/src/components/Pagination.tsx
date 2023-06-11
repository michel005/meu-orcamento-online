import React from 'react'
import style from './Pagination.module.scss'
import { Button } from './Button'

export type PaginationType = {
	currentPage: number
	setCurrentPage: (value: number) => void
	numberOfPages: number
	beginning: () => void
	next: () => void
	back: () => void
	end: () => void
}

export const Pagination = ({
	currentPage,
	setCurrentPage,
	numberOfPages,
	beginning,
	next,
	back,
	end,
}: PaginationType) => {
	return (
		<div className={style.pagination}>
			<Button
				variation="secondary"
				disabled={currentPage === 1}
				onClick={beginning}
				leftIcon="keyboard_double_arrow_left"
			/>
			<Button
				variation="secondary"
				disabled={currentPage === 1}
				onClick={back}
				leftIcon="chevron_left"
			/>
			{new Array(numberOfPages).fill(null).map((_, index) => {
				return (
					<Button
						key={index}
						variation={currentPage === index + 1 ? 'primary' : 'secondary'}
						onClick={() => {
							setCurrentPage(index + 1)
						}}
					>
						{index + 1}
					</Button>
				)
			})}
			<Button
				variation="secondary"
				disabled={currentPage === numberOfPages}
				onClick={next}
				leftIcon="chevron_right"
			/>
			<Button
				variation="secondary"
				disabled={currentPage === numberOfPages}
				onClick={end}
				leftIcon="keyboard_double_arrow_right"
			/>
		</div>
	)
}

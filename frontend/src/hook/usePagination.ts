import { useState } from 'react'

export type ErrorType = Map<string, string>

export function usePagination<T>(values: T[], paginationSize: number) {
	const [currentPage, setCurrentPage] = useState<number>(1)

	const roundDivision = (total: number, divisor: number) => {
		let x = total
		let count = 0
		while (x > 0) {
			x = x - divisor
			count++
		}
		return count
	}

	const numberOfPages = roundDivision(values.length, paginationSize)

	const result = values.slice(
		(currentPage - 1) * paginationSize,
		(currentPage - 1) * paginationSize + paginationSize
	)

	const beginning = () => {
		setCurrentPage(1)
	}

	const next = () => {
		setCurrentPage((x) => x + 1)
	}

	const back = () => {
		setCurrentPage((x) => x - 1)
	}

	const end = () => {
		setCurrentPage(numberOfPages)
	}

	return {
		currentPage,
		setCurrentPage,
		numberOfPages,
		beginning,
		next,
		back,
		end,
		result,
	}
}

import { useState } from 'react'

export const usePagination = ({ values, length }: { values: any[]; length: number }) => {
	const [current, setCurrent] = useState(0)

	const lastPage = Math.floor(values.length / length) + (values.length % length > 0 ? 1 : 0)

	return {
		goToFirst: () => {
			setCurrent(() => 0)
		},
		goToNext: () => {
			setCurrent((prevState) => {
				if (prevState < lastPage) {
					return prevState + 1
				} else {
					return prevState
				}
			})
		},
		goToPrevious: () => {
			setCurrent((prevState) => {
				if (prevState > 0) {
					return prevState - 1
				} else {
					return prevState
				}
			})
		},
		goToLast: () => {
			setCurrent(() => lastPage - 1)
		},
		goTo: (value: number) => {
			setCurrent((prevState) => {
				if (value >= 0 && value <= lastPage) {
					return value
				} else {
					return prevState
				}
			})
		},
		slice: values.slice(current * length, current * length + length),
		numberOfPages: lastPage,
		pageLength: length,
		currentPage: current,
	}
}

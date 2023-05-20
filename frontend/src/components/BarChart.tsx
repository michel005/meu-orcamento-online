import React from 'react'
import style from './BarChart.module.scss'
import { CSSProperties } from 'styled-components'

export type BarChartType = {
	data: [string, number][]
}

export const BarChart = ({ data }: BarChartType) => {
	const max = data.map((x) => x[1]).reduce((x, y) => (x > y ? x : y), 0)
	console.log({ max })

	return (
		<div className={style.barChart}>
			{data.map((value) => {
				const x = (value[1] * 100) / max

				return (
					<div className={style.barContent}>
						<div
							className={style.bar}
							style={{ '--value': x + '%' } as CSSProperties}
						/>
						<div className={style.label}>{value[0]}</div>
					</div>
				)
			})}
		</div>
	)
}

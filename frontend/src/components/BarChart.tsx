import React from 'react'
import style from './BarChart.module.scss'
import { CSSProperties } from 'styled-components'

export type BarChartType = {
	data: [any, number][]
	valueModifier?: (x: any) => any
}

export const BarChart = ({ data, valueModifier = (x: any) => x }: BarChartType) => {
	const max = data.map((x) => x[1]).reduce((x, y) => (x > y ? x : y), 0)

	return (
		<div className={style.barChart}>
			{data.map((value, valueKey) => {
				const x = (value[1] * 100) / max

				return (
					<div key={valueKey} className={style.barContent}>
						<div
							className={style.bar}
							style={{ '--value': x + '%' } as CSSProperties}
						></div>
						<span>{valueModifier(Math.round(value[1]))}</span>
						<div className={style.label}>{value[0]}</div>
					</div>
				)
			})}
		</div>
	)
}

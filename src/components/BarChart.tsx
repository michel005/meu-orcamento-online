import React, { CSSProperties } from 'react'
import style from './BarChart.module.scss'

export interface BarChartType {
	title: string
	values: [string, number][]
}

export const BarChart = ({ title, values }: BarChartType) => {
	const sumOfValues = (values || []).map((x) => x[1]).reduce((x, y) => (x > y ? x : y), 0)

	return (
		<div className={style.barChart}>
			<h3>{title}</h3>
			<div className={style.bars}>
				{(values || []).map((value, valueIndex) => (
					<>
						<div
							className={style.value}
							style={
								{
									'--value': `${(100 / sumOfValues) * value[1]}%`,
								} as CSSProperties
							}
						/>
						<div className={style.label}>{value[0]}</div>
					</>
				))}
			</div>
		</div>
	)
}

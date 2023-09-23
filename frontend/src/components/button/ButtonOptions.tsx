import style from './ButtonOptions.module.scss'
import { ButtonOptionsType } from './ButtonOptions.type'
import React from 'react'
import { Button } from './Button'

export const ButtonOptions = ({
	options,
	value,
	onChange,
	variation = 'primary',
}: ButtonOptionsType) => {
	const whatsTheVariation = (selected: boolean): 'primary' | 'secondary' | 'ghost' => {
		if (variation === 'primary') {
			if (selected) {
				return 'primary'
			} else {
				return 'secondary'
			}
		} else if (variation === 'secondary') {
			if (selected) {
				return 'secondary'
			} else {
				return 'ghost'
			}
		}
		return 'secondary'
	}

	return (
		<div className={style.tabs}>
			<section>
				{Object.keys(options)
					.filter((opt) => options[opt])
					.map((opt) => {
						return (
							<Button
								key={opt}
								variation={whatsTheVariation(value === opt)}
								onClick={() => {
									onChange?.(opt)
								}}
							>
								{options[opt]}
							</Button>
						)
					})}
			</section>
		</div>
	)
}

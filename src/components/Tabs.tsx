import React from 'react'
import style from './Tabs.module.scss'
import { Button } from './Button'
import { GoogleIconType } from '../types/GoogleIconType'

export const Tabs = ({
	value,
	onChange,
	options,
}: {
	value: string
	onChange: (prevValue: string) => void
	options: [
		string,
		{
			buttonText: string
			icon?: GoogleIconType
			bag?: any
			content?: any
		}
	][]
}) => {
	return (
		<>
			<div className={style.tabs}>
				{options
					.filter((optionInfo) => optionInfo)
					.map(([name, option]) => {
						return (
							<Button
								key={name}
								data-error={true}
								leftIcon={option.icon}
								variationOverride={value === name ? 'primary' : 'ghost'}
								onClick={() => {
									onChange(name)
								}}
								rightBag={option.bag}
							>
								{option.buttonText}
							</Button>
						)
					})}
			</div>
			{
				options.filter((optionInfo) => optionInfo).find((option) => option[0] === value)[1]
					?.content
			}
		</>
	)
}

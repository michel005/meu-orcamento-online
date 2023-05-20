import React, { useState } from 'react'
import style from './Accordion.module.scss'
import { Button } from './Button'

export type AccordionPanelType = {
	index: number
	name: string
	content: any
}

export type AccordionType = {
	panels: AccordionPanelType[]
	openMode?: 'all' | 'one'
}

export const Accordion = ({ panels, openMode = 'one' }: AccordionType) => {
	const [state, setState] = useState<boolean[]>([])

	return (
		<div className={style.accordion}>
			{panels.map((panel) => {
				return (
					<div className={style.panel} data-show={state?.[panel.index]}>
						<Button
							leftIcon="expand_more"
							onClick={() => {
								setState((s) => {
									let x = [...s]
									const futureValue = !x[panel.index]
									if (openMode === 'one') {
										x = []
									}
									x[panel.index] = futureValue
									return [...x]
								})
							}}
						>
							{panel.name}
						</Button>
						<div className={style.content}>{panel.content}</div>
					</div>
				)
			})}
		</div>
	)
}

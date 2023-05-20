import React from 'react'
import style from './Stepper.module.scss'
import { Button } from './Button'

type Step = {
	header: string
	name: string
	icon?: string
}

export type StepperType = {
	current?: number
	steps: Step[]
}

export const Stepper = ({ current = 0, steps = [] }: StepperType) => {
	return (
		<div className={style.stepper}>
			{steps.map((step, stepIndex) => {
				return (
					<div className={style.stepContainer} key={stepIndex}>
						{stepIndex > 0 && (
							<div
								data-active={current === stepIndex}
								data-done={current > stepIndex}
								className={style.line}
							/>
						)}
						<div
							data-active={current === stepIndex}
							data-done={current > stepIndex}
							className={style.step}
						>
							<Button leftIcon={current > stepIndex ? 'check' : step.icon} disabled>
								{current > stepIndex || step.icon ? null : stepIndex + 1}
							</Button>
							<div className={style.details}>
								<small>{step.header}</small>
								<p>{step.name}</p>
							</div>
						</div>
					</div>
				)
			})}
		</div>
	)
}

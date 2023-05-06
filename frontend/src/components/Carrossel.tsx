import React from 'react'
import styled from 'styled-components'
import { FlexColumn } from './FlexColumn'
import { FlexRow } from './FlexRow'
import { useState } from 'react'

export const CarrosselStyle = styled.div`
    --current: attr(data-current)
	display: flex;
	flex-direction: column;
	gap: 14px;

	.buttonContainer {
		justify-content: center;

		& > button {
			height: 50px;
		}
	}

	& > button {
		align-items: center;
	}

	& > .slideContainer {
		flex-grow: 1;
		overflow: hidden;
		position: relative;

		.allSlides {
			gap: 0;
			translate: calc(100% * -1 * var(--current)) 0;
			transition: all 0.25s;
		}

		.slide {
			min-width: 100%;
		}
	}

	.buttons {
		justify-content: center;
	}

	.steps {
		flex-wrap: wrap;
		gap: 7px;
		padding-inline: 14px;

		.step {
			background-color: #ddd;
			border-radius: 50%;
			color: #fff;
			cursor: pointer;
			font-size: 10px;
			font-weight: bold;
			height: 17px;
			margin-block: auto;
			padding: 2px;
			text-align: center;
			transition: all 0.25s;
			width: 17px;

			&:hover {
				background-color: #666;
			}

			&::before {
				display: block;
			}

			&[data-current='true'] {
				background-color: var(--active-color);
				color: #fff;
			}
		}
	}
`

export const Carrossel = ({ items = [] }: any) => {
	const [current, setCurrent] = useState(0)

	return (
		<CarrosselStyle>
			<FlexRow className="slideContainer" data-current={current}>
				<FlexRow className="allSlides">
					{items.map((item: any, itemKey: number) => {
						return (
							<FlexColumn className="slide" key={itemKey}>
								{item}
							</FlexColumn>
						)
					})}
				</FlexRow>
			</FlexRow>
			<FlexRow className="buttons">
				<button
					data-primary
					data-icon="navigate_before"
					disabled={current === 0}
					onClick={() => {
						setCurrent((x) => {
							return x === 0 ? items.length - 1 : x - 1
						})
					}}
				/>
				<FlexRow className="steps">
					{items.map((item: any, itemKey: number) => {
						return (
							<div
								key={itemKey}
								className="step"
								data-current={itemKey === current}
								data-icon={itemKey === 0 ? 'home' : ''}
								onClick={() => {
									setCurrent(itemKey)
								}}
							>
								{itemKey === 0 ? null : itemKey + 1}
							</div>
						)
					})}
				</FlexRow>
				<button
					data-primary
					data-icon="navigate_next"
					disabled={current === items.length - 1}
					onClick={() => {
						setCurrent((x) => {
							return x === items.length - 1 ? 0 : x + 1
						})
					}}
				/>
			</FlexRow>
		</CarrosselStyle>
	)
}

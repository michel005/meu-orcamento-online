import React from 'react'
import { useRef } from 'react'
import styled from 'styled-components'
import { InputAndButton } from './InputAndButton'

export const InputWithLabelStyle = styled.div`
	display: flex;
	flex-direction: column;
	font-weight: bold;
	gap: 4px;
	width: 100%;

	label {
		color: #666;
		font-size: 14px;
		margin-right: auto;
		transition: color 0.5s;

		&:hover {
			color: #333;
			cursor: pointer;
		}
	}

	input,
	textarea {
		flex-grow: 1;
		width: 100%;
	}

	&[data-type='checkbox'],
	&[data-type='radio'] {
		flex-direction: row;

		label {
			margin-right: 0;
		}

		input {
			width: auto;
		}
	}
`

export const InputWithLabel = ({
	inputProps,
	label = '',
	onChange = () => null,
	type = 'text',
	value = null,
	placeholder,
	leftButton,
	rightButton,
	...props
}: any) => {
	const ref = useRef<any>()

	return (
		<InputWithLabelStyle data-type={type} {...props}>
			{label && (
				<label
					onClick={() => {
						if (type === 'checkbox' || type === 'radio') {
							ref.current.click()
						} else {
							ref.current.focus()
						}
					}}
				>
					{label}
				</label>
			)}
			<InputAndButton>
				{leftButton && <div className="leftButtons">{leftButton}</div>}
				{type === 'area' ? (
					<textarea
						ref={ref}
						value={value || ''}
						placeholder={placeholder}
						onChange={(e) => onChange(e.target.value)}
						{...inputProps}
					/>
				) : (
					<input
						ref={ref}
						type={type}
						value={type === 'checkbox' || type === 'radio' ? undefined : value || ''}
						checked={type !== 'checkbox' && type !== 'radio' ? undefined : value || ''}
						placeholder={placeholder}
						onChange={(e) =>
							onChange(
								type === 'checkbox' || type === 'radio'
									? e.target.checked
									: e.target.value
							)
						}
					/>
				)}
				{rightButton && <div className="rightButtons">{rightButton}</div>}
			</InputAndButton>
		</InputWithLabelStyle>
	)
}

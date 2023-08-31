import React from 'react'
import { InputGroupStyle } from './InputGroup.style'
import { InputGroupType } from './InputGroup.type'

export const InputGroup = ({ title, subTitle, children }: InputGroupType) => {
	return (
		<InputGroupStyle>
			<header>
				<h3>{title}</h3>
				{subTitle && <p>{subTitle}</p>}
			</header>
			<section className="content">{children}</section>
		</InputGroupStyle>
	)
}

import React from 'react'
import { HeaderType } from './Header.type'
import { HeaderStyle } from './Header.style'

export const Header = ({ title, subTitle }: HeaderType) => {
	return (
		<HeaderStyle>
			<center>
				<h1>{title}</h1>
				{subTitle && <p>{subTitle}</p>}
			</center>
		</HeaderStyle>
	)
}

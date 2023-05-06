import React from 'react'
import styled from 'styled-components'

export const CardStyle = styled.div`
	background-color: #fff;
	box-shadow: #ccc 0 0 4px;
	display: flex;
	flex-direction: column;
	font-size: 14px;
	gap: 14px;
	padding: 14px;
	width: 250px;
	min-width: 250px;

	&:nth-child(1) {
		animation: card 0.3s linear;
	}

	&:nth-child(2) {
		animation: card 0.6s linear;
	}

	&:nth-child(3) {
		animation: card 0.9s linear;
	}

	@keyframes card {
		0% {
			opacity: 0;
			translate: -100px 0;
		}
	}
`

export const Card = ({ children }: any) => {
	return <CardStyle>{children}</CardStyle>
}

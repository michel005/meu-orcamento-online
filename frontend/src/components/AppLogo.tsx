import React from 'react'
import styled from 'styled-components'
import { RFLogo } from '../assets/RFLogo'
import { FlexColumn } from './FlexColumn'

export const AppLogoStyle = styled.div`
	display: flex;
	flex-direction: row;
	gap: 7px;

	svg {
		height: 40px;
		width: 40px;
	}

	.text {
		flex-grow: 1;
		gap: 0;
		white-space: nowrap;

		h3 {
			font-size: 20px;
			white-space: nowrap;

			span {
				color: var(--active-color);
				font-weight: bold;
				white-space: nowrap;
			}
		}

		small {
			color: #fffa;
			font-size: 12px;
		}
	}

	&[data-invert] {
		.text {
			filter: invert(1);

			span {
				color: var(--active-color);
				filter: invert(1);
			}

			small {
				filter: invert(1);
			}
		}
	}
`

export const AppLogo = ({ ...props }) => {
	return (
		<AppLogoStyle {...props}>
			<RFLogo />
			<FlexColumn className="text">
				<h3>
					Restaurante <span>Fácil</span>
				</h3>
				<small>Gerenciamento de Restaurantes</small>
			</FlexColumn>
		</AppLogoStyle>
	)
}

import React, { HTMLProps } from 'react'
import styled, { StyledComponent } from 'styled-components'

const FlexRowStyle = styled.div`
	align-items: flex-end;
	display: flex;
	flex-direction: row;
	gap: 14px;

	> hr {
		align-self: center;
		background-color: #fff2;
		flex-grow: 0;
		height: 100%;
		width: 1px;
	}

	> button {
		flex-grow: 1;
		justify-content: center !important;
	}
`

export const FlexRow = ({ ...props }) => {
	return <FlexRowStyle {...props} />
}

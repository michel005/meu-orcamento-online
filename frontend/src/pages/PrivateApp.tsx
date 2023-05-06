import React from 'react'
import styled from 'styled-components'
import { Sidebar } from '../components/Sidebar'

export const PrivateAppStyle = styled.div`
	background-color: var(--background-color);
	gap: 0 !important;
	height: 100%;
	left: 0;
	overflow-y: auto;
	position: fixed;
	top: 0;
	width: 100%;
`

export const PrivateApp = () => {
	return (
		<PrivateAppStyle>
			<Sidebar />
		</PrivateAppStyle>
	)
}

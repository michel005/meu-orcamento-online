import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import { Grid } from '../../components/Grid'
import { DragEventHandler } from 'react'
import { UserContext } from '../../context/UserContext'

export const DashboardPageStyle = styled.div`
	display: flex;
	flex-direction: column;
	gap: 7px;
	padding: 14px;
`
export const DashboardPage = () => {
	const { user } = useContext(UserContext)

	return (
		<DashboardPageStyle>
			<h1>Bem vindo, {user?.name.split(' ')[0]}</h1>
		</DashboardPageStyle>
	)
}

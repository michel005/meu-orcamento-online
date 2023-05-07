import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import { Grid } from '../../components/Grid'
import { DragEventHandler } from 'react'
import { UserContext } from '../../context/UserContext'
import { FlexRow } from '../../components/FlexRow'
import { Table } from '../../components/Table'

export const MenuBookPageStyle = styled.div`
	display: flex;
	flex-direction: column;
	gap: 7px;
	padding: 14px;
`
export const MenuBookPage = () => {
	const { user } = useContext(UserContext)

	return (
		<MenuBookPageStyle>
			<h1>Cardápio</h1>
			<FlexRow>
				<button data-primary>Nova Página</button>
			</FlexRow>
			<Table
				definition={[
					{
						name: 'page',
						header: 'Página',
					},
					{
						name: 'page',
						header: 'Página',
					},
				]}
				value={[
					{
						page: 'Capa',
					},
					{
						page: 'Promoções',
					},
					{
						page: 'Prato Feito',
					},
				]}
				onClick={() => null}
			/>
		</MenuBookPageStyle>
	)
}

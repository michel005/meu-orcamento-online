import styled from 'styled-components'

export type GridType = {
	columns?: number
	rows?: number
}

export const Grid = styled.div`
	display: grid;
	grid-template-columns: repeat(${(props: GridType) => props.columns || 2}, 1fr);
	grid-template-rows: repeat(${(props: GridType) => props.rows || 2}, 1fr);
	gap: 14px;
	position: relative;
`

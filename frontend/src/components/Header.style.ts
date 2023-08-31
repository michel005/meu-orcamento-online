import styled from 'styled-components'

export const HeaderStyle = styled.div`
	background-color: #f4f4f4;
	display: flex;
	flex-direction: row;
	justify-content: center;
	padding: 21px;

	center {
		display: flex;
		flex-direction: column;
		gap: 4px;
		max-width: var(--center-width);
		text-align: left;
		width: var(--center-width);
	}
`

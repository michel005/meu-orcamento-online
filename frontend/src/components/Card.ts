import styled from 'styled-components'

export const Card = styled.div`
	//border: 1px solid #ddd;
	box-shadow: #ddd 0 0 7px;
	border-radius: var(--border-radius);
	display: flex;
	flex-direction: column;
	gap: 14px;
	width: 100%;

	img {
		height: 100px;
		object-fit: cover;
		width: 100%;
	}

	p {
		flex-grow: 1;
	}
`

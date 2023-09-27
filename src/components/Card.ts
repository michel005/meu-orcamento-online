import styled from 'styled-components'

export const Card = styled.div`
	background-color: #fff;
	box-shadow: #ccc 0 0 7px;
	border-radius: var(--border-radius);
	display: flex;
	flex-direction: column;
	flex-grow: 1;
	gap: 14px;
	padding: 14px;
	width: 100%;

	h1,
	h2,
	h3,
	h4,
	h5 {
		font-weight: normal;
	}

	p {
		color: #aaa;
	}
`

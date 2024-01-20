import styled from 'styled-components'

export const Card = styled.div`
	@keyframes fadeOut {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	animation: fadeOut 0.25s linear;
	background-color: #fff;
	border: 1px solid #ccc;
	border-radius: var(--border-radius);
	display: flex;
	flex-direction: column;
	gap: 21px;
	min-width: 350px;
	padding: 21px;
	width: 350px;

	i {
		align-self: flex-start;
		border: 1px solid ${(props) => props.color || '#ccc'};
		color: ${(props) => props.color || '#666	'};
		font-size: 22px !important;
		padding: 10px;
	}

	h3 {
		font-size: 1.3em;
	}

	p {
		color: #aaa;
		flex-grow: 1;
		font-size: 16px;
		line-height: 1.3em;
	}
`

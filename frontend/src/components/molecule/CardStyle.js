import styled from 'styled-components'

export const CardStyle = styled.div`
	background-color: #fff;
	border: 1px solid transparent;
	box-shadow: #ccc 0 0 4px;
	border-radius: 14px;
	display: flex;
	flex-direction: column;
	gap: 10px;
	height: 100%;
	padding: 14px 21px;
	transition: all 0.5s;

	.header {
		color: #333;
		font-size: 20px;
		font-weight: bold;
		justify-content: flex-start;
		padding-top: 7px;
		transition: all 0.5s;

		&[data-has-click='false'] {
			pointer-events: none;
		}

		&[data-has-click='true'] {
			&::before {
				color: ${(props) => props.color || 'var(--ACTIVE_COLOR)'};
			}
		}
	}

	& > .content {
		display: flex;
		flex-direction: column;
		flex-grow: 1;
		gap: 7px;
		text-align: left;

		&::-webkit-scrollbar {
			width: 4px;
		}
	}

	&:hover {
		border-color: ${(props) => props.color || 'var(--ACTIVE_COLOR)'};
		box-shadow: ${(props) => props.color || 'var(--ACTIVE_COLOR)'} 0 0 4px;

		.header[data-has-click='true'] {
			color: ${(props) => props.color || 'var(--ACTIVE_COLOR)'};
		}
	}
`

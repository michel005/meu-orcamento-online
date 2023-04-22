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

	h2 {
		color: #333;
		font-size: 20px;
		padding-top: 7px;
		text-align: left;
		transition: all 0.5s;

		.icon {
			font-size: 20px;
			margin-right: 10px;
			translate: 0 3px;
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

		h2 {
			color: ${(props) => props.color || 'var(--ACTIVE_COLOR)'};
		}
	}
`

import styled from 'styled-components'

export const CardCollectionStyle = styled.div`
	display: flex;
	flex-direction: column;
	gap: 14px;
	z-index: 90;

	& > h1 {
		text-align: center;
	}

	p {
		color: #333;
		margin-inline: auto;
		margin-bottom: 14px;
	}

	li {
		color: #666;
		list-style: none;
		margin-left: 20px;
		position: relative;
		transition: all 0.25s;

		&:hover {
			color: #111;
			&::before {
				color: #111;
			}
		}

		&::before {
			color: #666;
			content: 'check';
			display: inline;
			font-family: 'Material Symbols Outlined';
			margin-right: -20px;
			position: absolute;
			top: 50%;
			left: -20px;
			translate: 0 -50%;
		}
	}

	& > .content {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 21px;
		margin: -21px;
		padding: 21px 35px;

		&::-webkit-scrollbar {
			width: 0;
			height: 0;
		}
	}

	&[data-box='true'] {
		background-color: #fff;
		box-shadow: #ccc 0 0 4px;
		border-radius: 7px;
		padding: 21px 14px;
		margin-inline: -14px;
	}

	@media (max-width: 1200px) {
		& > .content {
			display: flex;
			flex-direction: row;
			overflow-x: auto;
			scroll-snap-type: both mandatory;
			scroll-snap-points-x: repeat(300px);
			-webkit-overflow-scrolling: touch;

			& > div {
				align-items: center;
				min-width: 300px;
				scroll-snap-stop: normal;
				scroll-snap-align: center;
				width: 300px;
			}
		}

		&[data-box='true'] {
			box-shadow: none;
			border-radius: 0;
			padding: 21px 14px;
		}
	}

	@media (max-width: 700px) {
		& > .content {
		}
	}
`

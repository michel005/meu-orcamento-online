import styled from 'styled-components'

export const GalleryStyle = styled.div`
	display: flex;
	flex-direction: column;
	gap: 10px;
	position: relative;

	& > h1 {
		text-align: center;
	}

	& > .content {
		color: #555;
		display: flex;
		flex-direction: column;
		gap: 14px;
		text-align: center;
		max-width: 800px;
		margin-inline: auto;
	}

	& > .pictures {
		display: grid;
		gap: 35px;
		grid-template-columns: 1fr 1fr 1fr 1fr;
		margin-top: 21px;

		& > img {
			border-radius: 7px;
			box-shadow: #ccc 0 0 4px;
			height: 200px;
			object-fit: cover;
			transition: all 0.25s;
			width: 100%;
		}
	}

	@media (max-width: 1200px) {
		& > .pictures {
			grid-template-columns: 1fr 1fr 1fr;
		}
	}

	@media (max-width: 900px) {
		& > .pictures {
			grid-template-columns: 1fr 1fr;
		}
	}

	@media (max-width: 700px) {
		& > .pictures {
			grid-template-columns: 1fr;
		}
	}
`

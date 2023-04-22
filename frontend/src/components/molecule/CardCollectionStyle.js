import styled from 'styled-components'

export const CardCollectionStyle = styled.div`
	display: flex;
	flex-direction: column;
	gap: 14px;

	& > h1 {
		text-align: center;
	}

	& > p {
		color: #999;
		margin-inline: auto;
		margin-bottom: 14px;
		max-width: 1000px;
		text-align: center;
	}

	& > .content {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr 1fr;
		gap: 35px;
	}

	@media (max-width: 1200px) {
		& > .content {
			grid-template-columns: 1fr 1fr;
		}
	}

	@media (max-width: 700px) {
		& > .content {
			grid-template-columns: 1fr;
		}
	}
`

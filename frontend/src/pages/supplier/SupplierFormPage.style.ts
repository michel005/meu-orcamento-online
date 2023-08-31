import styled from 'styled-components'

export const SupplierFormPageStyle = styled.div`
	display: flex;
	flex-direction: column;
	gap: 21px;

	.supplierInfo {
		gap: 14px;
		margin: -14px -14px 0;
		overflow: hidden;
		padding: 21px;
		position: relative;

		&::before {
			background: linear-gradient(90deg, #eee, transparent);
			content: '';
			height: 100%;
			inset-block-start: 0;
			inset-inline-start: 0;
			position: absolute;
			width: 100%;
			z-index: 1;
		}

		&::after {
			background-image: var(--base64);
			background-position: center;
			background-size: 100% auto;
			filter: blur(10px);
			content: '';
			height: 100%;
			inset-block-start: 0;
			inset-inline-start: 0;
			opacity: 0.5;
			position: absolute;
			width: 100%;
		}

		& > * {
			z-index: 2;
		}

		& > div {
			gap: 4px;
		}

		img,
		.pictureFallback {
			background-color: #ccc;
			border-radius: var(--border-radius);
			box-shadow: #999 0 0 10px;
			height: 100px;
			object-fit: cover;
			width: 100px;
		}

		h1,
		p {
			text-align: left;
		}
	}
`

import styled from 'styled-components'

export const ProductFormPageStyle = styled.div`
	display: flex;
	flex-direction: column;
	gap: 14px;

	.supplierInfo {
		img {
			border-radius: var(--border-radius);
			box-shadow: #aaa 0 0 4px;
			height: 100px;
			object-fit: cover;
			width: 100px;
		}
	}
`

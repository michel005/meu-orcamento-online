import React from 'react'
import styled from 'styled-components'
import { Grid } from './Grid'

export type GalleryType = {
	bigImage?: string
	images?: string[]
	inverted?: boolean
}

export const GalleryStyle = styled.div`
	display: flex;
	flex-direction: row;
	gap: 14px;
	width: 972px;

	&[data-inverted='true'] {
		flex-direction: row-reverse;
	}

	.bigImage {
		flex-grow: 1;
	}

	.grid {
		img {
			height: 100%;
			max-height: 200px;
			width: 100%;
			max-width: 100%;
		}
	}

	@media (max-width: 1000px) {
		display: flex;
		flex-direction: column;
		width: auto;
		max-width: 100%;

		&[data-inverted='true'] {
			flex-direction: column;
		}

		.grid {
			width: 100%;
			max-width: 100%;
		}
	}
`

export const Gallery = ({ bigImage, images = [], inverted = false }: GalleryType) => {
	return (
		<GalleryStyle data-inverted={inverted}>
			<img className="bigImage" alt="" src={bigImage} data-grow />
			<Grid className="grid" columns={2} rows={2} data-grow>
				{images.map((image, imageKey) => {
					return <img key={imageKey} alt="" src={image} data-grow />
				})}
			</Grid>
		</GalleryStyle>
	)
}

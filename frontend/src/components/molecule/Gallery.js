import { GalleryStyle } from './GalleryStyle'

export const Gallery = ({ header, content, photos = [] }) => {
	return (
		<GalleryStyle>
			<h1>{header}</h1>
			<div className="content">{content}</div>
			<div className="pictures">
				{photos.map((photo, photoKey) => {
					return <img key={photoKey} src={photo} alt={photo} />
				})}
			</div>
		</GalleryStyle>
	)
}

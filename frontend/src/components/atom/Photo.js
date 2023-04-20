import styled from 'styled-components'

const PhotoStyle = styled.img`
	background-color: #ccc;
	border-radius: 14px;
	box-shadow: #333 0 0 4px;
	object-fit: cover;
	width: 100%;
`

export const Photo = ({ src, ...props }) => {
	return <PhotoStyle src={src} {...props} />
}

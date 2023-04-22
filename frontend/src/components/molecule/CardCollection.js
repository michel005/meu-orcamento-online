import { CardCollectionStyle } from './CardCollectionStyle'

export const CardCollection = ({ header, description, children }) => {
	return (
		<CardCollectionStyle>
			<h1>{header}</h1>
			<p>{description}</p>
			<div className="content">{children}</div>
		</CardCollectionStyle>
	)
}

import { CardStyle } from './CardStyle'

export const Card = ({ icon = 'person', header, color, expanded = false, children }) => {
	return (
		<CardStyle color={color} data-only-content={expanded}>
			<h2>
				{icon && <span className="icon">{icon}</span>}
				{header}
			</h2>
			<hr />
			<div className="content">{children}</div>
		</CardStyle>
	)
}

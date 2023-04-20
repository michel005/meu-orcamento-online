import { FooterStyle } from './FooterStyle'

export const Footer = ({ appInformation, columns = [] }) => {
	return (
		<FooterStyle numberOfColumns={columns.length}>
			<div className="centeredFooter">
				<div className="appInformation">{appInformation}</div>
				{columns.map((topic, topicKey) => {
					return (
						<div className="topic" key={topicKey}>
							<h3>{topic.header}</h3>
							<div className="items">{topic.items}</div>
						</div>
					)
				})}
			</div>
		</FooterStyle>
	)
}

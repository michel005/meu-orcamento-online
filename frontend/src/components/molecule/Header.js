import { HeaderStyle } from './HeaderStyle'

export const Header = ({ nameLogo, children, ...props }) => {
	return (
		<HeaderStyle {...props}>
			<div className="centered">
				<div className="nameLogo">{nameLogo}</div>
				<div className="rightContent">{children}</div>
			</div>
		</HeaderStyle>
	)
}

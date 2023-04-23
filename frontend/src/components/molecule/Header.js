import { ConfigContext } from 'hook'
import { useContext } from 'react'
import { HeaderStyle } from './HeaderStyle'

export const Header = ({ nameLogo, children, ...props }) => {
	const { showMenu, setShowMenu } = useContext(ConfigContext)

	return (
		<HeaderStyle {...props}>
			<div className="centered">
				<div className="nameLogo">{nameLogo}</div>
				<div className="rightContent" data-show={showMenu}>
					{children}
				</div>
				<div className="buttonContainer">
					<button
						className="menuButton"
						data-icon="menu"
						data-link
						onClick={() => setShowMenu((x) => !x)}
					/>
				</div>
			</div>
		</HeaderStyle>
	)
}

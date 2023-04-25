import { useNavigate } from 'react-router-dom'
import { AppLogoStyle } from './AppLogoStyle'

export const AppLogo = ({ name, description, logo, enableClick = false }) => {
	const navigate = useNavigate()

	return (
		<AppLogoStyle
			onClick={
				enableClick
					? () => {
							navigate('/')
					  }
					: null
			}
			data-enable-click={enableClick}
		>
			<img src={logo} alt="Logotipo do Restaurante Fácil" />
			<div className="appName">
				{name && (
					<span className="name">
						{name.split(' ')[0]} <span className="accent">{name.split(' ')[1]}</span>
					</span>
				)}
				<span className="description">{description}</span>
			</div>
		</AppLogoStyle>
	)
}

import { AppLogo } from 'components/molecule'
import { Header } from 'components/molecule/Header'
import { PROJECT_INFO } from 'config/ProjectInfo'
import { ConfigContext } from 'hook'
import { useContext } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

export const LandingPageHeader = ({ fixed }) => {
	const { setShowMenu } = useContext(ConfigContext)
	const navigate = useNavigate()

	return (
		<Header
			nameLogo={
				<AppLogo
					name={PROJECT_INFO.name}
					description={PROJECT_INFO.description}
					logo={PROJECT_INFO.logo}
					enableClick={true}
				/>
			}
			data-fixed={fixed}
		>
			<NavLink onClick={() => setShowMenu(false)} to="/">
				Início
			</NavLink>
			<NavLink onClick={() => setShowMenu(false)} to="/plans">
				Planos
			</NavLink>
			<NavLink onClick={() => setShowMenu(false)} to="/contact">
				Contato
			</NavLink>
			<NavLink onClick={() => setShowMenu(false)} to="/help">
				Ajuda
			</NavLink>
			<button
				onClick={() => {
					navigate('/login')
					setShowMenu(false)
				}}
				data-icon="person"
			>
				Entrar / Cadastrar-se
			</button>
		</Header>
	)
}

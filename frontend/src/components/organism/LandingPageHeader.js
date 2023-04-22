import { AppLogo } from 'components/molecule'
import { Header } from 'components/molecule/Header'
import { PROJECT_INFO } from 'config/ProjectInfo'
import { NavLink } from 'react-router-dom'

export const LandingPageHeader = ({ fixed }) => {
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
			<NavLink to="/">Início</NavLink>
			<NavLink to="/plans">Planos</NavLink>
			<NavLink to="/contact">Contato</NavLink>
			<NavLink className="button" to="/sign-in">
				Entrar / Cadastrar-se
			</NavLink>
		</Header>
	)
}

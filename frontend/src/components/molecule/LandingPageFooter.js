import { AppLogo } from 'components/atom/AppLogo'
import { Footer } from 'components/atom/Footer'
import { PROJECT_INFO } from 'config/ProjectInfo'
import { NavLink } from 'react-router-dom'

export const LandingPageFooter = () => {
	return (
		<Footer
			appInformation={
				<>
					<AppLogo logo={PROJECT_INFO.logo} name={PROJECT_INFO.name} />
					<p>
						Magna tempor aliquip exercitation cupidatat laborum dolor nisi aliqua laboris consequat
						qui excepteur. Pariatur qui ut in aute consectetur. Occaecat aliqua quis nulla sit nisi
						occaecat commodo. Exercitation ex culpa nulla incididunt laboris pariatur commodo
						excepteur nulla mollit sunt tempor deserunt exercitation.
					</p>
				</>
			}
			columns={[
				{
					header: 'PRODUTO',
					items: (
						<>
							<NavLink>Utilização geral</NavLink>
							<NavLink>Planos de assinatura</NavLink>
							<NavLink>Termo de uso</NavLink>
						</>
					),
				},
				{
					header: 'ENGAJAMENTO',
					items: (
						<>
							<NavLink>Nos divulgue</NavLink>
							<NavLink>Nossas redes sociais</NavLink>
							<NavLink>Assistir vídeos relacionados</NavLink>
						</>
					),
				},
				{
					header: 'SUPORTE',
					items: (
						<>
							<NavLink>Comunidade</NavLink>
							<NavLink>Contato</NavLink>
							<NavLink>Problemas comuns</NavLink>
							<NavLink>Reportar problema</NavLink>
							<NavLink>Tipos de problema</NavLink>
						</>
					),
				},
			]}
		/>
	)
}

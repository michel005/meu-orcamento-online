import { AppLogo, Footer } from 'components/molecule'
import { PROJECT_INFO } from 'config/ProjectInfo'
import { NavLink } from 'react-router-dom'

export const LandingPageFooter = () => {
	return (
		<Footer
			appInformation={
				<>
					<AppLogo logo={PROJECT_INFO.logo} name={PROJECT_INFO.name} />
					<p>
						{PROJECT_INFO.name} é uma marca registrada e tem todos os direitos reservados. Somos uma
						empresa residente no endereço Rua Vitor do Amaral, 1062, apto 505B, Maringá, Paraná,
						Brasil.
					</p>
					<p>Todos os direitos reservados. 2023.</p>
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

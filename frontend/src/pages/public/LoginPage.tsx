import React from 'react'
import { TokenResponse, useGoogleLogin } from '@react-oauth/google'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { UserContext } from '../../context/UserContext'
import { useForm } from '../../hook/useForm'
import { FlexColumn } from '../../components/FlexColumn'
import { FlexRow } from '../../components/FlexRow'
import { GoogleUser } from '../../types/GoogleUser'

export const LoginPageStyle = styled.div`
	display: flex;
	flex-direction: row;
	gap: 14px;
	margin-inline: auto;
	max-width: 1000px;
	padding-block: 21px;

	.leftImage {
		object-fit: cover;
		object-position: center;
		height: 400px;
		min-width: 393px;
	}

	.loginForm {
		min-width: 393px;
	}

	@media (max-width: 1000px) {
		flex-direction: column;

		.leftImage {
			height: 100px;
		}

		button {
			justify-content: center;
		}
	}
`

export const LoginPage = () => {
	const { setUser } = useContext(UserContext)
	const navigate = useNavigate()

	const { fields } = useForm({
		definition: {
			email: {
				label: 'E-mail',
				placeholder: 'Informe um endereço de e-mail',
				rightButton: <button data-icon="mail" style={{ pointerEvents: 'none' }} />,
			},
			password: {
				label: 'Senha de Acesso',
				type: 'password',
				rightButton: <button data-icon="password" style={{ pointerEvents: 'none' }} />,
			},
		},
	})

	const login = useGoogleLogin({
		onSuccess: (response: TokenResponse) => {
			setUser(response)
		},
		onError: (error) => console.log('Login Failed:', error),
	})

	return (
		<LoginPageStyle>
			<img
				data-grow
				className="leftImage"
				src="https://i.pinimg.com/564x/08/96/c9/0896c9b00e90d092dc11756c65761ab5.jpg"
			/>
			<FlexColumn className="loginForm" data-grow>
				<h1>Entrar com a sua conta</h1>
				<FlexColumn>
					{fields.email}
					{fields.password}
				</FlexColumn>
				<FlexRow style={{ justifyContent: 'flex-end' }}>
					<button data-link>Esqueci minha senha</button>
					<div data-grow />
					<button data-primary data-icon="login">
						Entrar
					</button>
				</FlexRow>
				<hr />
				<button data-secondary data-center onClick={() => login()}>
					<img
						src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/1920px-Google_%22G%22_Logo.svg.png"
						width="15px"
					/>
					Entrar com Google
				</button>
				<button data-secondary data-center>
					<img
						src="https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg"
						width="15px"
					/>
					Entrar com Microsoft
				</button>
			</FlexColumn>
		</LoginPageStyle>
	)
}

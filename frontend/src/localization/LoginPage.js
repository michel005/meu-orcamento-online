import { Field } from 'components/molecule/Field'

export const LOGIN = (events) => [
	{
		type: 'left_block',
		content: (
			<>
				<h1>Acesse sua conta</h1>
				<p>
					Utilize seu e-mail e senha para acessar sua conta. Caso ainda não tenha uma, clique em
					"Cadastrar-se" e crie uma conta em poucos minutos.
				</p>
				<Field label="Nome do usuário" placeholder="Ex: joaosilva@email.com" />
				<Field label="Senha" type="password" />
				<div>
					<button onClick={events?.forgotPassword} data-link data-icon="password">
						Esqueci minha senha
					</button>
				</div>
				<button onClick={events?.signIn} data-icon="login">
					Entrar
				</button>
				<button onClick={events?.createAccount} data-icon="person_add" data-secondary>
					Cadastrar-se
				</button>
			</>
		),
		photo: 'https://i.pinimg.com/564x/93/eb/e5/93ebe54c78eaff725a2280c7dd2fce17.jpg',
	},
]

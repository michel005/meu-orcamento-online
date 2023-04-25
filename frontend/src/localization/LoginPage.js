import { ButtonsGroup } from 'components/molecule/ButtonsGroup'
import { Field } from 'components/molecule/Field'
import { FieldStyle } from 'components/molecule/FieldStyle'
import { LineWithText } from 'components/molecule/LineWithText'

export const LOGIN = (events) => [
	{
		type: 'left_block',
		variation: 'modal',
		content: (
			<>
				<h1>Acesse sua conta</h1>
				<ButtonsGroup>
					<button
						data-icon-image
						data-secondary
						style={{
							'--data-icon-image':
								'url(https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/1176px-Google_%22G%22_Logo.svg.png?20230305195327)',
						}}
					>
						Google
					</button>
					<button
						data-icon-image
						data-secondary
						style={{
							'--data-icon-image':
								'url(https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/2021_Facebook_icon.svg/2048px-2021_Facebook_icon.svg.png)',
						}}
					>
						Facebook
					</button>
				</ButtonsGroup>
				<LineWithText text="ou" />
				{events?.showPassword ? (
					<>
						<FieldStyle>
							<label>E-mail</label>
							<div className="value">{events.email}</div>
						</FieldStyle>
						<Field
							label="Senha de Acesso"
							value={events.password}
							onChange={events.onPasswordChange}
						/>
					</>
				) : (
					<Field
						label="E-mail"
						placeholder="Ex: joaosilva@email.com"
						value={events.email}
						onChange={events.onEmailChange}
					/>
				)}
				<ButtonsGroup>
					{events?.showPassword && (
						<button onClick={events?.back} data-secondary data-icon="arrow_left">
							Voltar
						</button>
					)}
					<button onClick={events?.signIn} data-icon-right="arrow_right" disabled={!events.email}>
						Próximo
					</button>
				</ButtonsGroup>
			</>
		),
		photo: 'https://i.pinimg.com/564x/93/eb/e5/93ebe54c78eaff725a2280c7dd2fce17.jpg',
	},
]

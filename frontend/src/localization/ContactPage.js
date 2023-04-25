import { ButtonsGroup } from 'components/molecule/ButtonsGroup'
import { Field } from 'components/molecule/Field'
import { LineWithText } from 'components/molecule/LineWithText'

export const CONTACT_PAGE = (event) => [
	{
		type: 'left_block',
		variation: 'modal',
		content: (
			<>
				<h1>Estamos sempre dispostos a te ajudar</h1>
				<p>
					Conte com um time de suporte de primeira e saiba como configurar nosso produto, solucionar
					problemas e encaixar nossa solução em seu modelo de negócio.
				</p>
				<span>
					<b>E-mail:</b> mdgrigoli@hotmail.com.br
				</span>
				<span>
					<b>Telefone:</b> (44) 99129-9291
				</span>
				<LineWithText text="ou" />
				<h1>Requisitar contato</h1>
				<p>
					Aqui você requisita que alguém do nosso time entre em contato para responder alguma dúvida
					ou reclamação.
				</p>
				<Field label="E-mail" value={event?.email} onChange={event?.onEmailChange} />
				<Field label="Assunto" value={event?.submit} onChange={event?.onSubmitChange} />
				<Field
					label="Mensagem"
					type="area"
					value={event?.message}
					onChange={event?.onMessageChange}
					letterLimit={3000}
					placeholder="Descreva aqui detalhadamente o que você precisa..."
				/>
				<ButtonsGroup>
					<button data-icon="send" onClick={event?.button}>
						Enviar
					</button>
				</ButtonsGroup>
			</>
		),
		photo: 'https://i.pinimg.com/564x/7a/2b/f7/7a2bf7f79e2ef551a0b97c81d22392b9.jpg',
	},
]

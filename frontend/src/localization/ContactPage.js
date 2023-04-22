export const CONTACT_PAGE = (event) => [
	{
		type: 'left_block',
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
				<div>
					<button onClick={event?.button}>Entrar em contato</button>
				</div>
			</>
		),
		photo: 'https://i.pinimg.com/564x/7a/2b/f7/7a2bf7f79e2ef551a0b97c81d22392b9.jpg',
	},
]

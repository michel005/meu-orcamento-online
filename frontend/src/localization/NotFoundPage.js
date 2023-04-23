export const NOT_FOUND = () => [
	{
		type: 'left_block',
		variation: 'modal',
		content: (
			<>
				<h1>Página não encontrada</h1>
				<p>
					Sentimos muito mas a página que você tentou acessar esta indisponível e esses podem ser um
					dos motivos:
				</p>
				<ul>
					<li>A página não existe</li>
					<li>Nosso site esta com problemas técnicos</li>
					<li>O endereço foi digitado incorretamente</li>
				</ul>
				<hr />
				<div>
					<button data-icon="refresh" onClick={() => window.location.reload()}>
						Tentar novamente
					</button>
				</div>
			</>
		),
		photo: 'https://i.pinimg.com/564x/4c/42/f8/4c42f8a5a880db761d35821c6bdedb6e.jpg',
	},
]

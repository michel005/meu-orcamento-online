export const PLAN_PAGE = (events) => [
	{
		type: 'card_collection',
		header: 'Planos especiais para o seu modelo de negócio',
		description: 'Escolha o plano que mais se aplica as necessidades do seu negócio.',
		cards: [
			{
				header: 'Pequenos Negócios',
				icon: 'store',
				color: '#111c',
				photo:
					'https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/73105c63608955.5ab63a2a68f62.jpg',
				content: (
					<>
						<p>Para você que esta começando seu próprio negócio.</p>
						<ul>
							<li>Até 5 garçons</li>
							<li>1 terminal de pagamento</li>
							<li>10 terminais de cardápio</li>
							<li>Suporte de segunda a sexta das 8h as 18h</li>
						</ul>
						<div style={{ flexGrow: 1, minHeight: '20px' }} />
						{!!events?.plan1 && (
							<button data-icon="add" data-secondary onClick={events?.plan1}>
								Saiba Mais
							</button>
						)}
					</>
				),
			},
			{
				header: 'Restaurante Médio',
				color: '#111c',
				icon: 'local_convenience_store',
				photo:
					'https://www.arlingtonmagazine.com/content/uploads/2017/07/medium-rare-bar-1024x683.jpg',
				content: (
					<>
						<p>Já esta a um certo tempo no mercado e esta pensando em expandir futuramente.</p>
						<ul>
							<li>Até 5 garçons</li>
							<li>2 terminais de pagamento</li>
							<li>15 terminais de cardápio</li>
							<li>Avaliação de clientes</li>
							<li>Integração com APPs de delivery</li>
							<li>Suporte de segunda a sexta das 8h as 18h</li>
						</ul>
						<div style={{ flexGrow: 1, minHeight: '20px' }} />
						{events?.plan2 && (
							<button data-icon="add" data-secondary onClick={events?.plan2}>
								Saiba Mais
							</button>
						)}
					</>
				),
			},
			{
				header: 'Restaurante Grande',
				color: '#111c',
				icon: 'add_business',
				photo:
					'https://cdn.vox-cdn.com/thumbor/cqX_k4l4yhFwo7lFN7zVRix3SPA=/0x0:1499x1000/1200x675/filters:focal(631x381:869x619)/cdn.vox-cdn.com/uploads/chorus_image/image/71926965/JakobLayman.0323.Loreto_352.14.jpg',
				content: (
					<>
						<p>Atende a cidade toda ou uma grande localidade com mais de uma filial.</p>
						<ul>
							<li>Até 20 garçons</li>
							<li>7 terminais de pagamento</li>
							<li>50 terminais de cardápio</li>
							<li>Avaliação de clientes</li>
							<li>Integração com APPs de delivery</li>
							<li>Relatórios financeiros</li>
							<li>Suporte 24 horas</li>
						</ul>
						<div style={{ flexGrow: 1, minHeight: '20px' }} />
						{events?.plan3 && (
							<button data-icon="add" data-secondary onClick={events?.plan3}>
								Saiba Mais
							</button>
						)}
					</>
				),
			},
			{
				header: 'Personalizado',
				color: '#111c',
				icon: 'support_agent',
				content: (
					<>
						<p>
							Não encontrou o plano ideal para o seu modelo de negócio? Solicite um orçamento
							personalizado para o nosso time de especialistas.
						</p>
						<div style={{ flexGrow: 1, minHeight: '20px' }} />
						<button data-icon="chat" data-secondary>
							Solicitar Orçamento
						</button>
					</>
				),
			},
		],
	},
]

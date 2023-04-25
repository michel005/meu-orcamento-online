import { PROJECT_INFO } from 'config/ProjectInfo'

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
							<li>Até 5 terminais de garçom</li>
							<li>1 terminal de pagamento</li>
							<li>10 terminais de cardápio</li>
							<li>Suporte de segunda a sexta das 8h as 18h</li>
						</ul>
						{!!events?.plan1 && (
							<>
								<div style={{ flexGrow: 1, minHeight: '20px' }} />
								<button data-icon="add" data-secondary onClick={events?.plan1}>
									Saiba Mais
								</button>
							</>
						)}
					</>
				),
				details: (
					<>
						<p>
							No começo tudo fica mais difícil, controlar o estoque, atrair clientes, atender a
							demanda dos seus clientes, e ainda por cima a demora para se obter um retorno
							financeiro. Por isso com o plano para pequenos negócios, você consegue controlar o
							básico do seu restaurante por um preço acessível.
						</p>
						Funcionalidades disponíveis:
						<ul>
							<li>Até 5 terminais de garçom</li>
							<li>1 terminal de pagamento</li>
							<li>10 terminais de cardápio</li>
							<li>Suporte de segunda a sexta das 8h as 18h</li>
						</ul>
					</>
				),
				otherDetails: [
					{
						type: 'left_block',
						content: (
							<>
								<h1>Inicie seu negócio com modernidade</h1>
								<p>
									Não precisa mais se preocupar em imprimir cardápios ou fazer com que seus
									funcionários decorem o prato do dia. Tudo isso fica guardado em nosso cardápio
									online.
								</p>
								<p>
									Além disso seus funcionários vão controlar todos os pedidos através de qualquer
									dispositivo com acesso a internet, é só conectar e usar, sei baixar aplicativos ou
									instalar programas complexos de configurar.
								</p>
							</>
						),
						photo: 'https://i.pinimg.com/564x/cd/ba/9e/cdba9e06b3242d1de641bd8f6ba2d551.jpg',
					},
				],
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
							<li>Até 5 terminais de garçom</li>
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
				details: (
					<>
						<p>
							Você ja esta a alguns anos no ramo, e esta procurando dar uma guinada no seu
							restaurante, certo? Pois bem, o {PROJECT_INFO.name} esta aqui para te ajudar a
							alcançar esse objetivo.
						</p>
						<p>Com esse plano você consegue:</p>
						<ul>
							<li>Até 5 terminais de garçom</li>
							<li>2 terminais de pagamento</li>
							<li>15 terminais de cardápio</li>
							<li>Avaliação de clientes</li>
							<li>Integração com APPs de delivery</li>
							<li>Suporte de segunda a sexta das 8h as 18h</li>
						</ul>
					</>
				),
				otherDetails: [
					{
						type: 'header_and_content',
						header: 'Integre com os APPs de delivery mais conhecidos',
						description: (
							<>
								<p>
									Quer fornecer seus produtos com comodidade para seus clientes? Utilize nossa
									integração com os principais APPs de delivery de comida como iFood, Uber Eats,
									etc.
								</p>
								<p>
									Quando alguém realiza um pedido, você ja recebe instantaneamente uma mensagem em
									seu terminal de atendimento.
								</p>
							</>
						),
					},
					{
						type: 'left_block',
						content: (
							<>
								<h1>Conduza seu negócio com modernidade</h1>
								<p>
									Não precisa mais se preocupar em imprimir cardápios ou fazer com que seus
									funcionários decorem o prato do dia. Tudo isso fica guardado em nosso cardápio
									online.
								</p>
								<p>
									Além disso seus funcionários vão controlar todos os pedidos através de qualquer
									dispositivo com acesso a internet, é só conectar e usar, sei baixar aplicativos ou
									instalar programas complexos de configurar.
								</p>
							</>
						),
						photo: 'https://i.pinimg.com/564x/93/af/e1/93afe1f226babad430bcda09e1c8e7f1.jpg',
					},
					{
						type: 'right_block',
						content: (
							<>
								<h1>Mantenha seus clientes mais perto</h1>
								<p>
									Você tera em suas mãos uma ferramenta para conduzir pesquisas de satisfação com o
									seu cliente, assim você cresce o seu negócio e passa a ter um cliente muito mais
									satisfeito.
								</p>
								<p>
									<b>Tem clientes que sempre voltam ao seu estabelecimento?</b> Crie um cadastro com
									um cartão fidelidade. Defina uma quantidade de visitas e seu cliente pode ganhar
									descontos ou prêmios por frequência.
								</p>
								<p>
									Lembre-se que um cliente satisfeito faz a divulgação do seu estabelecimento para
									amigos, familia, conhecidos, etc.
								</p>
							</>
						),
						photo: 'https://i.pinimg.com/564x/01/3d/36/013d36bc7503f519e304af956e031a46.jpg',
					},
				],
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
							<li>Até 20 terminais de garçom</li>
							<li>7 terminais de pagamento</li>
							<li>50 terminais de cardápio</li>
							<li>Avaliação de clientes</li>
							<li>Integração com APPs de delivery</li>
							<li>Relatórios financeiros</li>
							<li>Chat interno para comunicação intra filiais</li>
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
				details: (
					<>
						<p>
							Seu negócio é muito conhecido e você precisa de um sistema de confiança para te fazer
							expandir cada vez mais. Aqui você tem a total liberdade de expandir seu negócio da
							forma com o que desejar, e tem a nossa total atenção com um time de especialistas no
							ramo de restaurantes.
						</p>
						<p>Com esse plano você consegue:</p>
						<ul>
							<li>Até 20 terminais de garçom</li>
							<li>7 terminais de pagamento</li>
							<li>50 terminais de cardápio</li>
							<li>Avaliação de clientes</li>
							<li>Integração com APPs de delivery</li>
							<li>Relatórios financeiros</li>
							<li>Chat interno para comunicação intra filiais</li>
							<li>Suporte 24 horas</li>
						</ul>
					</>
				),
				otherDetails: [
					{
						type: 'left_block',
						content: (
							<>
								<h1>Conduza seu negócio com modernidade</h1>
								<p>
									Não precisa mais se preocupar em imprimir cardápios ou fazer com que seus
									funcionários decorem o prato do dia. Tudo isso fica guardado em nosso cardápio
									online.
								</p>
								<p>
									Além disso seus funcionários vão controlar todos os pedidos através de qualquer
									dispositivo com acesso a internet, é só conectar e usar, sei baixar aplicativos ou
									instalar programas complexos de configurar.
								</p>
							</>
						),
						photo: 'https://i.pinimg.com/564x/93/af/e1/93afe1f226babad430bcda09e1c8e7f1.jpg',
					},
					{
						type: 'header_and_content',
						header: 'Integre com os APPs de delivery mais conhecidos',
						description: (
							<>
								<p>
									Quer fornecer seus produtos com comodidade para seus clientes? Utilize nossa
									integração com os principais APPs de delivery de comida como iFood, Uber Eats,
									etc.
								</p>
								<p>
									Quando alguém realiza um pedido, você ja recebe instantaneamente uma mensagem em
									seu terminal de atendimento.
								</p>
							</>
						),
					},
					{
						type: 'right_block',
						content: (
							<>
								<h1>Mantenha seus clientes mais perto</h1>
								<p>
									Você tera em suas mãos uma ferramenta para conduzir pesquisas de satisfação com o
									seu cliente, assim você cresce o seu negócio e passa a ter um cliente muito mais
									satisfeito.
								</p>
								<p>
									<b>Tem clientes que sempre voltam ao seu estabelecimento?</b> Crie um cadastro com
									um cartão fidelidade. Defina uma quantidade de visitas e seu cliente pode ganhar
									descontos ou prêmios por frequência.
								</p>
								<p>
									Lembre-se que um cliente satisfeito faz a divulgação do seu estabelecimento para
									amigos, familia, conhecidos, etc.
								</p>
							</>
						),
						photo: 'https://i.pinimg.com/564x/01/3d/36/013d36bc7503f519e304af956e031a46.jpg',
					},
					{
						type: 'left_block',
						content: (
							<>
								<h1>Tenha uma visão privilegiada da situação financeira de seu negócio</h1>
								<p>
									Saiba em tempo real a situação de todos os seus estabelecimentos, fluxo de caixa,
									entregas realizadas, pedidos etc.
								</p>
							</>
						),
						photo: 'https://i.pinimg.com/564x/ad/35/18/ad35187cec6e3479e4f05cec079f0ab3.jpg',
					},
				],
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

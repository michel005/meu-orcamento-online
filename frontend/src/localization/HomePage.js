import { PROJECT_INFO } from 'config/ProjectInfo'

export const HOME_PAGE = (events) => [
	{
		type: 'left_block',
		content: (
			<>
				<h1>A solução completa para o seu restaurante</h1>
				<p>
					Somos um pacote de soluções para um restaurante que pretende operar com modernidade e
					praticidade para seus funcionários e clientes. Nossa plataforma se adapta a sua
					necessidade e é focada principalmente em restaurantes que atendem tanto presencialmente
					quanto em delivery.
				</p>
			</>
		),
		photo: 'https://i.pinimg.com/564x/04/be/f6/04bef61884051d5695ad0d2ce37632f2.jpg',
	},
	{
		type: 'card_collection',
		header: 'Aqui você tem muito a ganhar',
		description: `Estas são as principais funcionalidades que você encontra usando o ${PROJECT_INFO.name}.`,
		cards: [
			{
				header: 'Estabilidade Garantida',
				icon: 'dns',
				content:
					'Um sistema que ira operar 24h por dia, 7 dias por semana, com a agilidade e praticidade que você precisa. Além disso temos servidores com redundância, isso significa que nosso serviço ficara disponível para atender suas necessidades',
				modalContent:
					'Um sistema que ira operar 24h por dia, 7 dias por semana, com a agilidade e praticidade que você precisa. Além disso temos servidores com redundância, isso significa que nosso serviço ficara disponível para atender suas necessidades',
			},
			{
				header: 'Fácil de configurar ',
				icon: 'settings',
				content:
					'Todos os passos para implantação em seu estabelecimento estão descritos juntos com vários artigos de ajuda.',
				modalContent:
					'Todos os passos para implantação em seu estabelecimento estão descritos juntos com vários artigos de ajuda.',
			},
			{
				header: 'Para todos os negócios',
				icon: 'monitoring',
				content:
					'Não importa o tamanho do seu negócio, você pode contar conosco para fazer ele crescer e manter um nome forte entre os concorrentes.',
			},
			{
				header: 'Cardápio Online',
				icon: 'web',
				content:
					'Seu cliente pode acessar todo o cardápio, fazer pedido e realizar o pagamento, tudo de forma online.',
			},
			{
				header: 'Delivery',
				icon: 'package',
				content:
					'Você ganha uma plataforma robusta para entrega de pedidos e gerenciamento para APPs de delivery.',
			},
			{
				header: 'Estações de Pagamento',
				icon: 'payment',
				content:
					'Você tera estações de pagamento que irão aceitar várias formas de pagamento, por maquininha, PIX, boleto etc. Tudo com muita segurança e modernidade.',
			},
		],
	},
]

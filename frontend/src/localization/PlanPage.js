export const PLAN_PAGE = () => [
	{
		type: 'card_collection',
		variation: 'price',
		header: 'Planos especiais para o seu modelo de negócio',
		description: 'Escolha o plano que mais se aplica as necessidades do seu negócio.',
		cards: [
			{
				header: 'Pequenos Negócios',
				color: '#111c',
				description: 'Para você que esta começando seu próprio negócio.',
				features: [
					'Até 5 garçons',
					'1 terminal de pagamento',
					'10 terminais de cardápio',
					'Suporte de segunda a sexta das 8h as 18h',
				],
				price: '200',
			},
			{
				header: 'Restaurante Médio',
				color: '#111c',
				description: 'Já esta a um certo tempo no mercado e esta pensando em expandir futuramente.',
				features: [
					'Até 5 garçons',
					'2 terminal de pagamento',
					'15 terminais de cardápio',
					'Avaliação de clientes',
					'Integração com APPs de delivery',
					'Suporte de segunda a sexta das 8h as 18h',
				],
				price: '500',
			},
			{
				header: 'Restaurante Grande',
				color: '#111c',
				description: 'Atende a cidade toda ou uma grande localidade com mais de uma filial.',
				features: [
					'Até 20 garçons',
					'7 terminal de pagamento',
					'50 terminais de cardápio',
					'Avaliação de clientes',
					'Integração com APPs de delivery',
					'Relatórios financeiros',
					'Suporte 24 horas',
				],
				price: '2000',
				suffix: '/ mês / filial',
			},
			{
				header: 'Personalizado',
				color: '#111c',
				description:
					'Não encontrou o plano ideal para o seu negócio? Solicite um orçamento personalizado para o nosso time de especialistas.',
				price: null,
				suffix: 'Solicitar Orçamento',
			},
		],
	},
]

import React from 'react'
import { useModal } from '../../hook/useModal'
import { FlexColumn } from '../../components/FlexColumn'
import { CardGroup } from '../../components/CardGroup'
import { Card } from '../../components/Card'

const PLANS_DEFINITION = [
	{
		header: 'Plano Simples',
		image: 'https://i.pinimg.com/564x/5b/aa/f1/5baaf1e0cc1d62c066cd0b044dd12aa1.jpg',
		content: (
			<p>
				Laborum laborum Lorem sunt ad anim do reprehenderit. Do labore Lorem laboris ea
				deserunt aute. Commodo irure sunt exercitation ut elit aliqua sint aliqua qui elit
				amet. Aute reprehenderit labore laborum exercitation amet nulla qui pariatur
				exercitation sunt officia.
			</p>
		),
		price: (
			<button data-primary style={{ justifyContent: 'center' }}>
				R$ 1000,00 / mês
			</button>
		),
	},
	{
		header: 'Plano Premium',
		image: 'https://i.pinimg.com/564x/c3/1f/44/c31f44fe67167a5e6bbc33bbedbf0e6b.jpg',
		content: (
			<p>
				Duis nisi ullamco dolor ut id sunt sit ea occaecat. Minim incididunt laboris elit
				pariatur. Sit nulla qui voluptate laborum do dolor quis proident eu pariatur.
			</p>
		),
		price: (
			<button data-primary style={{ justifyContent: 'center' }}>
				R$ 2000,00 / mês
			</button>
		),
	},
	{
		header: 'Plano Gold',
		image: 'https://i.pinimg.com/736x/90/4f/55/904f55b8f4951d93c118b266380fd962.jpg',
		content: (
			<p>
				Do anim sint officia exercitation voluptate ut ex in anim nulla incididunt dolor.
				Dolore proident id aute pariatur laboris proident qui cupidatat cillum tempor velit
				duis eiusmod. Ad quis velit occaecat qui officia enim sunt esse esse velit. Sit
				culpa sunt sit adipisicing. Nostrud in tempor culpa cillum laboris exercitation
				consectetur reprehenderit.
			</p>
		),
		price: (
			<button data-primary style={{ justifyContent: 'center' }}>
				R$ 5000,00 / mês / filial
			</button>
		),
	},
]

export const PlansPage = () => {
	const { message } = useModal()
	return (
		<>
			<FlexColumn className="thirdBlock">
				<h1>Veja o plano que mais se aplica a sua empresa</h1>
				<CardGroup>
					{PLANS_DEFINITION.map((card, cardKey) => {
						return (
							<Card key={cardKey}>
								<img
									src={card.image}
									height="100px"
									style={{ margin: '-14px -14px 0' }}
								/>
								<h3>{card.header}</h3>
								<div data-grow>{card.content}</div>
								<button
									data-primary
									data-icon="description"
									style={{ justifyContent: 'center' }}
									onClick={() => {
										message({
											header: 'Erro ao acessar opção!',
											message: (
												<p>
													Não foi possível completar essa operação no
													momento. Tente novamente mais tarde.
												</p>
											),
										})
									}}
								>
									Mostrar Detalhes
								</button>
							</Card>
						)
					})}
				</CardGroup>
			</FlexColumn>
		</>
	)
}

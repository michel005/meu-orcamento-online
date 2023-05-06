import React from 'react'
import { Carrossel } from '../../components/Carrossel'
import { FlexColumn } from '../../components/FlexColumn'

export const HirePage = () => {
	return (
		<>
			<FlexColumn className="thirdBlock">
				<h1>Como contratar o Restaurante Fácil?</h1>
				<p>
					O processo para contratar o Restaurante Fácil consiste em algumas etapas
					importantes. Lembrando que o processo deve ser feito pelo dono do
					estabelecimento ou alguém com acesso as informações necessárias.
				</p>
			</FlexColumn>
			<FlexColumn className="thirdBlock">
				<Carrossel
					items={[
						<>
							<h3>Etapa 1: Escolher um plano</h3>
							<p>
								Você sabe o <b>tamanho de sua empresa</b>? Quantos garçons possui,
								quantos caixas e quantas mesas deixara disponível para seus
								clientes? Todas essas são informações importantes para começar a
								escolher um plano que se encaixe com o seu modelo de negócio.
								Contratar mais do que precisa pode fazer com que você tenha um gasto
								desnecessário no momento, então tenha certeza da quantidade antes de
								prosseguir.
							</p>
							<p>
								Uma vez que você já escolheu, precisa saber se pretende realizar{' '}
								<b>entregas a domicílio</b>. Hoje essa opção exige um pouco de
								planejamento quanto ao preparo da comida e pode dar uma má impressão
								para o estabelecimento caso seja mal planejado. Mas caso tenha
								interesse, o nosso sistema lhe ajudara a gerenciar suas entregas,
								seja por aplicativo de delivery ou por entrega própria do seu
								estabelecimento.
							</p>
							<p>
								Outro ponto muito importante é saber se o seu negócio possui mais de
								um estabelecimento. Isso pode indicar que você precisa de um plano
								com mais ferramentas, com um chat para se comunicar com outras
								filiais, relatórios gerenciais e controle de estoque mais completo.
							</p>
						</>,
						<>
							<h3>Etapa 2: Entrar em contato</h3>
							<p>
								Uma vez que ja saiba do que precisa, você deverá entrar em contato
								com o nosso time de vendas através do e-mail{' '}
								<a data-link href="mailto:mdgrigoli@hotmail.com.br">
									mdgrigoli@hotmail.com.br
								</a>
								. Caso você ainda tenha alguma dúvida sobre o sistema não se
								preocupe, nosso time esta disposto a te ajudar a esclarecer todas as
								dúvidas.
							</p>
							<p>
								Durante este contato, o nosso time vai realizar um pré cadastro de
								sua empresa, para que assim você consiga realizar o seu primeiro
								acesso.
							</p>
						</>,
						<>
							<h3>Etapa 3: Primeiro acesso</h3>
							<p>
								Aqui você vai realizar o acesso ao nosso sistema através do botão
								acima com nome "Entrar", informando o seu e-mail e senha. Logo você
								vera um formulário onde você ira preencher algumas informações
								complementares sobre o seu estabelecimento. Tenha muita atenção a
								esta etapa, pois aqui serão colocadas todas as informações que o seu
								cliente ira visualizar como logotipo da empresa, nome, endereço,
								etc.
							</p>
						</>,
						<>
							<h3>Concluído</h3>
							<p>
								Pronto, agora você possui um sistema completo para o seu
								restaurante. Dentro de cada menu, uma opção de ajuda ira aparecer
								automaticamente lhe indicando o que fazer para cadastrar um menu,
								registrar funcionários e começar a operar o mais rápido possível.
							</p>
						</>,
					]}
				/>
			</FlexColumn>
		</>
	)
}

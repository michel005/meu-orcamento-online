import React from 'react'
import { GoogleIconType } from '../types/GoogleIconType'
import { DashboardPage } from '../pages/private/DashboardPage'
import { MyUserPage } from '../pages/private/MyUserPage'
import { CustomerPage } from '../pages/private/CustomerPage'
import { ProductPage } from '../pages/private/ProductPage'
import { SellingPage } from '../pages/private/SellingPage'

type RouteType = {
	[key: string]: {
		icon?: GoogleIconType
		name: string
		description: string
		route: string
		component?: any
		hide?: boolean
	}
}

type RoutesType = {
	private: RouteType
	public: RouteType
}

export const RoutesMap: RoutesType = {
	public: {},
	private: {
		dashboard: {
			icon: 'dashboard',
			name: 'Dashboard',
			description: 'Dados rápidos para iniciar a gestão de seu bazar',
			route: '/',
			component: <DashboardPage />,
		},
		customers: {
			icon: 'group',
			name: 'Clientes',
			description: 'Gerencie todos os cadastros de seus clientes',
			route: '/customers',
			component: <CustomerPage />,
		},
		products: {
			icon: 'shopping_bag',
			name: 'Produtos',
			description: 'Gerencie os produtos do seu bazar',
			route: '/products',
			component: <ProductPage />,
		},
		sells: {
			icon: 'sell',
			name: 'Vendas',
			description: 'Realize e gerencie as vendas e porcentagem de lucro',
			route: '/sells',
			component: <SellingPage />,
		},
		payments: {
			icon: 'payments',
			name: 'Pagamentos',
			description: 'Veja o quanto você deve ou recebe resultante das vendas',
			route: '/payments',
		},
		myUser: {
			icon: 'person',
			name: 'Meu Usuário',
			description: 'Altere os dados do seu bazar',
			route: '/my-user',
			component: <MyUserPage />,
		},
		facebook: {
			icon: 'public',
			name: 'Facebook',
			description: 'Crie postagens para o facebook',
			route: '/facebook',
		},
		instagram: {
			icon: 'public',
			name: 'Instagram',
			description: 'Crie postagens para o instagram',
			route: '/instagram',
		},
		mercadoLivre: {
			icon: 'public',
			name: 'Mercado Livre',
			description: 'Crie postagens para o mercado livre',
			route: '/mercado-livre',
		},
		support: {
			icon: 'support',
			name: 'Ajuda e Suporte',
			description: 'Busque ajuda atravez de centenas de tópicos',
			route: '/support',
		},
		getStarted: {
			icon: 'shield',
			name: 'Começar Agora',
			description: 'Saiba como dar os primeiros passos para organizar o seu bazar',
			route: '/get-started',
		},
	},
}

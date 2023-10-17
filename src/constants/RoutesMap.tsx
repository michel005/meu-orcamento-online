import React from 'react'
import { GoogleIconType } from '../types/GoogleIconType'
import { DashboardPage } from '../pages/private/DashboardPage'
import { MyUserPage } from '../pages/private/MyUserPage'
import { CustomerPage } from '../pages/private/CustomerPage'
import { ProductPage } from '../pages/private/ProductPage'

type RouteType = {
	[key: string]: {
		icon?: GoogleIconType
		name: string
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
			route: '/',
			component: <DashboardPage />,
		},
		customers: {
			icon: 'group',
			name: 'Clientes',
			route: '/customers',
			component: <CustomerPage />,
		},
		budgets: {
			icon: 'shopping_bag',
			name: 'Produtos',
			route: '/products',
			component: <ProductPage />,
		},
		sells: {
			icon: 'sell',
			name: 'Vendas',
			route: '/sells',
		},
		myUser: {
			icon: 'person',
			name: 'Meu Usuário',
			route: '/my-user',
			component: <MyUserPage />,
			hide: true,
		},
	},
}

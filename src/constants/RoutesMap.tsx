import React from 'react'
import { GoogleIconType } from '../types/GoogleIconType'
import { DashboardPage } from '../pages/private/DashboardPage'
import { MyUserPage } from '../pages/private/MyUserPage'

type RouteType = {
	[key: string]: {
		icon?: GoogleIconType
		name: string
		route: string
		component?: any
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
		},
		myUser: {
			icon: 'person',
			name: 'Meu Usuário',
			route: '/my-user',
			component: <MyUserPage />,
		},
	},
}

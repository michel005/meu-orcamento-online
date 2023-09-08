import React from 'react'
import { NavbarItemsType } from './NavbarItems.type'
import { BudgetsPage } from '../pages/budgets/BudgetsPage'
import { BudgetsSidebar } from '../pages/budgets/Budgets.sidebar'
import { CustomersPage } from '../pages/customers/CustomersPage'
import { CustomersSidebar } from '../pages/customers/Customers.sidebar'
import { DashboardPage } from '../pages/dashboard/DashboardPage'
import { DashboardSidebar } from '../pages/dashboard/Dashboard.sidebar'
import { CustomerFormPage } from '../pages/customers/form/CustomerFormPage'
import { CustomerFormPageSidebar } from '../pages/customers/form/CustomerFormPage.sidebar'
import { BudgetFormPage } from '../pages/budgets/form/BudgetFormPage'
import { BudgetFormPageSidebar } from '../pages/budgets/form/BudgetFormPage.sidebar'

export const NavbarItems: NavbarItemsType = [
	{
		title: 'Dashboard',
		icon: 'dashboard',
		subTitle: 'Visão geral e estatísticas',
		link: '/',
		element: <DashboardPage />,
		sidebar: <DashboardSidebar />,
		context: ['navbar'],
	},
	{
		title: 'Clientes',
		icon: 'person',
		subTitle: 'Gerencie seus clientes',
		link: '/customers',
		element: <CustomersPage />,
		sidebar: <CustomersSidebar />,
		context: ['navbar'],
	},
	{
		title: 'Formulário de Cliente',
		icon: 'person_add',
		link: '/customers/form',
		element: <CustomerFormPage />,
		sidebar: <CustomerFormPageSidebar />,
		context: [],
	},
	{
		title: 'Orçamentos',
		icon: 'description',
		subTitle: 'Gerencie seus orçamentos',
		link: '/budgets',
		element: <BudgetsPage />,
		sidebar: <BudgetsSidebar />,
		context: ['navbar'],
	},
	{
		title: 'Formulário de Orçamento',
		icon: 'description',
		link: '/budgets/form',
		element: <BudgetFormPage />,
		sidebar: <BudgetFormPageSidebar />,
		context: [],
	},
	{
		title: 'Catálogo de Produtos',
		icon: 'shopping_cart',
		subTitle: 'Crie e gerencie produtos',
		link: '/products',
		element: <></>,
		sidebar: <></>,
		context: ['navbar'],
	},
	{
		title: 'Relatórios',
		icon: 'insert_chart_outlined',
		subTitle: 'Emita relatórios de desempenho',
		link: '/reports',
		element: <></>,
		sidebar: <></>,
		context: ['navbar'],
	},
	{
		title: 'Configurações',
		icon: 'settings',
		subTitle: 'Personalize suas configurações',
		link: '/settings',
		element: <></>,
		sidebar: <></>,
		context: ['navbar'],
	},
	{
		title: 'Ajuda e Suporte',
		icon: 'help_outline',
		subTitle: 'Recursos de suporte',
		link: '/help',
		element: <></>,
		sidebar: <></>,
		context: ['navbar'],
	},
]

import React from 'react'
import { NavbarItemsTypeList } from './NavbarItems.type'
import { BudgetsPage } from '../pages/budgets/BudgetsPage'
import { CustomersPage } from '../pages/customers/CustomersPage'
import { DashboardPage } from '../pages/dashboard/DashboardPage'
import { CustomerFormPage } from '../pages/customers/form/CustomerFormPage'
import { BudgetFormPage } from '../pages/budgets/form/BudgetFormPage'
import { MaintenancePage } from '../pages/MaintenancePage'

export const NavbarItems: NavbarItemsTypeList = [
	{
		title: 'Dashboard',
		icon: 'dashboard',
		subTitle: 'Visão geral e estatísticas',
		link: '/',
		element: DashboardPage,
		context: ['navbar'],
	},
	{
		title: 'Clientes',
		icon: 'person',
		subTitle: 'Gerencie seus clientes',
		link: '/customers',
		element: CustomersPage,
		context: ['navbar'],
	},
	{
		title: 'Cadastro de Cliente',
		icon: 'person_add',
		link: '/customers/newForm',
		element: CustomerFormPage,
		context: [],
	},
	{
		title: 'Alteração de Cliente',
		icon: 'person_check',
		link: '/customers/form/:customerId',
		element: CustomerFormPage,
		context: [],
	},
	{
		title: 'Orçamentos',
		icon: 'description',
		subTitle: 'Gerencie seus orçamentos',
		link: '/budgets',
		element: BudgetsPage,
		context: ['navbar'],
	},
	{
		title: 'Cadastro de Orçamento',
		icon: 'description',
		link: '/budgets/newForm',
		element: BudgetFormPage,
		context: [],
	},
	{
		title: 'Alteração de Orçamento',
		icon: 'description',
		link: '/budgets/form/:budgetId',
		element: BudgetFormPage,
		context: [],
	},
	{
		title: 'Catálogo de Produtos',
		icon: 'shopping_cart',
		subTitle: 'Crie e gerencie produtos',
		link: '/products',
		element: MaintenancePage,
		context: ['navbar'],
	},
	{
		title: 'Relatórios',
		icon: 'insert_chart',
		subTitle: 'Emita relatórios de desempenho',
		link: '/reports',
		element: MaintenancePage,
		context: ['navbar'],
	},
	{
		title: 'Configurações',
		icon: 'settings',
		subTitle: 'Personalize suas configurações',
		link: '/settings',
		element: MaintenancePage,
		context: ['navbar'],
	},
	{
		title: 'Ajuda e Suporte',
		icon: 'help',
		subTitle: 'Recursos de suporte',
		link: '/help',
		element: MaintenancePage,
		context: ['navbar'],
	},
]

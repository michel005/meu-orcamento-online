import { DashboardPage } from '../pages/DashboardPage'
import React from 'react'
import { ProductPage } from '../pages/product/ProductPage'
import { NavbarItemsType } from './NavbarItems.type'
import { SupplierPage } from '../pages/supplier/SupplierPage'
import { SupplierFormPage } from '../pages/supplier/SupplierFormPage'
import { SupplierSidebar } from '../pages/supplier/Supplier.sidebar'
import { ProductSidebar } from '../pages/product/Product.sidebar'
import { ProductFormPage } from '../pages/product/ProductFormPage'

export const NavbarItems: NavbarItemsType = [
	{
		title: 'Dashboard',
		subTitle: 'Visão geral do seu bazar',
		icon: 'dashboard',
		link: '/',
		element: <DashboardPage />,
		context: ['navbar'],
	},
	{
		title: 'Produtos',
		subTitle: 'Uma consulta de todos os seus produtos',
		icon: 'shopping_bag',
		link: '/product',
		element: <ProductPage />,
		sidebar: <ProductSidebar />,
		context: ['navbar'],
	},
	{
		link: '/product/form',
		element: <ProductFormPage />,
		context: [],
	},
	{
		title: 'Fornecedores',
		subTitle: 'Estas pessoas fornecem os produtos para que sejam vendidos em seu bazar',
		icon: 'person',
		link: '/supplier',
		element: <SupplierPage />,
		sidebar: <SupplierSidebar />,
		context: ['navbar'],
	},
	{
		link: '/supplier/form',
		element: <SupplierFormPage />,
		context: [],
	},
	{
		title: 'Vendedores',
		icon: 'people',
		link: '/sellers',
		context: ['navbar'],
	},
	{
		title: 'Relatórios',
		icon: 'bar_chart',
		link: '/reports',
		context: ['navbar'],
	},
	{
		title: 'Configurações',
		icon: 'settings',
		link: '/settings',
		context: ['navbar'],
	},
	{
		title: 'Logout',
		icon: 'exit_to_app',
		link: '/logout',
		context: ['navbar'],
	},
]

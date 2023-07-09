import React from 'react'
import { IconType } from '../types/IconType'
import { CustomerPage } from '../pages/customer/CustomerPage'
import { StoragePage } from '../pages/storage/StoragePage'
import { CustomerFormPage } from '../pages/customer/CustomerFormPage'

export type OptionType = {
	label: string
	icon: IconType
	path: string
	hide: boolean
	option: any
	subOptions?: any
}

export const SidebarOptions = [
	{
		label: 'Dashboard',
		icon: 'dashboard',
		path: '/',
		option: <h1>Dashboard</h1>,
	} as OptionType,
	{
		label: 'Clientes',
		icon: 'group',
		path: '/customer',
		option: <CustomerPage />,
	} as OptionType,
	{
		label: 'Formulário de Clientes',
		icon: 'group',
		path: '/customer/form',
		hide: true,
		option: <CustomerFormPage />,
	} as OptionType,
	{
		label: 'Estoque',
		icon: 'storage',
		path: '/storage',
		option: <StoragePage />,
	} as OptionType,
	{
		label: 'Entrada',
		icon: 'input',
		path: '/input',
		option: <h1>Entrada</h1>,
	} as OptionType,
	{
		label: 'Saída',
		icon: 'output',
		path: '/output',
		option: <h1>Saída</h1>,
	} as OptionType,
	{
		label: 'Configurações',
		icon: 'settings',
		path: '/settings',
		option: <h1>Configurações</h1>,
	} as OptionType,
	{
		label: 'Notificações',
		icon: 'notifications',
		path: '/notification',
		hide: true,
		option: <h1>Notificações</h1>,
	} as OptionType,
	{
		label: 'Meu Perfil',
		icon: 'person',
		path: '/myProfile',
		hide: true,
		option: <h1>Meu Perfil</h1>,
	} as OptionType,
	{
		label: 'Sair',
		icon: 'logout',
		path: '/logout',
		hide: true,
		option: <h1>Sair da sua conta</h1>,
	} as OptionType,
]

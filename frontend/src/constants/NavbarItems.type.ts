import { GoogleIcons } from '../types/GoogleIcons'

export type NavbarItemsTypeList = NavbarItemsType[]

export type NavbarItemsType = {
	title?: string
	subTitle?: string
	icon?: GoogleIcons
	link: string
	element?: any
	sidebar?: any
	context: ('navbar' | 'sidebar')[]
}

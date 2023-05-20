import React from 'react'
import style from './Tabs.module.scss'
import { Button } from './Button'

export type Tab = {
	label: string
	icon?: string
}

export type TabsType = {
	tabs: Tab[]
	alignment?: 'left' | 'center' | 'right'
	variation?: 'primary' | 'secondary'
	currentTab: number
	onChange?: (currentTab: number) => void
	children?: (tab: Tab | undefined) => any
}

export const Tabs = ({
	currentTab = 0,
	onChange = () => null,
	tabs,
	variation = 'primary',
	alignment = 'left',
	children = () => null,
}: TabsType) => {
	return (
		<div className={style.tabs} data-alignment={alignment}>
			<div className={style.tabSelector}>
				{tabs.map((tab, tabKey) => {
					return (
						<Button
							data-active={tabKey === currentTab}
							key={tabKey}
							leftIcon={tab.icon}
							variation={variation}
							onClick={() => onChange(tabKey)}
						>
							{tab.label}
						</Button>
					)
				})}
			</div>
			<div className={style.content}>
				{children(tabs.find((tab, tabKey) => tabKey === currentTab))}
			</div>
		</div>
	)
}

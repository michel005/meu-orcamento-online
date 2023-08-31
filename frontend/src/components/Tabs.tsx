import { TabsStyle } from './Tabs.style'
import { TabsType } from './Tabs.type'
import React from 'react'

export const Tabs = ({ tabs, currentTab, onChange }: TabsType) => {
	return (
		<TabsStyle>
			<section>
				{Object.keys(tabs).map((tab) => {
					const tabInfo = tabs[tab]
					return (
						<button
							key={tab}
							data-selected={currentTab === tab}
							onClick={() => {
								onChange?.(tab)
							}}
						>
							{tabInfo.label}
						</button>
					)
				})}
			</section>
			<div>{tabs?.[currentTab as keyof typeof tabs]?.children}</div>
		</TabsStyle>
	)
}

export type TabsType = {
	tabs: {
		[key: string]: {
			label: string
			children?: any
		}
	}
	currentTab?: string
	onChange?: (tab: string) => void
}

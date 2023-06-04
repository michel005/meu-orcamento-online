import React, { useState } from 'react'
import { Button, ButtonType } from './Button'
import style from './Dropdown.module.scss'
import { InputType } from './Input'

export type DropdownType = ButtonType & {
	list?: (ButtonType & DropdownType)[]
	sidebarMode?: boolean
	onClick?: (setShowList: any) => void
	fatherClose?: () => void
}

export const Dropdown = ({
	list = [],
	sidebarMode = false,
	fatherClose,
	...props
}: DropdownType) => {
	const [showList, setShowList] = useState(false)

	return (
		<div
			className={`${style.dropdown} ${props.className}`}
			data-show={showList}
			data-sidebar-mode={sidebarMode}
		>
			<Button
				{...props}
				onClick={() => {
					setShowList((x) => !x)
				}}
				rightIcon="expand_less"
			/>
			<div className={style.list}>
				{list.map((item, itemKey) => {
					if (item.list) {
						return (
							<Dropdown
								{...item}
								key={itemKey}
								fatherClose={() => {
									setShowList((x) => !x)
								}}
								className={style.innerDropdown}
							/>
						)
					}
					return (
						<Button
							key={itemKey}
							{...item}
							onClick={(e) => {
								item?.onClick?.(setShowList)
								fatherClose?.()
								setShowList(false)
							}}
						/>
					)
				})}
			</div>
		</div>
	)
}

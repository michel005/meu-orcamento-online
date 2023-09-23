import style from './StickyButtonGroup.module.scss'
import React from 'react'
import { StickyButtonGroupType } from './StickyButtonGroup.type'

export const StickyButtonGroup = ({ children }: StickyButtonGroupType) => {
	return <div className={style.stickyButtonGroup}>{children}</div>
}

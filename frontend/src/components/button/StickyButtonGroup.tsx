import style from './StickyButtonGroup.module.scss'
import React, { useState } from 'react'
import { StickyButtonGroupType } from './StickyButtonGroup.type'
import { Button } from './Button'

export const StickyButtonGroup = ({ children }: StickyButtonGroupType) => {
	return <div className={style.stickyButtonGroup}>{children}</div>
}

import React from 'react'
import style from './Icon.module.scss'
import { GoogleIcons } from '../types/GoogleIcons'

export const Icon = ({ icon }: { icon: GoogleIcons }) => {
	return <div className={style.icon}>{icon}</div>
}

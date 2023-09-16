import React from 'react'
import style from './Icon.module.scss'
import { GoogleIcons } from '../types/GoogleIcons'

export const Icon = ({ icon, className }: { icon: GoogleIcons; className?: string }) => {
	return <div className={`${style.icon} icon ${className}`}>{icon}</div>
}

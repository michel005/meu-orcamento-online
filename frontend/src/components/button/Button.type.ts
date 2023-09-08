import { ButtonHTMLAttributes } from 'react'
import { GoogleIcons } from '../../types/GoogleIcons'

export interface ButtonType extends ButtonHTMLAttributes<HTMLButtonElement> {
	leftIcon?: GoogleIcons
	rightIcon?: GoogleIcons
	loading?: boolean | undefined
	progress?: number
	variation?: 'primary' | 'secondary' | 'ghost' | 'sidebar'
}

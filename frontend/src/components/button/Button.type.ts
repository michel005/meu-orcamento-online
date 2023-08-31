import { ButtonHTMLAttributes } from 'react'

export interface ButtonType extends ButtonHTMLAttributes<HTMLButtonElement> {
	leftIcon?: string
	rightIcon?: string
	loading?: boolean | undefined
	variation?: 'primary' | 'secondary' | 'ghost' | 'sidebar'
}

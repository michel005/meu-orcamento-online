import { DialogHTMLAttributes } from 'react'

export interface ModalType extends DialogHTMLAttributes<HTMLDialogElement> {
	onClose?: () => void
	width?: string
}

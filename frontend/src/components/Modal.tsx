import React from 'react'
import style from './Modal.module.scss'
import styleButton from './Button.module.scss'
import { Button } from './Button'

export type ModalType = {
	onClose?: () => void
	children: any | null | undefined
}

export const Modal = ({ children, onClose = () => null }: ModalType) => {
	return (
		<div className={style.modal}>
			<div className={style.content}>
				<Button
					leftIcon="close"
					variation="link"
					className={`${styleButton.button} ${style.closeButton}`}
					onClick={onClose}
				/>
				{children}
			</div>
		</div>
	)
}

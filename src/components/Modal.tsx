import React from 'react'
import style from './Modal.module.scss'
import { ButtonGhost } from './Button'

export const Modal = ({
	children,
	buttons,
	onClose,
}: {
	children: any
	buttons?: any
	onClose?: () => void
}) => {
	return (
		<div className={style.modal}>
			<div className={style.modalContent}>
				<ButtonGhost className={style.closeButton} leftIcon="close" onClick={onClose} />
				{children}
				{buttons && <div className={style.buttons}>{buttons}</div>}
			</div>
		</div>
	)
}

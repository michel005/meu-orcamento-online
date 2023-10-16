import React from 'react'
import style from './Modal.module.scss'
import { ButtonGhost } from './Button'

export const Modal = ({ children, onClose }: { children: any; onClose?: () => void }) => {
	return (
		<div className={style.modal}>
			<div className={style.modalContent}>
				<ButtonGhost className={style.closeButton} leftIcon="close" onClick={onClose} />
				{children}
			</div>
		</div>
	)
}

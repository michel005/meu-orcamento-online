import React from 'react'
import style from './FormModal.module.scss'
import { ButtonGhost } from './Button'

export const FormModal = ({ children, onClose }) => {
	return (
		<div className={style.formModal}>
			<div className={style.formModalContent}>
				<ButtonGhost className={style.closeButton} leftIcon="close" onClick={onClose} />
				{children}
			</div>
		</div>
	)
}

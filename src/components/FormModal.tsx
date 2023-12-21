import React from 'react'
import style from './FormModal.module.scss'
import { ButtonGhost } from './Button'

export const FormModal = ({ title = undefined, children, onClose }) => {
	return (
		<div className={style.formModal}>
			<div className={style.formModalContent}>
				<header>
					<span>{title}</span>
					<ButtonGhost className={style.closeButton} leftIcon="close" onClick={onClose} />
				</header>
				{children}
			</div>
		</div>
	)
}

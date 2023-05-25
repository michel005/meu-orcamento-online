import React, { HTMLProps, HtmlHTMLAttributes } from 'react'
import style from './Modal.module.scss'
import styleButton from './Button.module.scss'
import { Button } from './Button'

export type ModalType = HtmlHTMLAttributes<HTMLDivElement> & {
	header?: string
	onClose?: () => void
	children: any | null | undefined
}

export const Modal = ({ header, children, onClose = () => null, ...props }: ModalType) => {
	return (
		<div {...props} className={`${style.modal} ${props.className}`}>
			<div className={style.content}>
				{header && (
					<div className={style.header}>
						<span>{header}</span>
						<Button
							leftIcon="close"
							variation="link"
							className={`${styleButton.button} ${style.closeButton}`}
							onClick={onClose}
						/>
					</div>
				)}
				<div className={style.insideContent}>{children}</div>
			</div>
		</div>
	)
}

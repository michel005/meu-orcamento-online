import React from 'react'
import { ModalStyle } from './Modal.style'
import { ModalType } from './Modal.type'

export const Modal = ({ onClose, children, width, ...props }: ModalType) => {
	return (
		<ModalStyle>
			<div style={{ width: width }}>
				{onClose && <button onClick={onClose} />}
				<section {...props}>{children}</section>
			</div>
		</ModalStyle>
	)
}

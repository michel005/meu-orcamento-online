import React from 'react'
import styled from 'styled-components'
import { FlexColumn } from './FlexColumn'
import { FlexRow } from './FlexRow'
import { useModal } from '../hook/useModal'
import { ModalType } from '../context/ModalContext'

const ModalStyle = styled.div`
	align-items: center;
	backdrop-filter: blur(4px);
	background-color: #3333;
	display: flex;
	flex-direction: row;
	font-size: 14px;
	height: 100%;
	justify-content: center;
	left: 0;
	position: fixed;
	top: 0;
	width: 100%;
	z-index: 100;

	.modal {
		background-color: #fff;
		box-shadow: #ccc 0 0 4px;
		margin-inline: 21px;
		max-width: 500px;
		padding: 21px;
		width: 500px;

		.closeModalButton {
			color: #333;
			font-size: 14px;
		}
	}
`

export const Modal = ({ modal }: { modal: ModalType }) => {
	const { close } = useModal()

	return (
		<ModalStyle>
			<FlexColumn className="modal">
				<FlexRow>
					<h3 data-grow>{modal.header}</h3>{' '}
					<button
						className="closeModalButton"
						data-link
						data-icon="close"
						onClick={() => {
							modal?.onClose?.()
							if (modal.id) {
								close(modal.id)
							}
						}}
					/>
				</FlexRow>
				<FlexColumn>
					{modal.message}
					{modal.type === 'question' && (
						<FlexRow style={{ justifyContent: 'flex-end' }}>
							<button
								data-secondary
								data-icon="close"
								onClick={() => {
									modal?.onClose?.()
									if (modal.id) {
										close(modal.id)
									}
								}}
							>
								Cancelar
							</button>
							<button
								data-primary
								data-icon="check"
								onClick={() => {
									if (modal.id) {
										modal?.confirm?.(modal.id)
										close(modal.id)
									}
								}}
							>
								Confirmar
							</button>
						</FlexRow>
					)}
				</FlexColumn>
			</FlexColumn>
		</ModalStyle>
	)
}

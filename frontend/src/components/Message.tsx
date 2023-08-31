import { Modal } from './Modal'
import React, { useContext } from 'react'
import { MessageType } from './Message.type'
import { ButtonGroup } from './button/ButtonGroup'
import { Button } from './button/Button'
import { ConfigContext } from '../contexts/ConfigContext'

export const Message = ({ index, type, header, content, confirm }: MessageType) => {
	const { setMessage } = useContext(ConfigContext)
	return (
		<Modal>
			<h1>{header}</h1>
			<section>{content}</section>
			<hr />
			{type === 'question' && (
				<ButtonGroup align="right">
					<Button
						variation="ghost"
						leftIcon="close"
						onClick={() => {
							setMessage((x) => {
								x.splice(index, 1)
								return [...x]
							})
						}}
					>
						Cancelar
					</Button>
					<Button
						onClick={() => {
							confirm?.()
							setMessage((x) => {
								x.splice(index, 1)
								return [...x]
							})
						}}
						leftIcon="done"
					>
						Confirmar
					</Button>
				</ButtonGroup>
			)}
		</Modal>
	)
}

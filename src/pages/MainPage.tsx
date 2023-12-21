import React, { useContext } from 'react'
import { PublicPage } from './PublicPage'
import { SessionContext } from '../contexts/SessionContext'
import { PrivatePage } from './PrivatePage'
import { ConfigContext } from '../contexts/ConfigContext'
import { Modal } from '../components/Modal'
import { Button, ButtonGhost } from '../components/Button'

export const MainPage = () => {
	const { message, setMessage, loading } = useContext(ConfigContext)
	const { currentUser, status } = useContext(SessionContext)

	if (status !== 'loaded') {
		return <></>
	}

	return (
		<div>
			{currentUser ? <PrivatePage /> : <PublicPage />}
			{message && (
				<Modal
					onClose={() => {
						setMessage(null)
					}}
					buttons={
						<>
							{message.type === 'confirm' && (
								<>
									{message.confirm && (
										<Button
											leftIcon="check"
											onClick={() => {
												message.confirm()
												setMessage(null)
											}}
										>
											Confirmar
										</Button>
									)}
								</>
							)}
							{message.type === 'question' && (
								<>
									<ButtonGhost
										leftIcon="close"
										onClick={() => {
											setMessage(null)
										}}
									>
										Cancelar
									</ButtonGhost>
									{message.confirm && (
										<Button
											leftIcon="check"
											onClick={() => {
												message.confirm()
												setMessage(null)
											}}
										>
											Confirmar
										</Button>
									)}
								</>
							)}
						</>
					}
				>
					<h2>{message.header}</h2>
					<p>{message.content}</p>
				</Modal>
			)}
		</div>
	)
}

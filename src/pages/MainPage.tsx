import React, { useContext } from 'react'
import { PublicPage } from './PublicPage'
import { SessionContext } from '../contexts/SessionContext'
import { PrivatePage } from './PrivatePage'
import { ConfigContext } from '../contexts/ConfigContext'
import { Modal } from '../components/Modal'
import { Button } from '../components/Button'
import { LoadingPage } from './LoadingPage'

export const MainPage = () => {
	const { message, setMessage, loading } = useContext(ConfigContext)
	const { currentUser } = useContext(SessionContext)

	return (
		<div>
			{currentUser ? <PrivatePage /> : <PublicPage />}
			{message && (
				<Modal
					onClose={() => {
						setMessage(null)
					}}
				>
					<h1>{message.header}</h1>
					<p>{message.content}</p>
					{message.confirm && (
						<Button onClick={() => message.confirm()}>Confirmar</Button>
					)}
				</Modal>
			)}
			{loading && <LoadingPage />}
		</div>
	)
}

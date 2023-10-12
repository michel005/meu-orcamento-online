import React, { useContext, useState } from 'react'
import { useFormLayout } from '../hooks/useFormLayout'
import { LoginFormDefinition } from '../definitions/LoginFormDefinition'
import axios from 'axios'
import { SessionContext } from '../contexts/SessionContext'
import {useApi} from "../hooks/useApi";

export const PrivatePage = () => {
	const { currentUser, setCurrentUser } = useContext(SessionContext)
	const { getAll } = useApi('customer')

	return (
		<div>
			<h1>{currentUser.full_name}</h1>
			<button
				onClick={() => {
					setCurrentUser(null)
				}}
			>
				Sair
			</button>
		</div>
	)
}

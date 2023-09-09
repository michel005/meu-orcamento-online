import React from 'react'
import { DivColumn } from '../../../components/DivColumn'
import { Button } from '../../../components/button/Button'
import { DivRow } from '../../../components/DivRow'
import { useDatabase } from '../../../hooks/useDatabase'
import { Budget, Service } from '../../../types/Entities.type'
import { useNavigate } from 'react-router-dom'
import { useData } from '../../../hooks/useData'
import { useMessage } from '../../../hooks/useMessage'
import { Label } from '../../../components/Label.style'

export const BudgetFormPageSidebar = () => {
	const { showQuestion } = useMessage()
	const formModalData = useData<Service | null>('budgetServiceModal', null)
	const formData = useData<Budget>('budgetForm', {})
	const database = useDatabase<Budget>('budget')
	const navigate = useNavigate()

	return (
		<>
			{formData.data.created && (
				<DivColumn style={{ gap: '4px' }}>
					<Label>Data de Cadastro</Label>
					{formData.data.created}
				</DivColumn>
			)}
			{formData.data.updated && (
				<DivColumn style={{ gap: '4px' }}>
					<Label>Data de Alteração</Label>
					{formData.data.updated}
				</DivColumn>
			)}
			<div style={{ flexGrow: 1 }} />
			<DivColumn style={{ width: '100%' }}>
				<Button leftIcon="preview" style={{ width: '100%' }} variation="sidebar">
					Visualizar Orçamento
				</Button>
				<Button leftIcon="share" style={{ width: '100%' }} variation="sidebar">
					Compartilhar
				</Button>
				<Button leftIcon="password" style={{ width: '100%' }} variation="sidebar">
					Senha de Acesso
				</Button>
			</DivColumn>
		</>
	)
}

import React from 'react'
import { DivColumn } from '../../../components/DivColumn'
import { Button } from '../../../components/button/Button'
import { Budget } from '../../../types/Entities.type'
import { useData } from '../../../hooks/useData'
import { Label } from '../../../components/Label.style'

export const BudgetFormPageSidebar = () => {
	const formData = useData<Budget>('budgetForm', {})

	return (
		<>
			<DivColumn style={{ gap: '4px' }}>
				<h1>Formulário de Orçamento</h1>
				<p>
					{formData.data?.id
						? `Código: ${formData.data?.id.toString().split('.')[1]}`
						: 'Novo orçamento'}
				</p>
			</DivColumn>
			<hr />
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
			<div style={{ flexGrow: 1 }} />
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
		</>
	)
}

import React from 'react'
import { DivColumn } from '../../../components/DivColumn'
import { Button } from '../../../components/button/Button'
import { DivRow } from '../../../components/DivRow'
import { useDatabase } from '../../../hooks/useDatabase'
import { Budget, Service } from '../../../types/Entities.type'
import { useNavigate } from 'react-router-dom'
import { useData } from '../../../hooks/useData'
import { useMessage } from '../../../hooks/useMessage'

export const BudgetFormPageSidebar = () => {
	const { showQuestion } = useMessage()
	const formModalData = useData<Service | null>('budgetServiceModal', null)
	const formData = useData<Budget>('budgetForm', {})
	const database = useDatabase<Budget>('budget')
	const navigate = useNavigate()

	return (
		<>
			<DivColumn style={{ width: '100%' }}>
				<Button
					leftIcon="add"
					style={{ width: '100%' }}
					variation="sidebar"
					onClick={() => {
						formModalData.setData({})
					}}
				>
					Novo Produto / Serviço
				</Button>
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
			<DivColumn style={{ width: '100%' }}>
				<Button
					leftIcon="save"
					variation="primary"
					style={{ width: '100%' }}
					onClick={() => {
						if (!formData.data?.id) {
							database.create(formData.data)
						} else {
							database.update(formData.data?.id, formData.data)
						}
						formData.setData(null)
						navigate('/budgets')
					}}
				>
					Salvar
				</Button>
				<DivRow>
					{formData.data?.id && (
						<Button
							leftIcon="delete"
							variation="sidebar"
							onClick={() => {
								showQuestion(
									'Deseja realmente excluir este orçamento?',
									'Esta operação não podera ser revertida.',
									() => {
										database.remove(formData.data?.id as number)
										formData.setData(null)
										navigate('/budgets')
									}
								)
							}}
						>
							Excluir
						</Button>
					)}
					<Button
						leftIcon="close"
						variation="sidebar"
						onClick={() => {
							formData.setData(null)
							navigate('/budgets')
						}}
					>
						Cancelar
					</Button>
				</DivRow>
			</DivColumn>
		</>
	)
}

import React from 'react'
import { Button } from '../../../components/button/Button'
import { useNavigate } from 'react-router-dom'
import { useData } from '../../../hooks/useData'
import { Customer } from '../../../types/Entities.type'
import { DivColumn } from '../../../components/DivColumn'
import { DivRow } from '../../../components/DivRow'
import { Toggle } from '../../../components/input/Toggle'
import { Label } from '../../../components/Label.style'
import { useDatabase } from '../../../hooks/useDatabase'
import { useMessage } from '../../../hooks/useMessage'

export const CustomerFormPageSidebar = () => {
	const { showQuestion } = useMessage()
	const formData = useData<Customer>('customerForm', {
		active: true,
	})
	const database = useDatabase<Customer>('customer')
	const navigate = useNavigate()

	return (
		<>
			<Label>Indicadores</Label>
			<Toggle
				label="Cliente Ativo"
				disabled={!formData.data?.id}
				value={formData.data?.active}
				onChange={(value) => {
					formData.data.active = value
					formData.setDataProp('value', formData.data)
				}}
			/>
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
						navigate('/customers')
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
									'Deseja realmente excluir este cliente?',
									'Esta operação não podera ser revertida.',
									() => {
										database.remove(formData.data?.id as number)
										formData.setData(null)
										navigate('/customers')
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
							navigate('/customers')
						}}
					>
						Cancelar
					</Button>
				</DivRow>
			</DivColumn>
		</>
	)
}

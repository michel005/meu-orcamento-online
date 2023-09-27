import React, { useEffect, useState } from 'react'
import style from '../../Page.module.scss'
import { useData } from '../../../hooks/useData'
import { Budget, Service } from '../../../types/Entities.type'
import { useDatabase } from '../../../hooks/useDatabase'
import { useNavigate, useParams } from 'react-router-dom'
import { BudgetFormServiceModal } from './BudgetFormServiceModal'
import { DateUtils } from '../../../utils/DateUtils'
import { ButtonOptions } from '../../../components/button/ButtonOptions'
import { FormTab } from './tabs/FormTab'
import { PreviewTab } from './tabs/PreviewTab'
import { DivRow } from '../../../components/DivRow'
import { Button } from '../../../components/button/Button'
import { useMessage } from '../../../hooks/useMessage'
import { Icon } from '../../../components/Icon'
import { HistoryTab } from './tabs/HistoryTab'

const FormOptions: { [key: string]: any } = {
	form: <FormTab />,
	preview: <PreviewTab />,
	history: <HistoryTab />,
}

export const BudgetFormPage = () => {
	const { showQuestion } = useMessage()
	const { budgetId } = useParams()
	const [loaded, setLoaded] = useState<boolean>(false)
	const formModalData = useData<Service | null>('budgetServiceModal', null)
	const formData = useData<Budget>('budgetForm', {
		date: DateUtils.dateToString(new Date()),
		status: 'pending',
	})
	const [currentTab, setCurrentTab] = useState<string>('form')
	const databaseBudget = useDatabase<Budget>('budget')
	const navigate = useNavigate()

	useEffect(() => {
		if (!loaded) {
			setLoaded(true)
			if (budgetId) {
				const find = databaseBudget.findById(parseFloat('0.' + budgetId))
				if (find) {
					formData.setData(find)
				} else {
					navigate('/budgets')
				}
			}
		}
	}, [loaded])

	return (
		<>
			<div className={style.toolbar}>
				<DivRow className={style.header}>
					<a
						onClick={() => {
							navigate('/budgets')
						}}
					>
						<h3>Orçamentos</h3>
					</a>
					<h3>
						<Icon icon="keyboard_arrow_right" />
					</h3>
					<h3>Formulário de Orçamento</h3>
				</DivRow>
				<Button
					leftIcon="save"
					variation="primary"
					onClick={() => {
						if (!formData.data?.id) {
							databaseBudget.create(formData.data)
						} else {
							if (!formData.data.history) {
								formData.data.history = []
							}
							formData.data.history.push({
								date: DateUtils.dateTimeToString(new Date()),
								value: structuredClone(formData.data),
							})
							databaseBudget.update(formData.data?.id, formData.data)
						}
						formData.setData(null)
						navigate('/budgets')
					}}
				>
					Salvar
				</Button>
				<Button
					leftIcon="add"
					variation="secondary"
					onClick={() => {
						formModalData.setData({
							amount: 1,
						})
					}}
				>
					Novo Produto / Serviço
				</Button>
				{formData.data?.id && (
					<Button
						leftIcon="delete"
						variation="secondary"
						onClick={() => {
							showQuestion(
								'Deseja realmente excluir este orçamento?',
								'Esta operação não podera ser revertida.',
								() => {
									databaseBudget.remove(formData.data?.id as number)
									formData.setData(null)
									navigate('/budgets')
								}
							)
						}}
					>
						Excluir
					</Button>
				)}
				{!formData.data?.id && (
					<Button
						leftIcon="close"
						onClick={() => {
							navigate('/budgets')
						}}
						variation="secondary"
					>
						Cancelar
					</Button>
				)}
			</div>
			<div className={style.page}>
				{formData?.data?.id && (
					<DivRow>
						<ButtonOptions
							variation="secondary"
							options={{
								form: 'Formulário',
								preview: 'Visualizar',
								history: 'Histórico',
							}}
							value={currentTab}
							onChange={setCurrentTab}
						/>
					</DivRow>
				)}
				{formData?.data?.id ? FormOptions?.[currentTab] : FormOptions.form}
				{formModalData.data && <BudgetFormServiceModal />}
			</div>
		</>
	)
}

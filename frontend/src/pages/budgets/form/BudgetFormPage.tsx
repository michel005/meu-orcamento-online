import React, { useEffect, useState } from 'react'
import style from '../../Page.module.scss'
import { useData } from '../../../hooks/useData'
import { Budget, Service } from '../../../types/Entities.type'
import { useDatabase } from '../../../hooks/useDatabase'
import { useNavigate, useParams } from 'react-router-dom'
import { BudgetFormServiceModal } from './BudgetFormServiceModal'
import { DateUtils } from '../../../utils/DateUtils'
import { ButtonOptions } from '../../../components/ButtonOptions'
import { FormTab } from './tabs/FormTab'
import { PreviewTab } from './tabs/PreviewTab'
import { DivRow } from '../../../components/DivRow'
import { Button } from '../../../components/button/Button'

const FormOptions: { [key: string]: any } = {
	form: <FormTab />,
	preview: <PreviewTab />,
}

export const BudgetFormPage = () => {
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
		<div className={style.page}>
			<DivRow style={{ alignItems: 'center' }}>
				<Button
					leftIcon="arrow_back"
					onClick={() => {
						navigate('/budgets')
					}}
					variation="secondary"
				/>
				<h1>Formulário de Orçamento</h1>
			</DivRow>
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
	)
}

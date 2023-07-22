import React, { useMemo } from 'react'
import { CardLayout } from '../../components/CardLayout'
import { Card } from '../../components/Card'
import { usePageData } from '../../hook/usePageData'
import { DateUtils } from '../../utils/DateUtils'
import { useFormLayout } from '../../hook/useFormLayout'
import { Table } from '../../components/Table'
import { Button } from '../../components/Button'
import { useDatabase } from '../../hook/useDatabase'
import { EatingRecordType } from '../../types/EatingRecordType'
import style from './index.module.scss'
import { useModalData } from '../../hook/useModalData'
import { List } from '../../components/List'
import { SortUtils } from '../../utils/SortUtils'
import { BarChart } from '../../components/BarChart'

export type EatingType = {
	currentDate?: {
		start?: string
		end?: string
	}
}

export const EatingPage = () => {
	const { find } = useDatabase<EatingRecordType>('eating')
	const { show } = useModalData<EatingRecordType>('eating')
	const today = new Date()
	const { data, updateData } = usePageData<EatingType>('eating', {
		currentDate: {
			start: DateUtils.dateToString(new Date(today.getFullYear(), today.getMonth(), 1)),
			end: DateUtils.dateToString(new Date(today.getFullYear(), today.getMonth() + 1, 0)),
		},
	})

	const form = useFormLayout<EatingType>({
		fields: [
			{
				id: 'currentDate',
				label: 'Data Atual',
				range: true,
				type: 'date',
			},
		],
		value: data,
		onChange: updateData,
	})

	const table: EatingRecordType[] = find({
		date: { $gte: data.currentDate?.start, $lte: data.currentDate?.end },
	})

	const foodByAmount = new Map(
		table
			.sort((x, y) => SortUtils.sort(x, y, 'food'))
			.map((x) => [
				x.food,
				table
					.filter((y) => y.food === x.food)
					.reduce((a, b) => a + parseInt((b.amount || '0') as string), 0),
			])
	)

	return (
		<>
			<h1>Alimentação</h1>
			<CardLayout>
				<div data-row>
					<div data-column style={{ flexGrow: 1 }}>
						<Card>
							<h2>O que você comeu hoje?</h2>
							<p>
								Registre todas as refeições do seu dia. Iremos analizar esses dados
								e te dar o máximo de informaçào possível.
							</p>
							<Button
								leftIcon={'add'}
								onClick={() => {
									show({
										date: DateUtils.dateToString(new Date()),
									})
								}}
							>
								Novo Registro
							</Button>
						</Card>

						{Array.from(foodByAmount.keys()).length > 0 && (
							<Card header="Consumo">
								<List
									itens={Array.from(foodByAmount.keys()).map((x) => {
										const food = table.find((a) => a.food === x)
										return {
											left: x,
											right:
												foodByAmount.get(x) +
												` ${food?.measureUnit?.id || 'un'}`,
										}
									})}
								/>
							</Card>
						)}

						{Array.from(foodByAmount.keys()).length > 0 && (
							<Card
								header="Recorrência"
								label={
									DateUtils.daysBetween(
										data.currentDate?.end || '',
										data.currentDate?.start || ''
									) + ' dia(s)'
								}
							>
								<List
									itens={Array.from(foodByAmount.keys()).map((x) => {
										return {
											left: x,
											right: table.filter((y) => y.food === x).length,
										}
									})}
								/>
							</Card>
						)}
					</div>
					<div data-column style={{ flexGrow: 3 }}>
						<Card>
							<div className={style.row}>
								{form.currentDate as string}{' '}
								<Button variation="link">{table.length} registro(s)</Button>
							</div>
						</Card>
						<Card
							header="Registro de Refeições do Período"
							label={`${data.currentDate?.start} - ${data.currentDate?.end}`}
						>
							<Table
								initialSort={{
									field: 'date',
									direction: 'ASC',
								}}
								definition={[
									{
										field: 'date',
										label: 'Date',
									},
									{
										field: 'shift',
										label: 'Turno',
									},
									{
										field: 'food',
										label: 'Alimento',
									},
									{
										field: 'amount',
										label: 'Quantidade',
										valueModifier: (row) =>
											`${row.amount} ${row?.measureUnit?.id || 'un'}`,
									},
								]}
								onClick={(row) => {
									show({ ...row })
								}}
								noDataFoundLabel={`Nenhum registro encontrado entre o dia ${data.currentDate?.start} e ${data.currentDate?.end}`}
								value={table}
							/>
						</Card>
					</div>
				</div>
			</CardLayout>
		</>
	)
}

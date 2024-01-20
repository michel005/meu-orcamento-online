import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { SessionUtils } from '../../../utils/SessionUtils'
import { BarChart } from '../../../components/BarChart'

export const ChartSellByMonth = () => {
	const [data, setData] = useState(null)

	useEffect(() => {
		if (!data) {
			axios
				.get(
					`/dashboard/sellingByMonth/${new Date().getFullYear()}/${new Date().getMonth()}`,
					SessionUtils.getHeader()
				)
				.then((response) => {
					setData(response.data)
				})
		}
	}, [data])

	if (!data) {
		return <h1>Carregando...</h1>
	}

	return <BarChart title="Vendas por Mês" values={data} />
}

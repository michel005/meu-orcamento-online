export const MonthName: any = {
	janeiro: 'Janeiro',
	fevereiro: 'Fevereiro',
	marco: 'Março',
	abril: 'Abril',
	maio: 'Maio',
	junho: 'Junho',
	julho: 'Julho',
	agosto: 'Agosto',
	setembro: 'Setembro',
	outubro: 'Outubro',
	novembro: 'Novembro',
	dezembro: 'Dezembro',
}

export const MonthByNumber = (monthNumber: number) => {
	return MonthName[
		Object.keys(MonthName).find((_, index) => index + 1 === monthNumber) || 'janeiro'
	]
}

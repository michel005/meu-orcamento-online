export class NumberUtils {
	static numberToCurrency = (value: number) => {
		return (value / 100).toLocaleString('pt-br', {
			style: 'currency',
			currency: 'BRL',
		})
	}
}

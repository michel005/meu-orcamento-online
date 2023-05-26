export class DateUtils {
	static dateToString = (date: Date | null) => {
		return date?.toLocaleDateString?.('pt-BR') || ''
	}

	static dateTimeToString = (date: Date | null) => {
		return date?.toLocaleString?.('pt-BR') || ''
	}

	static stringToDate = (date: String) => {
		let temp = date.split('/')
		return new Date(parseInt(temp[2]), parseInt(temp[1]) - 1, parseInt(temp[0]))
	}

	static stringToDateTime = (date: String) => {
		let tempDate = date.split(' ')[0].split('/')
		let tempTime = date.split(' ')[0].split(':')
		return new Date(
			parseInt(tempDate[2]),
			parseInt(tempDate[1]) - 1,
			parseInt(tempDate[0]),
			parseInt(tempTime[0]),
			parseInt(tempTime[1]),
			parseInt(tempTime[2])
		)
	}

	static betweenString = (value: string, start: string, end: string) => {
		return DateUtils.between(
			DateUtils.stringToDate(value),
			DateUtils.stringToDate(start),
			DateUtils.stringToDate(end)
		)
	}

	static between = (value: Date, start: Date, end: Date) => {
		return value >= start && value <= end
	}
}

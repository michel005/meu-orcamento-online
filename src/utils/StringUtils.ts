export class StringUtils {
	static initialLetters = (value: string, size = 2) => {
		return value.split(' ').reduce((previousValue, currentValue, currentIndex, array) => {
			if (currentIndex < size - 1 || currentIndex === size) {
				return previousValue + currentValue?.[0]
			}
			if (currentIndex > size) {
				return previousValue
			}
			return currentIndex < size - 1 ? previousValue + currentValue?.[0] || '' : previousValue
		}, '')
	}
}

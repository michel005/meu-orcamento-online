export class StringUtils {
	static initialLetters = (value: string) => {
		const slices = value.split(' ')
		if (slices.length === 0) {
			return 'NF'
		}
		if (slices.length === 1) {
			return slices[0].substring(0, 2)
		} else {
			return slices[0].substring(0, 1) + slices.pop().substring(0, 1)
		}
	}
}

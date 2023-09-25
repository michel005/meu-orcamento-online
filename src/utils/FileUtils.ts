export class FileUtils {
	static fileToBase64 = (file: File, callback: (value: string) => void) => {
		const FR = new FileReader()

		FR.addEventListener('load', (evt) => {
			callback(evt?.target?.result?.toString() || '')
		})

		FR.readAsDataURL(file)
	}
}

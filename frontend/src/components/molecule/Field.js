import { FieldStyle } from './FieldStyle'

export const Field = ({ label, type, value, onChange, placeholder, letterLimit = 0 }) => {
	const length = Object.keys(value || '').length

	return (
		<FieldStyle>
			<label>
				{label}{' '}
				{letterLimit > 0 && (
					<>
						({length} / {letterLimit})
					</>
				)}
			</label>
			{type === 'area' ? (
				<textarea
					type={type}
					value={value}
					onChange={(e) => {
						if (Object.keys(e.target.value).length <= letterLimit) {
							onChange(e.target.value)
						} else {
							onChange(e.target.value.substring(0, 1000))
						}
					}}
					placeholder={placeholder}
				/>
			) : (
				<input
					type={type}
					value={value}
					onChange={(e) => {
						if (Object.keys(e.target.value).length <= letterLimit) {
							onChange(e.target.value)
						} else {
							onChange(e.target.value.substring(0, 1000))
						}
					}}
					placeholder={placeholder}
				/>
			)}
		</FieldStyle>
	)
}

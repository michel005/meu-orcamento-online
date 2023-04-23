import { FieldStyle } from './FieldStyle'

export const Field = ({ label, type, value, onChange, placeholder }) => {
	return (
		<FieldStyle>
			<label>{label}</label>
			<input
				type={type}
				value={value}
				onChange={(e) => onChange(e.target.value)}
				placeholder={placeholder}
			/>
		</FieldStyle>
	)
}

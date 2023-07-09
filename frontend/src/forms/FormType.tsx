export type FormType<T> = {
	entity: T
	onChange: (entity: T) => void
}

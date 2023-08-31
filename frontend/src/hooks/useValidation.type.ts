export type useValidationType<T> = (value: T | null, errors: Map<string, string>) => void

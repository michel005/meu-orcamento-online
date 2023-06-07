export type AccountCategoriesType = 'DEBIT' | 'CREDIT' | 'SAVINGS' | 'INVESTMENTS' | 'SALARY'

export type AccountType = {
	id?: string | null
	name: string
	category: AccountCategoriesType
}

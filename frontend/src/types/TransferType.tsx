import { AccountType } from './AccountType'

export type TransferType = {
	id: string
	date: string
	accountOrigin: AccountType
	accountDestiny: AccountType
	description: string
	value: number
}

import { Account } from '../context/DatabaseContext'

export type TransferType = {
	id: string
	date: string
	accountOrigin: Account
	accountDestiny: Account
	description: string
	value: number
}

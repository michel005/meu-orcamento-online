import { Entity } from '../context/DatabaseContext'

export type RepetitionType = {
	numberOfSeries: number
	numberOfRepetitions: number
}

export type FailType = {
	numberOfSeries: number
}

export type DropType = {
	numberOfSeries: number
	numberOfRepetitions: number
	numberOfDrops: number
}

export type RunningType = {
	time: string
	distance: number
}

export type GymTrainingExercise = {
	name: string
	description?: string
	type?: 'repetition' | 'fail' | 'drop' | 'running'
	details?: RepetitionType | FailType | DropType | RunningType
}

export interface GymTrainingType extends Entity {
	name: string
	description?: string
	expirationDate?: string
	exercises?: GymTrainingExercise[]
}

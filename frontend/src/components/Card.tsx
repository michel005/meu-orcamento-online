import React from 'react'
import style from './Card.module.scss'

export const Card = ({ ...props }) => {
	return <div {...props} className={style.card} />
}

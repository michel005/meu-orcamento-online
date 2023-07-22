import React, { HTMLProps } from 'react'
import style from './List.module.scss'

export type ListType = {
	itens: (
		| {
				left?: any
				right?: any
		  }
		| any
	)[]
} & HTMLProps<HTMLDivElement>

export const List = ({ itens, ...props }: ListType) => {
	return (
		<div {...props} className={`${style.list} ${props.className}`}>
			{itens.map((listItem, listItemKey) => {
				return (
					<div className={style.listItem} key={listItemKey}>
						{listItem.left && <div className={style.left}>{listItem.left}</div>}
						{listItem.right && <div className={style.right}>{listItem.right}</div>}
						{!listItem.left && !listItem.right && listItem}
					</div>
				)
			})}
		</div>
	)
}

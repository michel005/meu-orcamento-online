import React, { MouseEventHandler } from 'react'
import { Button } from './Button'
import style from './Path.module.scss'

export type PathType = {
	paths: {
		name: any
		icon?: string
		onClick?: MouseEventHandler
	}[]
}

export const Path = ({ paths }: PathType) => {
	return (
		<div className={style.path}>
			{paths.map((path, pathKey) => {
				return (
					<Button
						key={pathKey}
						className={style.pathLink}
						leftIcon={path.icon}
						variation="link"
						onClick={path.onClick}
						data-current={!!path.onClick}
						data-first={pathKey === 0}
						rightIcon={pathKey < paths.length - 1 ? 'chevron_right' : ''}
					>
						{path.name}
					</Button>
				)
			})}
		</div>
	)
}

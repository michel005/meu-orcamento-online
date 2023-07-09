import React, { MouseEventHandler } from 'react'
import { Button } from './Button'
import style from './Path.module.scss'
import { IconType } from '../types/IconType'

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
			<div className={style.insidePath}>
				{paths.map((path, pathKey) => {
					return (
						<Button
							key={pathKey}
							className={style.pathLink}
							leftIcon={path.icon as IconType}
							variation="link"
							onClick={path.onClick}
							data-current={!!path.onClick}
							rightIcon={pathKey < paths.length - 1 ? 'chevron_right' : null}
						>
							{path.name}
						</Button>
					)
				})}
			</div>
		</div>
	)
}

import React from 'react'
import style from './ProgressBar.module.scss'
import { CSSProperties } from 'styled-components'

export const ProgressBar = ({ progress, progress2 }: { progress: number; progress2?: number }) => {
	return (
		<div
			className={style.progressBar}
			style={
				progress2
					? ({
							'--value': progress + '%',
							'--value2': (progress2 || 0) + '%',
					  } as CSSProperties)
					: ({ '--value': progress + '%' } as CSSProperties)
			}
		/>
	)
}

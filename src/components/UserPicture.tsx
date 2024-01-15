import React, { CSSProperties, useEffect, useState } from 'react'
import style from './UserPicture.module.scss'
import { StringUtils } from '../utils/StringUtils'
import { useInView } from 'react-intersection-observer'
import { usePicture } from '../hooks/usePicture'

export const UserPicture = ({
	picture,
	onClick = undefined,
	className = '',
	type = 'circle',
	name = '',
	placeholder = undefined,
	size = '50px',
	dataCallback = (value: any) => {},
	...props
}) => {
	const { load } = usePicture()
	const [data, setData] = useState<{
		status: 'LOADING' | 'LOADED' | 'FALLBACK'
		value: any
	}>({
		status: 'FALLBACK',
		value: null,
	})
	const [expand, setExpand] = useState(false)
	const [ref, inView] = useInView({
		triggerOnce: true,
	})

	useEffect(() => {
		if (!inView) return
		if (data.status === 'LOADING') {
			if (picture) {
				load(picture)
					.then((response) => {
						dataCallback?.(response)
						setData((x) => {
							x.status = 'LOADED'
							x.value = response
							return { ...x }
						})
					})
					.catch(() => {
						dataCallback?.(null)
						setData((x) => {
							x.status = 'FALLBACK'
							x.value = null
							return { ...x }
						})
					})
			} else {
				setData((x) => {
					dataCallback?.(null)
					x.status = 'FALLBACK'
					x.value = null
					return { ...x }
				})
			}
		}
	}, [data, inView])

	useEffect(() => {
		if (inView) {
			setData((x) => {
				x.status = 'LOADING'
				return { ...x }
			})
		}
	}, [picture, inView])

	if (data.status === 'LOADING') {
		return (
			<div
				ref={ref}
				{...props}
				title={name}
				onClick={onClick}
				className={`${style.userPicture} ${className}`}
				style={{ '--size': size, ...props.style } as CSSProperties}
				data-format={type}
				data-have-onclick={!!onClick}
				data-picture-component
			>
				{placeholder ? (
					<div data-picture className={`${style.initialLetters} ${style.placeholder}`}>
						{placeholder}
					</div>
				) : (
					<div data-picture className={style.initialLetters}>
						{StringUtils.initialLetters(name).toUpperCase()}
					</div>
				)}
			</div>
		)
	}

	return (
		<>
			<div
				ref={ref}
				{...props}
				title={name}
				onClick={onClick}
				className={`${style.userPicture} ${className}`}
				style={{ '--size': size, ...props.style } as CSSProperties}
				data-format={type}
				data-have-onclick={!!onClick}
				data-picture-component
			>
				{data && data.status !== 'FALLBACK' ? (
					<img
						src={data.value}
						onDoubleClick={() => {
							setExpand(true)
						}}
						data-picture
					/>
				) : (
					<>
						{placeholder ? (
							<div
								data-picture
								className={`${style.initialLetters} ${style.placeholder}`}
							>
								{placeholder}
							</div>
						) : (
							<div data-picture className={style.initialLetters}>
								{StringUtils.initialLetters(name).toUpperCase()}
							</div>
						)}
					</>
				)}
			</div>
			{data && data.status !== 'FALLBACK' && expand && (
				<div
					className={style.preview}
					onClick={() => {
						setExpand(false)
					}}
				>
					<img src={data.value} />
				</div>
			)}
		</>
	)
}

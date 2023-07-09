import React, { HTMLProps, HtmlHTMLAttributes, useState } from 'react'
import style from './Modal.module.scss'
import styleButton from './Button.module.scss'
import { Button, ButtonType } from './Button'
import { Tabs, TabsType } from './Tabs'

export type ModalType = HtmlHTMLAttributes<HTMLDivElement> & {
	header?: any
	onClose?: () => void
	children: any | null | undefined
	tabs?: TabsType
	buttons?: (ButtonType | null)[]
	noOverflow?: boolean
	messageMode?: boolean
}

export const Modal = ({
	header,
	tabs,
	buttons,
	children,
	onClose = () => null,
	noOverflow = false,
	messageMode = false,
	...props
}: ModalType) => {
	const [expand, setExpand] = useState(false)

	return (
		<div
			{...props}
			className={`${style.modal} ${props.className}`}
			data-no-overflow={noOverflow}
			data-expand={expand}
			data-message={messageMode}
		>
			<div className={style.content}>
				{header && (
					<div className={style.header}>
						<span>{header}</span>
						{!messageMode && (
							<Button
								leftIcon={expand ? 'fullscreen_exit' : 'fullscreen'}
								variation="link"
								className={`${styleButton.button} ${style.closeButton}`}
								onClick={() => {
									setExpand((x) => !x)
								}}
							/>
						)}
						<Button
							leftIcon="close"
							variation="link"
							className={`${styleButton.button} ${style.closeButton}`}
							onClick={onClose}
						/>
					</div>
				)}
				{!header && onClose && (
					<div className={style.header}>
						<div style={{ flexGrow: 1 }} />
						{!messageMode && (
							<Button
								leftIcon={expand ? 'fullscreen_exit' : 'fullscreen'}
								variation="link"
								className={`${styleButton.button} ${style.closeButton}`}
								onClick={() => {
									setExpand((x) => !x)
								}}
							/>
						)}
						<Button
							leftIcon="close"
							variation="link"
							className={`${styleButton.button} ${style.closeButton}`}
							onClick={onClose}
						/>
					</div>
				)}
				{tabs && <Tabs {...tabs} className={style.tabs} />}
				<div className={style.insideContent}>{children}</div>
				{buttons && (
					<div className={style.buttons}>
						{buttons
							.filter((button) => button)
							.map((button, buttonKey) => (
								<Button {...button} key={buttonKey} />
							))}
					</div>
				)}
			</div>
		</div>
	)
}

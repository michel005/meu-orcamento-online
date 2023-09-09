import React, { useState } from 'react'
import { InputGroupStyle } from './InputGroup.style'
import { InputGroupType } from './InputGroup.type'
import { Icon } from '../Icon'

export const InputGroup = ({ icon, title, subTitle, showDefault, children }: InputGroupType) => {
	const [show, setShow] = useState<boolean>(showDefault || true)

	return (
		<InputGroupStyle data-show={show}>
			<header>
				<a
					onClick={() => {
						setShow((x) => !x)
					}}
				>
					<h3>
						{icon && <Icon icon={icon} />} {title}
					</h3>
				</a>
				{subTitle && <div className="subTitle">{subTitle}</div>}
			</header>
			{show && <section className="content">{children}</section>}
		</InputGroupStyle>
	)
}

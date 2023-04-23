import { useModal } from 'hook/useModal'
import { CardStyle } from './CardStyle'
import { EMPTY_FUNCTION } from 'constants/GeneralConstants'
import { LeftRightSide } from './LeftRightSide'
import { Photo } from './Photo'

export const Card = ({ icon, header, color, children, modalContent, modalPhoto }) => {
	const { show } = useModal('card')

	return (
		<CardStyle color={color}>
			<button
				data-link
				data-icon={icon}
				data-has-click={!!modalContent}
				className="header"
				onClick={
					modalContent
						? () =>
								show(
									<LeftRightSide
										data-modal
										left={
											<>
												<h1>{header}</h1>
												<p>{modalContent}</p>
											</>
										}
										right={modalPhoto && <Photo src={modalPhoto} />}
									/>
								)
						: EMPTY_FUNCTION
				}
			>
				{header}
			</button>
			<hr />
			<div className="content">{children}</div>
		</CardStyle>
	)
}

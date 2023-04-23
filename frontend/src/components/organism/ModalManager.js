import { ConfigContext } from 'hook'
import { useContext, useEffect } from 'react'

export const ModalManager = () => {
	const { modal, closeModal } = useContext(ConfigContext)

	useEffect(() => {
		Object.keys(modal)
			.filter((mod) => modal[mod])
			.forEach((mod) => {
				document.getElementById(`dialog_modal_${mod}`).showModal()
				document.getElementById(`dialog_modal_${mod}`).addEventListener('cancel', (event) => {
					event.preventDefault()
				})
			})
	}, [modal])

	return (
		<>
			{Object.keys(modal)
				.filter((mod) => modal[mod])
				.map((mod, modKey) => {
					const instance = modal[mod]
					return (
						<dialog key={modKey} id={`dialog_modal_${mod}`}>
							<div className="content">
								<button data-link className="closeButton" onClick={() => closeModal(mod)}>
									<span className="icon">close</span>
								</button>
								{instance}
							</div>
						</dialog>
					)
				})}
		</>
	)
}

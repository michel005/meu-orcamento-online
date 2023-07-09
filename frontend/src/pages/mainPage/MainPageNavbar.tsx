import React from 'react'
import style from './MainPageNavbar.module.scss'
import { Button } from '../../components/Button'
import { Bag } from '../../components/Bag'
import { Image } from '../../components/Image'
import { useDatabase } from '../../hook/useDatabase'
import { CustomerType } from '../../utils/CustomerType'

export const MainPageNavbar = () => {
	const { content } = useDatabase<CustomerType>('customer')
	const myUser = content.find((x) => x.fullName === 'Michel Douglas Grigoli')

	return (
		<div className={style.mainPageNavbar}>
			<div className={style.centered}>
				<Button className={style.header} leftIcon="store" variation="link">
					Meu Restaurante
				</Button>
				<div className={style.grow} />
				<div className={style.options}>
					<Button leftIcon="mail" variation="link">
						<Bag color="red" className={style.bag} fixed={true} side="right">
							+9
						</Bag>
					</Button>
					<Button leftIcon="notifications" variation="link">
						<Bag color="red" className={style.bag} fixed={true} side="right">
							+9
						</Bag>
					</Button>
				</div>
				<div className={style.user}>
					{myUser?.profilePicture && <Image {...myUser.profilePicture} />}
					<Button
						className={style.userButton}
						rightIcon="arrow_drop_down"
						variation="link"
					>
						{myUser?.fullName}
					</Button>
				</div>
			</div>
		</div>
	)
}

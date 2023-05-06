import React from 'react'
import { FlexColumn } from '../../components/FlexColumn'
import { FlexRow } from '../../components/FlexRow'
import { RFLogo } from '../../assets/RFLogo'

export const HomePage = () => {
	return (
		<>
			<FlexRow className="firstBlock">
				<FlexRow className="centered">
					<h1>Um sistema completo para seu restaurante</h1>
					<h1 className="right">Para pequenos, médios e grandes negócios</h1>
				</FlexRow>
				<RFLogo className="plateLogo" />
			</FlexRow>
			<FlexRow className="secondBlock">
				<img src="https://i.pinimg.com/564x/2a/f1/eb/2af1eb4feba685af8eaae7123d48cb78.jpg" />
				<img src="https://i.pinimg.com/564x/bb/f6/3d/bbf63dad349c58850632f81cde7a36f3.jpg" />
				<img src="https://i.pinimg.com/564x/a6/4c/af/a64caf2b762d8d7682cf17556614a6ec.jpg" />
				<img src="https://i.pinimg.com/564x/7e/88/ff/7e88ff6bbf0d8b04eb1795e2d31b84b9.jpg" />
				<img src="https://i.pinimg.com/564x/be/eb/41/beeb419d2ef5709f80f42a5b3dfe5c11.jpg" />
				<img src="https://i.pinimg.com/564x/e1/93/71/e19371977609a25f958cacc302399aaa.jpg" />
			</FlexRow>
			<FlexColumn className="thirdBlock">
				<FlexRow data-responsive>
					<FlexColumn data-grow style={{ width: '100%' }}>
						<h1>Tenha tudo que precisa</h1>
						<p>
							Nostrud Lorem quis sint veniam qui elit sunt commodo et laboris veniam
							fugiat. Laboris labore excepteur magna eiusmod consequat. Adipisicing
							officia dolore ut ipsum esse fugiat consectetur excepteur officia elit
							culpa. In sunt velit ad labore sint aliquip do id duis veniam. Deserunt
							reprehenderit consectetur voluptate quis fugiat aliquip in quis.
						</p>
						<p>
							Commodo incididunt ex magna proident laboris in pariatur sit elit aute
							incididunt consectetur ad. Cillum adipisicing veniam non esse. Esse
							cupidatat aliquip nisi ut aliqua duis adipisicing est. Labore
							adipisicing reprehenderit sunt ex cillum ad aliqua reprehenderit. Enim
							eu ex eiusmod voluptate non nostrud nulla nostrud commodo laborum. Lorem
							magna exercitation fugiat fugiat nisi adipisicing non et.
						</p>
					</FlexColumn>
					<img
						data-grow
						src="https://i.pinimg.com/564x/e8/40/1a/e8401a3964073f49eb4af11644ce651b.jpg"
						style={{ width: '100%', maxHeight: '300px' }}
						loading="lazy"
						placeholder="Imagem"
					/>
				</FlexRow>
				<hr />
			</FlexColumn>
			<FlexColumn className="thirdBlock">
				<h1>Precisa impulsionar seu restaurante?</h1>
				<p>
					Nulla mollit laboris quis cillum sint proident. Nulla proident officia sunt sint
					excepteur in labore aliquip fugiat. Lorem amet mollit non quis Lorem. Cupidatat
					elit tempor incididunt occaecat sint non excepteur non ea nisi eu nisi.
				</p>
				<p>
					Est et ullamco cillum quis in nulla labore commodo consectetur nostrud
					adipisicing. Incididunt in labore incididunt anim anim nulla quis dolor. Aliqua
					Lorem commodo tempor occaecat et nisi id ut eu nulla enim. Nostrud fugiat
					nostrud incididunt id consequat aliquip excepteur. Ea excepteur excepteur qui
					irure sint quis anim laborum ullamco ipsum proident. Sunt nostrud consequat elit
					ad ut veniam.
				</p>
				<p>
					Fugiat incididunt occaecat laboris sint aute nulla ullamco mollit adipisicing
					adipisicing. Sunt ipsum labore tempor ipsum commodo est aliquip sit commodo.
					Cillum est anim adipisicing fugiat. Incididunt elit excepteur exercitation
					culpa. Fugiat anim tempor anim ad mollit voluptate in minim id commodo officia
					veniam minim aute. Proident elit voluptate eiusmod nostrud ut eiusmod qui.
				</p>
			</FlexColumn>
			<FlexColumn className="thirdBlock">
				<hr />
				<FlexRow data-responsive>
					<img
						data-grow
						src="https://i.pinimg.com/564x/f6/a2/89/f6a289ec54a02a59f5260d25da5b2ac5.jpg"
						style={{ width: '100%', maxHeight: '300px' }}
						loading="lazy"
					/>
					<FlexColumn data-grow style={{ width: '100%' }}>
						<h1>Nos adaptamos ao seu modelo de negócio</h1>
						<p>
							Ea tempor eu velit duis aliquip ex id officia cillum consectetur
							excepteur irure. Est laboris ut nisi velit excepteur laborum nisi
							voluptate consectetur veniam. Nulla laboris id et ex eiusmod laboris in
							excepteur anim anim velit nulla. Sint nulla exercitation ut do
							adipisicing elit. Labore esse culpa magna eiusmod. Et Lorem ad minim
							nulla excepteur ipsum quis in non occaecat cupidatat. Et veniam occaecat
							labore veniam quis tempor tempor sint mollit minim ea sit. Occaecat
							consectetur pariatur minim eiusmod amet esse. Velit laborum magna sit
							ipsum sint non. Id cupidatat veniam aute dolore laborum.
						</p>
						<p>
							Commodo incididunt ex magna proident laboris in pariatur sit elit aute
							incididunt consectetur ad. Cillum adipisicing veniam non esse. Esse
							cupidatat aliquip nisi ut aliqua duis adipisicing est. Labore
							adipisicing reprehenderit sunt ex cillum ad aliqua reprehenderit. Enim
							eu ex eiusmod voluptate non nostrud nulla nostrud commodo laborum. Lorem
							magna exercitation fugiat fugiat nisi adipisicing non et.
						</p>
					</FlexColumn>
				</FlexRow>
				<hr />
			</FlexColumn>
			<FlexColumn className="thirdBlock">
				<FlexRow data-responsive>
					<FlexColumn data-grow style={{ width: '100%' }}>
						<h1>Escalável, robusto e abrangente</h1>
						<p>
							Ea tempor eu velit duis aliquip ex id officia cillum consectetur
							excepteur irure. Est laboris ut nisi velit excepteur laborum nisi
							voluptate consectetur veniam. Nulla laboris id et ex eiusmod laboris in
							excepteur anim anim velit nulla. Sint nulla exercitation ut do
							adipisicing elit. Labore esse culpa magna eiusmod. Et Lorem ad minim
							nulla excepteur ipsum quis in non occaecat cupidatat. Et veniam occaecat
							labore veniam quis tempor tempor sint mollit minim ea sit. Occaecat
							consectetur pariatur minim eiusmod amet esse. Velit laborum magna sit
							ipsum sint non. Id cupidatat veniam aute dolore laborum.
						</p>
						<p>
							Commodo incididunt ex magna proident laboris in pariatur sit elit aute
							incididunt consectetur ad. Cillum adipisicing veniam non esse. Esse
							cupidatat aliquip nisi ut aliqua duis adipisicing est. Labore
							adipisicing reprehenderit sunt ex cillum ad aliqua reprehenderit. Enim
							eu ex eiusmod voluptate non nostrud nulla nostrud commodo laborum. Lorem
							magna exercitation fugiat fugiat nisi adipisicing non et.
						</p>
					</FlexColumn>
					<img
						data-grow
						src="https://i.pinimg.com/564x/4a/d8/0c/4ad80ce869c32901e89738d16c0d3be4.jpg"
						style={{ width: '100%', maxHeight: '300px' }}
						loading="lazy"
					/>
				</FlexRow>
			</FlexColumn>
		</>
	)
}

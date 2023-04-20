import { LeftRightSideStyle } from './LeftRightSideStyle'

export const LeftRightSide = ({ left, right }) => {
	return (
		<LeftRightSideStyle>
			<div className="leftSide">{left}</div>
			<div className="rightSide">{right}</div>
		</LeftRightSideStyle>
	)
}

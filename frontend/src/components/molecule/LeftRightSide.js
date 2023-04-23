import { LeftRightSideStyle } from './LeftRightSideStyle'

export const LeftRightSide = ({ left, right, ...props }) => {
	return (
		<LeftRightSideStyle {...props}>
			<div className="leftSide">{left}</div>
			<div className="rightSide">{right}</div>
		</LeftRightSideStyle>
	)
}

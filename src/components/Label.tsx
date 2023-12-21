import styled from 'styled-components'

export const Label = styled.div`
	background-color: #fff;
	border: 1px solid ${(props) => props.color || '#aaa'};
	border-radius: var(--border-radius);
	color: ${(props) => props.color || '#aaa'};
	font-size: 0.8em;
	padding: 7px 10px;
`

import styled from 'styled-components';

export const Box = styled.div`
	background: transparent;
	position: center;
@media (max-width: 1000px) {
	padding: 70px 30px;
}
`;

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	width: 100%;
	margin: 0 auto;
	/* background: red; */
`

export const Column = styled.div`
	display: flex;
	flex-direction: column;
	text-align: left;
	margin-left: 60px;
`;

export const Row = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fill,
							minmax(185px, 1fr));
	grid-gap: 10%;

@media (max-width: 1000px) {
	grid-template-columns: repeat(auto-fill,
						minmax(200px, 1fr));
}
`;

export const FooterLink = styled.a`
	color: #fff;
	margin-bottom: 20px;
	font-size: 16px;
	text-decoration: none;

&:hover {
	color: #febf10;
	transition: 200ms ease-in;
}
`;

export const Heading = styled.p`
	font-size: 22px;
	color: #fff;
	margin-bottom: 20px;
	font-weight: bold;
`;

export const H2 = styled.h2`
	color: #fff;
	text-align: center;

@media screen and (max-width:800px){
	font-size: 15px;
}
`;

export const P = styled.p`
	color: #fff;
	text-align: center;

@media screen and (max-width:800px){
	font-size: 15px;
}
`;

export const Sec = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
`
export const Icon = styled.div`
	width: 50px;
	height: 50px;
	margin: 2%;
`
export const Image = styled.img`
	width: 50px;
	height: 50px;
`
export const HR = styled.hr`
        border: none;
        background: #ffffff2d;
        height: 2px;
        margin: 10px 0;
`
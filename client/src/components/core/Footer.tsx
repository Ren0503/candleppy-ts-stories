import React from 'react';
import styled from 'styled-components';
import { theme } from 'styles/theme';
import { Container, Flex } from 'styles/Layout';

const StyledFooter = styled.footer`
	background-color: ${theme.colors.background};
	color: #fff;
	padding: 100px 0 60px;

	ul {
		list-style-type: none;
	}

	ul li {
		margin-bottom: 20px;
	}

	p {
		text-align: right;
	}

	@media (max-width: ${theme.size.mobile}) {
		text-align: center;
		
		ul {
			padding: 0;
		}
		
		p {
			text-align: center;
		}
	}
`;

const Footer = () => {
	return (
		<StyledFooter>
			<Container>
				<Flex>
					<ul>
						<li>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
							eiusmod tempor incididunt ut labore et dolore magna aliqua
						</li>
						<li>+1-543-123-4567</li>
						<li>example@huddle.com</li>
					</ul>
					<ul>
						<li>About Us</li>
						<li>What We Do</li>
						<li>FAQ</li>
					</ul>

					<ul>
						<li>Career</li>
						<li>Blog</li>
						<li>Contact Us</li>
					</ul>
				</Flex>

				<p>&copy; 2021 Huddle. All rights reserved</p>
			</Container>
		</StyledFooter>
	);
};

export default Footer;

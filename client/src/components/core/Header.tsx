import React from 'react';
import styled from 'styled-components';
import { theme } from 'styles/theme';
import { Container, Flex } from 'styles/Layout';
import { Button } from 'styles/Button';

const StyledHeader = styled.header`
    background-color: ${theme.colors.background};
    padding: ${theme.spacing.lg} ${theme.spacing.none};
`;

export const Nav = styled.nav`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: ${theme.spacing.lg};

    @media (max-width: ${theme.size.mobile}) {
        flex-direction: column;
    }
`;

export const Logo = styled.img`
    @media (max-width: ${theme.size.mobile}) {
        margin-bottom: ${theme.spacing.lg};
    }
`;

export const Image = styled.img`
    width: 375px;
    margin-left: ${theme.spacing.lg};

    @media (max-width: ${theme.size.mobile}) {
        margin: ${theme.spacing.lg} 0 ${theme.spacing.md};
    }
`;

const Header = () => {
    return (
        <StyledHeader>
            <Container>
                <Nav>
                    <Logo src='./images/logo.svg' alt='' />
                    <Button>Try It Free</Button>
                </Nav>

                <Flex>
                    <div>
                        <h1>Build The Community Your Fans Will Love</h1>

                        <p>
                            Huddle re-imagines the way we build communities. You have a voice,
                            but so does your audience. Create connections with your users as
                            you engage in genuine discussion.
                        </p>

                        <Button>
                            Get Started For Free
                        </Button>
                    </div>

                    <Image src='./images/illustration-mockups.svg' alt='' />
                </Flex>
            </Container>
        </StyledHeader>
    )
}

export default Header

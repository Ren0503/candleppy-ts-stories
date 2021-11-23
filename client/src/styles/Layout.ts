import styled from 'styled-components';
import { theme } from './theme';

export const Container = styled.div`
    width: 1000px;
    max-width: 100%;
    padding: ${theme.spacing.none} ${theme.spacing.sm};
    margin: ${theme.spacing.none} auto;
`;

export const Flex = styled.div`
    display: flex;
    align-items: center;

    & > div,
    & > ul {
        flex: 1;
    }

    @media (max-width: ${theme.size.mobile}) {
        flex-direction: column;
        text-align: center;
    }
`;
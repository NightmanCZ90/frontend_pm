import { IconButton } from '@suid/material';
import { styled } from 'solid-styled-components';

interface IStyledSideNavigationProps {

}

export const StyledSideNavigation = styled("div") <IStyledSideNavigationProps>`
    position: sticky;
    height: 100vh;
    top: 0;
    background-color: #423c3c;
    width: 3.5rem;
    padding: 0.5rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .navigation-main {
      button {
        margin-bottom: 0.5rem;
      }
    }

    .navigation-user {
      button {
        margin-top: 0.5rem;
      }
    }
`;

export const StyledNavigationButton = styled(IconButton)`
  color: #fff;

  &:hover {
    color: #f9ba48;
  }
`;
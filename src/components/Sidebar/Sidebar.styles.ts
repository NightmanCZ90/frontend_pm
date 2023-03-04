import { Box } from '@suid/material';
import { styled } from 'solid-styled-components';
import { Colors } from '../../styles/theme';

interface IStyledSidebarProps {
  colors: Colors;
  isExpanded: boolean;
}

export const StyledSidebar = styled(Box) <IStyledSidebarProps>`
  background-color: ${props => props.colors?.primary[400]};
  width: ${({ isExpanded }) => isExpanded ? '200px' : '60px'};

    .menu-section {
      padding: 15px 0 5px 20px;
    }

    a {
      text-decoration: none;

      button {
        border-radius: 0;
        justify-content: flex-start;
        padding: 16px 20px;

        span.MuiButton-startIcon {
          margin-right: 16px;
        }

        &.active {
          color: ${props => props.colors?.greenAccent[200]};
          background-color: ${props => props.colors?.greenAccent[800]};
        }
      }
    }
`;
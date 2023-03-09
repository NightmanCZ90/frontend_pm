import { Box } from '@suid/material';
import { styled } from 'solid-styled-components';
import { Colors } from '../../../styles/theme';

interface IStyledSidebarProps {
  colors: Colors;
  isExpanded: boolean;
}

export const StyledSidebar = styled(Box) <IStyledSidebarProps>`
  background-color: ${props => props.colors?.primary[400]};
  width: ${({ isExpanded }) => isExpanded ? '200px' : '66px'};
  transition: all 0.5s;
  overflow: hidden;

  .expand-button {
    display: flex;
    justify-content: flex-end;
    padding: 8px;
  }

  .menu-section {
    padding: 5px 0 5px 20px;
    height: 30px;
    display: flex;
    align-items: center;

    .break {
      height: 2px;
      width: 24px;
      background-color: ${props => props.colors?.grey[300]};
    }
  }

  a {
    text-decoration: none;

    button {
      border-radius: 0;
      justify-content: flex-start;
      padding: 16px 20px;

      span.MuiButton-startIcon {
        margin: 0;
      }
      span.button-label {
        margin-left: 16px;
        height: 22px;
      }

      &.active {
        color: ${props => props.colors?.greenAccent[200]};
        background-color: ${props => props.colors?.greenAccent[800]};
      }
    }
  }
`;
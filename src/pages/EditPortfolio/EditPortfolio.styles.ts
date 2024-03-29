import { styled } from "solid-styled-components";
import { Colors } from "../../styles/theme";

interface IStyledEditPortfolioProps {
  colors: Colors;
}

export const StyledEditPortfolio = styled('div') <IStyledEditPortfolioProps>`
  padding: 20px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 16px;

  .header-content {
    display: flex;
    display: flex;
    gap: 8px;
  }

  h3 {
    margin-bottom: 16px;

    span {
      margin-left: 0.5rem;
      color: ${props => props.colors?.red[300]};
    }
  }

  .owner-selection {
    width: 22rem;
    padding: 20px;
    background-color: ${props => props.colors?.primary[700]};

    h4 {
      margin-bottom: 16px;
    }

    form {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
  }

  .portfolio-edit-form {

    form {
      padding: 20px;
      width: 22rem;
      display: flex;
      flex-direction: column;
      gap: 16px;
      background-color: ${props => props.colors?.primary[700]};

      button {
        margin-top: 2rem;
      }
    }
  }

  .portfolio-delete-form {
    padding: 20px;
    width: 22rem;
    display: flex;
    flex-direction: column;
    background-color: ${props => props.colors?.primary[700]};
    
    .delete-buttons {
      display: flex;
      gap: 16px;
    }
  }

  div.MuiInputBase-root {
    background-color: ${props => props.colors?.primary[900]};
  }
`;
import { styled } from "solid-styled-components";
import { Colors } from "../../styles/theme";

interface IStyledCreatePortfolioProps {
  colors: Colors;
}

export const StyledCreatePortfolio = styled('div') <IStyledCreatePortfolioProps>`
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
  }

  .owner-selection {
    padding: 20px;
    width: 22rem;
    background-color: ${props => props.colors?.primary[700]};

    .investor-selection {
      margin-top: 16px;

      form {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
    }
  }
  
  .portfolio-creation-form {

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

  div.MuiInputBase-root {
    background-color: ${props => props.colors?.primary[900]};
  }
`;
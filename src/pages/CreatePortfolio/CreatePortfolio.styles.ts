import { styled } from "solid-styled-components";
import { Colors } from "../../styles/theme";

interface IStyledCreatePortfolioProps {
  colors: Colors;
}

export const StyledCreatePortfolio = styled('div') <IStyledCreatePortfolioProps>`
  padding: 20px;
  overflow-y: auto;

  .header-content {
    display: flex;
    display: flex;
    gap: 8px;
  }

  h3 {
    margin-bottom: 16px;
  }
  
  form {
    padding: 20px;
    width: 22rem;
    display: flex;
    flex-direction: column;
    gap: 16px;
    background-color: ${props => props.colors?.primary[700]};

    div.MuiInputBase-root {
      background-color: ${props => props.colors?.primary[900]};
    }

    .portfolio-form-button {
      margin-top: 2rem;
    }

    .error-message {
      color: var(--colorError);
    }

    .success-message {
      color: var(--colorSuccess);
    }
  }
`;
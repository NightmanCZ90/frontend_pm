import { styled } from "solid-styled-components";
import { Colors } from "../../styles/theme";

interface IStyledCreateTransactionProps {
  readonly edit: number;
  colors: Colors;
}

export const StyledCreateTransaction = styled('div') <IStyledCreateTransactionProps>`

  form {
    display: flex;
    flex-direction: column;
    gap: 16px;

    .required,
    .defaulted {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .buttons {
      display: flex;
      justify-content: ${props => props.edit ? 'space-between' : 'flex-end'};

      .buttons-delete {
        display: flex;
        gap: 16px;
      }
    }
    
    & > span {
      color: var(--text-error);
    }
  }

  div.MuiInputBase-root {
    background-color: ${props => props.colors?.primary[900]};
  }
`;
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
  }

  div.MuiInputBase-root {
    background-color: ${props => props.colors?.primary[900]};
  }
`;
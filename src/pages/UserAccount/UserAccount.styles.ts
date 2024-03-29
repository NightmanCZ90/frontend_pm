import { styled } from "solid-styled-components";
import { Colors } from "../../styles/theme";

export const StyledUserAccount = styled('div')`
  padding: 20px;
  overflow-y: auto;
`;

interface IStyledUserAccountContentProps {
  colors: Colors;
}

export const StyledUserAccountContent = styled('div') <IStyledUserAccountContentProps>`
  padding-top: 3rem;

  form {
    width: 20rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;

    div.MuiInputBase-root {
      background-color: ${props => props.colors?.primary[900]};
    }

    .signup-form-buttons {
      display: flex;
      justify-content: flex-end;
      margin-top: 2rem;
    }
  }
`;
import { Box } from '@suid/material';
import { styled } from 'solid-styled-components';
import { Colors } from '../../styles/theme';

interface IStyledSignUpProps {
}

export const StyledSignUp = styled('div') <IStyledSignUpProps>`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

interface IStyledSignUpFormProps {
  colors: Colors;
}

export const StyledSignUpForm = styled(Box) <IStyledSignUpFormProps>`
  padding: 3rem 5rem;
  background-color: ${props => props.colors?.primary[700]};

  form {
    width: 20rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;

    div.MuiInputBase-root {
      background-color: ${props => props.colors?.primary[800]};
    }

    .signup-form-buttons {
      display: flex;
      justify-content: space-between;
      margin-top: 2rem;
    }

    .error-message {
      color: var(--colorError);
    }
  }
`;
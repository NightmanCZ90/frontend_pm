import { Component, For, Resource, Show } from "solid-js";
import { StyledErrorMessage } from "./ErrorMessage.styles";

interface IErrorMessageProps {
  resource: Resource<any>;
}

const ErrorMessage: Component<IErrorMessageProps> = (props) => {
  return (
    <Show when={props.resource.error && props.resource.error.message}>
      <StyledErrorMessage class="ErrorMessage">
        <Show when={Array.isArray(props.resource.error.message)} fallback={<span class="error-message">{props.resource.error?.message}</span>}>
          <For each={props.resource.error.message}>
            {(item) => <span class="error-message">{item}</span>}
          </For>
        </Show>
      </StyledErrorMessage>
    </Show>
  )
}

export default ErrorMessage;
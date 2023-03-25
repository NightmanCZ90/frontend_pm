import { Component, For, Resource, Show } from "solid-js";
import { StyledSuccessMessage } from "./SuccessMessage.styles";

interface ISuccessMessageProps {
  resource: Resource<any>;
  successMessage: string;
}

const SuccessMessage: Component<ISuccessMessageProps> = (props) => {
  return (
    <Show when={!props.resource.error && props.resource()}>
      <span class="success-message">
        {props.successMessage}
      </span>
    </Show>
  )
}

export default SuccessMessage;
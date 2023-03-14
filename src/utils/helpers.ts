import { FieldElement } from "@modular-forms/solid";
import { JSX } from "solid-js";

export const remapFieldProps = (props: {
  name: string;
  ref: (element: FieldElement) => void;
  onInput: JSX.EventHandler<FieldElement, InputEvent>;
  onChange: JSX.EventHandler<FieldElement, Event>;
  onBlur: JSX.EventHandler<FieldElement, FocusEvent>;
}) => ({
  name: props.name,
  inputRef: props.ref,
  onBlur: props.onBlur,
  onChange: (e: any) => { props.onChange(e); props.onInput(e) }
});
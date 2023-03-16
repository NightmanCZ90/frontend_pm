import { FieldElement } from "@modular-forms/solid";
import { JSX } from "solid-js";

export const remapFieldProps = (fieldProps: {
  name: string;
  ref: (element: FieldElement) => void;
  onInput: JSX.EventHandler<FieldElement, InputEvent>;
  onChange: JSX.EventHandler<FieldElement, Event>;
  onBlur: JSX.EventHandler<FieldElement, FocusEvent>;
}) => ({
  name: fieldProps.name,
  inputRef: fieldProps.ref,
  onBlur: fieldProps.onBlur,
  onChange: (e: any) => { fieldProps.onChange(e); fieldProps.onInput(e) }
});
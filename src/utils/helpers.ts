import { FieldElement } from "@modular-forms/solid";
import { JSX } from "solid-js";
import { Portfolio, PortfolioOwnership, User } from "../types";

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

export const generateGreenRedClass = (value: number) => {
  if (value > 0) return 'green';
  if (value < 0) return 'red';
  return '';
}

export const generateUserName = (user?: User) => {
  const { firstName, lastName, email } = user || {};
  if (firstName && lastName) return `${firstName} ${lastName}`;
  return email || '';
}

export const generatePortfolioOwnership = (data: { userId?: number | null, portfolio?: Portfolio | null }): PortfolioOwnership => {
  const { portfolio, userId } = data;
  if (!userId || !portfolio) return PortfolioOwnership.Personal;

  if (portfolio.pmId && portfolio.pmId === userId) return PortfolioOwnership.Managing;
  if (portfolio.pmId && portfolio.pmId !== userId) return PortfolioOwnership.Managed;
  return PortfolioOwnership.Personal;
}

export const debounce = (fn: Function, ms = 300) => {
  let timeoutId: ReturnType<typeof setTimeout>;

  return function (this: any, ...args: any[]) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), ms);
  };
};
import { A } from "@solidjs/router";
import { Component, createSignal, JSX, Show } from "solid-js";
import { formatterWithCurrency } from "../../App";
import { tokens, useThemeContext } from "../../styles/theme";
import { Portfolio } from "../../types";
import { generateGreenRedClass, generateUserName } from "../../utils/helpers";
import { StyledPortfolioCard, StyledPortfolioCardContent, StyledPortfolioCardHeader } from './PortfolioCard.styles';

interface IPortfolioCardProps {
  portfolio: Portfolio;
}

const PortfolioCard: Component<IPortfolioCardProps> = (props) => {
  let cardRef: HTMLDivElement | undefined;

  const [mode] = useThemeContext();
  const colors = () => tokens(mode());

  const [cursor, setCursor] = createSignal<{ x: number, y: number }>({ x: 0, y: 0 });

  const onMouseMove: JSX.EventHandlerUnion<HTMLDivElement, MouseEvent> = (event) => {
    let { left, top } = cardRef?.getBoundingClientRect() || {};

    if (left && top) {
      const x = (event.clientX - left) - 160;
      const y = (event.clientY - top) - 160;

      setCursor({ x, y });
    }
  };

  const unrealizedGains = 400;
  const realizedGains = 0;

  return (
    <StyledPortfolioCard colors={colors()} onMouseMove={onMouseMove} ref={cardRef}>

      <A href={`/portfolios/${props.portfolio.id}`}>
        <Show when={props.portfolio.user}>
          <div class="investor">
            <Show when={!props.portfolio.confirmed}>
              {/* <Tooltip title="Portfolio is not yet confirmed by the investor."> */}
              <span class="not-confirmed" />
              {/* </Tooltip> */}

            </Show>
            {generateUserName(props.portfolio.user)}
          </div>

        </Show>
        <StyledPortfolioCardHeader>
          <h2>{props.portfolio.name}</h2>
          <h3>Portfolio</h3>
        </StyledPortfolioCardHeader>
        <StyledPortfolioCardContent>
          <div class="portfolio-gains">
            <div>
              <span>Unrealized gains</span>
              <span class={generateGreenRedClass(unrealizedGains)}>
                {formatterWithCurrency.format(unrealizedGains)}
              </span>
            </div>
            <div>
              <span>Realized gains</span>
              <span class={generateGreenRedClass(realizedGains)}>{formatterWithCurrency.format(realizedGains)}</span>
            </div>
          </div>
        </StyledPortfolioCardContent>
      </A>

      <div class="cursor-bubble" style={{ left: `${cursor().x}px`, top: `${cursor().y}px` }}></div>

    </StyledPortfolioCard>
  )
}

export default PortfolioCard;
import { Component, createResource, For, Show } from "solid-js";
import Header from "../../components/Header";
import PortfolioCard from "../../components/PortfolioCard";
import { useDispatch, useSelector } from "../../store";
import { StyledPortfolios, StyledPortfoliosContent } from "./Portfolios.styles";

async function getPortfolios() {
  const dispatch = useDispatch();

  await dispatch.portfolios.getUsersPortfolios();
}

const Portfolios: Component = () => {
  const { portfolios } = useSelector();
  const [data] = createResource(getPortfolios);

  return (
    <StyledPortfolios class="Portfolios">
      <div class="header-content">
        <Header title="Portfolios" subtitle="Create and update your portfolios here" />
      </div>
      <StyledPortfoliosContent>
        <Show when={!data.error} fallback={data.error.message}>

          <div class="portfolio-personal">
            <h2>Personal portfolios</h2>
            <Show when={data.state === 'ready'} fallback={'loading'}>
              <div class="portfolio-cards">
                <Show when={portfolios.personal} fallback={'no data'}>
                  <For each={portfolios.personal}>
                    {(portfolio) =>
                      <PortfolioCard
                        portfolio={portfolio}
                      />
                    }
                  </For>
                </Show>
              </div>
            </Show>
          </div>

          <div class="portfolio-managing">
            <h2>Managing portfolios</h2>
            <Show when={data.state === 'ready'} fallback={'loading'}>
              <div class="portfolio-cards">
                <Show when={portfolios.managing} fallback={'no data'}>
                  <For each={portfolios.managing}>
                    {(portfolio) =>
                      <PortfolioCard
                        portfolio={portfolio}
                      />
                    }
                  </For>
                </Show>
              </div>
            </Show>
          </div>

          <div class="portfolio-managed">
            <h2>Managed portfolios</h2>
            <Show when={data.state === 'ready'} fallback={'loading'}>
              <div class="portfolio-cards">
                <Show when={portfolios.managed} fallback={'no data'}>
                  <For each={portfolios.managed}>
                    {(portfolio) =>
                      <PortfolioCard
                        portfolio={portfolio}
                      />
                    }
                  </For>
                </Show>
              </div>
            </Show>
          </div>

        </Show>
      </StyledPortfoliosContent>
    </StyledPortfolios>
  )
}

export default Portfolios;
import { A } from "@solidjs/router";
import { Button } from "@suid/material";
import { Component, createResource, For, Show } from "solid-js";

import Header from "../../components/Header";
import PortfolioCard from "../../components/PortfolioCard";
import { StyledPortfolios, StyledPortfoliosContent } from "./Portfolios.styles";
import { getUsersPortfolios, portfoliosStore } from "../../stores/PortfoliosStore";

const Portfolios: Component = () => {
  const { portfolios } = portfoliosStore;
  const [data] = createResource(getUsersPortfolios);

  return (
    <StyledPortfolios class="Portfolios">
      <div class="header-content">
        <div class="left">
          <Header title="Portfolios" subtitle="Create and update your portfolios here" />
        </div>

        <div class="right">
          <A class="create-button" href={'/portfolios/create'}>
            <Button color="secondary" variant="contained">
              Create Portfolio
            </Button>
          </A>
        </div>
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
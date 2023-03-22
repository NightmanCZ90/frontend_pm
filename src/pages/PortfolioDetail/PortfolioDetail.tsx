import { A, useParams } from "@solidjs/router";
import { ChevronLeft } from "@suid/icons-material";
import { IconButton } from "@suid/material";
import { Component, createResource, Show } from "solid-js";
import Header from "../../components/Header";
import RestApiClient from "../../services/RestApiClient";
import { tokens, useThemeContext } from "../../styles/theme";
import { StyledPortfolioDetail, StyledPortfolioDetailContent } from "./PortfolioDetail.styles";

const getPortfolio = async (id: string) => {
  return RestApiClient.getPortfolio(id);
}


interface IPortfolioDetailProps {

}

const PortfolioDetail: Component<IPortfolioDetailProps> = (props) => {
  const params = useParams();
  const [mode] = useThemeContext();
  const colors = () => tokens(mode());

  const [portfolio] = createResource(params.id, getPortfolio);

  return (
    <StyledPortfolioDetail class="PortfolioDetail">

      <Show when={!portfolio.error} fallback={portfolio.error.message}>

        <Show when={portfolio.state === 'ready' && portfolio()} fallback={'loading'}>

          <div class="header-content">
            <A href={"/portfolios"} class="link-back">
              <IconButton>
                <ChevronLeft />
              </IconButton>
            </A>
            <Header title={portfolio()?.name || 'Portfolio detail'} subtitle="You can create and update transactions here" />
          </div>

          <StyledPortfolioDetailContent colors={colors()} class="PortfolioDetailContent">

            <section class="portfolio">
              <div class="portfolio-layout">
                {/* TODO: Remove to implement portfolio graph */}
                <div class="circle" />
              </div>
            </section>

          </StyledPortfolioDetailContent>

        </Show>
      </Show>

    </StyledPortfolioDetail>
  )
}

export default PortfolioDetail;
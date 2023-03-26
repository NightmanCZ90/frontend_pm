import { A, useParams } from "@solidjs/router";
import { ChevronLeft } from "@suid/icons-material";
import { Button, IconButton } from "@suid/material";
import { Component, createResource, Show } from "solid-js";
import Header from "../../components/Header";
import RestApiClient from "../../services/RestApiClient";
import { useSelector } from "../../store";
import { tokens, useThemeContext } from "../../styles/theme";
import { PortfolioOwnership } from "../../types";
import { generatePortfolioOwnership, generateUserName } from "../../utils/helpers";
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
  const { auth } = useSelector();

  const [portfolio] = createResource(params.id, getPortfolio);

  const ownership = () => generatePortfolioOwnership({ userId: auth.currentUser?.id, portfolio: portfolio() });

  const getOwnershipTitle = () => {
    if (ownership() === PortfolioOwnership.Managed || ownership() === PortfolioOwnership.Unconfirmed) return `Managed by ${generateUserName(portfolio()?.portfolioManager)}`;
    if (ownership() === PortfolioOwnership.Managing) return `Managing for ${generateUserName(portfolio()?.user)}`;
    return 'Personal';
  };

  return (
    <StyledPortfolioDetail class="PortfolioDetail">

      <Show when={!portfolio.error} fallback={portfolio.error.message}>

        <Show when={portfolio.state === 'ready' && portfolio()} fallback={'loading'}>

          <div class="header-content">
            <div class="left">
              <A href={"/portfolios"} class="link-back">
                <IconButton>
                  <ChevronLeft />
                </IconButton>
              </A>
              <Header title={portfolio()?.name || 'Portfolio detail'} subtitle="You can create and update transactions here" />
            </div>

            <div class="right">
              <A class="edit-button" href={`/portfolios/${portfolio()?.id}/edit`}>
                <Button color="secondary" variant="contained">
                  Edit Portfolio
                </Button>
              </A>
            </div>
          </div>

          <StyledPortfolioDetailContent colors={colors()} class="PortfolioDetailContent">

            {/* TODO: Reorganize */}

            <section class="portfolio">
              <div class="portfolio-layout">
                {/* TODO: Remove to implement portfolio graph */}
                <div class="circle" />
              </div>
            </section>

            {/* TODO: Add transaction creation form */}

            {/* TODO: Add transactions list */}

            <section class="ownership">
              <div class="owner">
                <h3>Portfolio ownership: <span>{getOwnershipTitle()}</span></h3>
              </div>
            </section>

            <section class="portfolio-info">
              <h3>Portfolio information</h3>
              <div>
                {portfolio()?.description || 'No description set'}
              </div>
              <div>
                {portfolio()?.url || 'No url set'}
              </div>
            </section>

          </StyledPortfolioDetailContent>

        </Show>
      </Show>

    </StyledPortfolioDetail>
  )
}

export default PortfolioDetail;
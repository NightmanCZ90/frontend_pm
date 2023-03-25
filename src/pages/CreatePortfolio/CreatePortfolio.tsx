import { A } from "@solidjs/router";
import { ChevronLeft } from "@suid/icons-material";
import { IconButton } from "@suid/material";
import { Component } from "solid-js";
import Header from "../../components/Header";
import { StyledCreatePortfolio } from "./CreatePortfolio.styles";

interface ICreatePortfolioProps {

}

const CreatePortfolio: Component<ICreatePortfolioProps> = (props) => {

  return (
    <StyledCreatePortfolio>

      <div class="header-content">
        <A href={"/portfolios"} class="link-back">
          <IconButton>
            <ChevronLeft />
          </IconButton>
        </A>
        <Header title={'Create portfolio'} subtitle="You can create portfolio here" />
      </div>

    </StyledCreatePortfolio>
  )
}

export default CreatePortfolio;
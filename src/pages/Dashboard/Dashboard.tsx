import { Component } from "solid-js";
import Header from "../../components/Header";
import { StyledDashboard } from "./Dashboard.styles";

const Dashboard: Component = () => {
  return (
    <StyledDashboard class="Dashboard">
      <div class="header-content">
        <Header title="Dashboard" subtitle="Welcome to you dashboard" />
      </div>
    </StyledDashboard>
  )
}

export default Dashboard;
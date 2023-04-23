import { Component } from "solid-js";
import { Transaction, TransactionType } from "../../types";
import { StyledTransactionCard } from "./TransactionCard.styles";
import { tokens, useThemeContext } from "../../styles/theme";
import { FileDownload, Upload } from "@suid/icons-material";
import { formatterWithCurrency } from "../../App";

interface ITransactionCardProps {
  transaction: Transaction;
}

const TransactionCard: Component<ITransactionCardProps> = (props) => {
  const [mode] = useThemeContext();
  const colors = () => tokens(mode());

  const renderIcon = (transactionType: TransactionType) => {
    if (transactionType === TransactionType.Buy) return <FileDownload fontSize="large" />;
    if (transactionType === TransactionType.Sell) return <Upload fontSize="large" />;
  }

  const calculateTransactionCharge = (transactionType: TransactionType, numShares: number, price: number) => {
    let charge = 0;
    if (transactionType === TransactionType.Buy) charge = -1 * price;
    if (transactionType === TransactionType.Sell) charge = 1 * price;
    return formatterWithCurrency.format(numShares * charge);
  }

  const calculateShares = (transactionType: TransactionType, numShares: number) => {
    let shares = 0;
    if (transactionType === TransactionType.Buy) shares = 1;
    if (transactionType === TransactionType.Sell) shares = -1;
    return numShares * shares;
  }

  return (
    <StyledTransactionCard class="TransactionCard" colors={colors()}>
      <div class="content">

        <div class="top">
          <div class="transaction-type">
            <div class={`icon ${props.transaction.transactionType}`}>
              {renderIcon(props.transaction.transactionType)}
            </div>
            {props.transaction.transactionType.toUpperCase()}
            <h3>{props.transaction.stockName}</h3>
          </div>
          {calculateTransactionCharge(props.transaction.transactionType, props.transaction.numShares, props.transaction.price)}
        </div>

        <div class="middle">
          <div class="info">

            <div class="num-shares">
              {calculateShares(props.transaction.transactionType, props.transaction.numShares)}
              &nbsp;
              shares
            </div>

            <div class="price">
              {props.transaction.price}
              &nbsp;
              {props.transaction.currency}
            </div>

          </div>

          <div class="date">
            {new Date(props.transaction.transactionTime).toLocaleDateString()}
          </div>
        </div>

      </div>
    </StyledTransactionCard>
  )
}

export default TransactionCard;
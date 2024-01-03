import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { createServer } from "miragejs";

import styles from "../styles/modules/summary.module.scss";

createServer({
  routes() {
    this.get("/api/trasactions", () => [
      {
        id: 1,
        date: "2023-11-10",
        amount: 500,
        description: "Office Chair",
      },
      { id: 2, date: "2023-11-10", amount: 1500, description: "Fan" },
      { id: 3, date: "2023-11-10", amount: 2500, description: "AC" },
      {
        id: "0d6a38b1-9511-460e-81ef-d95fad4929a1",
        date: "2023-11-10",
        amount: 500,
        description: "Office Chair",
      },
      { id: 5, date: "2023-11-10", amount: 1500, description: "Fan" },
      { id: 6, date: "2023-11-10", amount: -2500, description: "AC" },
      {
        id: "d7cbeaba-899a-4b2d-adc9-8c1b6609d86d",
        date: "2023-11-10",
        amount: 500,
        description: "AC",
      },
    ]);
  },
});

function Summary() {
  const invoiceCount = useSelector(
    (state) => state.invoice?.invoiceList?.length
  );
  const [transactionsData, setTransactionsData] = useState();

  useEffect(() => {
    fetch("/api/trasactions")
      .then((res) => res.json())
      .then((data) => setTransactionsData(data))
      .catch((err) => console.log(err));
  }, []);

  const accountBalance =
    transactionsData &&
    transactionsData.reduce((sum, transaction) => sum + transaction.amount, 0);

  const amountColor =
    accountBalance > 1000
      ? "Green"
      : accountBalance < 1000 && accountBalance > 0
      ? "Yellow"
      : "Red";

  return (
    <div className={styles.outerContainer}>
      <div className={styles.innerContainer}>
        <div className={styles.summaryDetails}>
          <p className={styles.text}>Account Balance:</p>
          <p
            className={styles[`amount${amountColor}`]}
          >{`$${accountBalance}`}</p>
        </div>
        <div className={styles.invoiceDetails}>
          <p className={styles.text}>Number of Invoices:</p>
          <p className={styles.invoiceCount}>{invoiceCount}</p>
        </div>
      </div>
    </div>
  );
}

export default Summary;

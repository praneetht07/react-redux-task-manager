import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useSelector } from "react-redux";

import styles from "../styles/modules/app.module.scss";
import InvoiceItem from "./InvoiceItem";

const container = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};
const child = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

function InvoicesContent() {
  const invoiceList = useSelector((state) => state.invoice.invoiceList);

  const sortedInvoiceList = [...invoiceList];
  sortedInvoiceList.sort((a, b) => new Date(b.time) - new Date(a.time));

  return (
    <motion.div
      className={styles.content__wrapper}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      <AnimatePresence>
        {sortedInvoiceList && sortedInvoiceList.length > 0 ? (
          sortedInvoiceList.map((invoice) => (
            // <motion.div key={todo.id} variants={child}>
            <InvoiceItem key={invoice.id} invoice={invoice} />
            // </motion.div>
          ))
        ) : (
          <motion.p variants={child} className={styles.emptyText}>
            No Invoices
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default InvoicesContent;

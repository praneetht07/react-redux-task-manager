import toast from "react-hot-toast";
import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import { useDispatch } from "react-redux";
import { deleteInvoice } from "../slices/invoiceSlice";
import styles from "../styles/modules/invoiceItem.module.scss";
import InvoiceModal from "./InvoiceModal";

const child = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

function InvoiceItem({ invoice }) {
  const dispatch = useDispatch();
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [transactionsData, setTransactionsData] = useState();

  useEffect(() => {
    fetch("/api/trasactions")
      .then((res) => res.json())
      .then((data) => setTransactionsData(data))
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = () => {
    dispatch(deleteInvoice(invoice.id));
    toast.success("Invoice deleted Successfully");
  };

  const handleUpdate = () => {
    setUpdateModalOpen(true);
  };

  return (
    <>
      <motion.div className={styles.item} variants={child}>
        <div className={styles.invoiceDetails}>
          <div className={styles.texts}>
            <p className={styles.invoiceText}>{invoice.customerName}</p>
            <p className={styles.invoiceId}>{invoice.id}</p>
            <p className={styles.time}>{new Date().toJSON().slice(0, 10)}</p>
            <p className={styles.invoiceAmount}>{invoice.amount}</p>
            <p className={styles.invoiceStatus}>
              {transactionsData &&
              transactionsData.some(
                (transaction) =>
                  transaction.amount == invoice.amount &&
                  transaction.date < invoice.time &&
                  transaction.id == invoice.id
              )
                ? "PAID"
                : "NOT PAID"}
            </p>
          </div>
        </div>
        <div className={styles.invoiceActions}>
          <div
            className={styles.icon}
            onClick={() => handleDelete()}
            onKeyDown={() => handleDelete()}
            tabIndex={0}
            role="button"
          >
            <MdDelete />
          </div>
          <div
            className={styles.icon}
            onClick={() => handleUpdate()}
            onKeyDown={() => handleUpdate()}
            tabIndex={0}
            role="button"
          >
            <MdEdit />
          </div>
        </div>
      </motion.div>
      <InvoiceModal
        type="update"
        modalOpen={updateModalOpen}
        setModalOpen={setUpdateModalOpen}
        invoice={invoice}
      />
    </>
  );
}

export default InvoiceItem;

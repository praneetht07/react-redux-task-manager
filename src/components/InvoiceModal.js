import React, { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import { MdOutlineClose } from "react-icons/md";
import { useDispatch } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";
import toast from "react-hot-toast";
// import { format } from "date-fns";
import { addInvoice, updateInvoice } from "../slices/invoiceSlice";
import styles from "../styles/modules/modal.module.scss";
import Button from "./Button";

const dropIn = {
  hidden: {
    opacity: 0,
    transform: "scale(0.9)",
  },
  visible: {
    transform: "scale(1)",
    opacity: 1,
    transition: {
      duration: 0.1,
      type: "spring",
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    transform: "scale(0.9)",
    opacity: 0,
  },
};

function InvoiceModal({ type, modalOpen, setModalOpen, invoice }) {
  const dispatch = useDispatch();
  const [customerName, setTitle] = useState("");
  const [amount, setAmount] = useState();

  useEffect(() => {
    if (type === "update" && invoice) {
      setTitle(invoice.customerName);
      setAmount(invoice.amount);
    } else {
      setTitle("");
      setAmount();
    }
  }, [type, invoice, modalOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (customerName === "") {
      toast.error("Please enter a customer name");
      return;
    }
    if (customerName && amount) {
      if (type === "add") {
        dispatch(
          addInvoice({
            id: uuid(),
            customerName,
            amount,
            time: new Date().toJSON().slice(0, 10),
          })
        );
        toast.success("Invoice added successfully");
      }
      if (type === "update") {
        if (
          invoice.customerName !== customerName ||
          invoice.amount !== amount
        ) {
          dispatch(updateInvoice({ ...invoice, customerName, amount }));
          toast.success("Invoice updated successfully");
        } else {
          toast.error("No changes made");
          return;
        }
      }
      setModalOpen(false);
    }
  };

  return (
    <AnimatePresence>
      {modalOpen && (
        <motion.div
          className={styles.wrapper}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className={styles.container}
            variants={dropIn}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <motion.div
              className={styles.closeButton}
              onKeyDown={() => setModalOpen(false)}
              onClick={() => setModalOpen(false)}
              role="button"
              tabIndex={0}
              // animation
              initial={{ top: 40, opacity: 0 }}
              animate={{ top: -10, opacity: 1 }}
              exit={{ top: 40, opacity: 0 }}
            >
              <MdOutlineClose />
            </motion.div>
            <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
              <h1 className={styles.formTitle}>
                {type === "add" ? "Add" : "Update"} Invoice
              </h1>
              <label htmlFor="customerName">
                Cutomer Name
                <input
                  type="text"
                  id="customerName"
                  value={customerName}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </label>
              <label htmlFor="amount">
                Amount
                <input
                  type="number"
                  id="amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </label>
              <div className={styles.buttonContainer}>
                <Button type="submit" variant="primary">
                  {type === "add" ? "Add Invoice" : "Update Invoice"}
                </Button>
                <Button variant="secondary" onClick={() => setModalOpen(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default InvoiceModal;

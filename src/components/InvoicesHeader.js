import React, { useState } from "react";
import Button from "./Button";
import styles from "../styles/modules/app.module.scss";
import InvoiceModal from "./InvoiceModal";

function InvoicesHeader() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className={styles.appHeader}>
      <Button variant="primary" onClick={() => setModalOpen(true)}>
        Add Invoice
      </Button>
      <InvoiceModal
        type="add"
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
      />
    </div>
  );
}

export default InvoicesHeader;

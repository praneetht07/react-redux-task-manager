import React, { useState } from "react";
import Button, { SelectButton } from "./Button";
import styles from "../styles/modules/app.module.scss";
import ToDoModal from "./ToDoModal";

function AppHeader() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className={styles.appHeader}>
      <Button variant="primary" onClick={() => setIsModalOpen(true)}>
        ADD TASK
      </Button>
      <SelectButton>
        <option value="all">All</option>
        <option value="incomplete">Incomplete</option>
        <option value="complete">Complete</option>
      </SelectButton>
      <ToDoModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </div>
  );
}

export default AppHeader;

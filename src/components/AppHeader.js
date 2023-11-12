import React from "react";
import Button, { SelectButton } from "./Button";
import styles from "../styles/modules/app.module.scss";
import ToDoModal from "./ToDoModal";

function AppHeader() {
  return (
    <div className={styles.appHeader}>
      <Button variant="primary">ADD TASK</Button>
      <SelectButton>
        <option value="all">All</option>
        <option value="incomplete">Incomplete</option>
        <option value="complete">Complete</option>
      </SelectButton>
      <ToDoModal></ToDoModal>
    </div>
  );
}

export default AppHeader;

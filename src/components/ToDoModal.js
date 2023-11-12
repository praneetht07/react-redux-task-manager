import React from "react";
import styles from "../styles/modules/modal.module.scss";
import { MdOutlineClose } from "react-icons/md";
import Button from "./Button";

function ToDoModal() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.closeButton}>
          <MdOutlineClose />
        </div>
        <form className={styles.form}>
          <h1 className={styles.formTitle}>Add task</h1>
          <label htmlFor="title">
            Title
            <input typr="text" id="title" />
          </label>
          <label htmlFor="status">
            Status
            <select name="status" id="status">
              <option value="Incomplete">Incomplete</option>
              <option value="Complete">Complete</option>
            </select>
          </label>
          <div className={styles.buttonContainer}>
            <Button type="submit" variant="primary">
              Add task
            </Button>
            <Button variant="secondary">Cancel</Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ToDoModal;

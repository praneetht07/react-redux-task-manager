import React, { useState } from "react";
import styles from "../styles/modules/modal.module.scss";
import { MdOutlineClose } from "react-icons/md";
import Button from "./Button";

function ToDoModal({ isModalOpen, setIsModalOpen }) {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("incomplete");
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    isModalOpen && (
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <div
            className={styles.closeButton}
            onClick={() => setIsModalOpen(false)}
            onKeyDown={() => setIsModalOpen(false)}
            tabIndex={0}
            role="button"
          >
            <MdOutlineClose />
          </div>
          <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
            <h1 className={styles.formTitle}>Add task</h1>
            <label htmlFor="title">
              Title
              <input
                typr="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </label>
            <label htmlFor="status">
              Status
              <select
                name="status"
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="Incomplete">Incomplete</option>
                <option value="Complete">Complete</option>
              </select>
            </label>
            <div className={styles.buttonContainer}>
              <Button type="submit" variant="primary">
                Add task
              </Button>
              <Button
                variant="secondary"
                onClick={() => setIsModalOpen(false)}
                onKeyDown={() => setIsModalOpen(false)}
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </div>
    )
  );
}

export default ToDoModal;

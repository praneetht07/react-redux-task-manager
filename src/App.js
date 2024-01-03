import "./App.css";
import InvoicesContent from "./components/InvoicesContent";
import InvoicesHeader from "./components/InvoicesHeader";
import PageTitle from "./components/PageTitle";
import styles from "./styles/modules/app.module.scss";
import { Toaster } from "react-hot-toast";
import Summary from "./components/Summary";

function App() {
  return (
    <>
      <div className="container">
        <PageTitle>Summary</PageTitle>
        <Summary />
        <PageTitle>Invoices</PageTitle>
        <div className={styles.app__wrapper}>
          <InvoicesHeader />
          <InvoicesContent />
        </div>
      </div>
      <Toaster
        toastOptions={{
          style: {
            fontSize: "1.4rem",
          },
        }}
      />
    </>
  );
}

export default App;

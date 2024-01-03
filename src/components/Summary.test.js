import { render, screen } from "@testing-library/react";
import Summary from "./Summary";
import "@testing-library/jest-dom";

import { Provider } from "react-redux";
import configureStore from "redux-mock-store";

describe("Summary", () => {
  const initialState = [];
  const middlewares = [];
  const mockStore = configureStore(middlewares);
  let store;

  test("Snapshot", () => {
    store = mockStore(initialState);
    const view = render(
      <Provider store={store}>
        <Summary />
      </Provider>
    );
    expect(view).toMatchSnapshot();
  });

  test("Account Balance to be in the document", () => {
    render(
      <Provider store={store}>
        <Summary />
      </Provider>
    );
    const textElement = screen.getByText("Account Balance:");
    expect(textElement).toBeInTheDocument();
  });

  test("Number of Invoices to be in the document", () => {
    render(
      <Provider store={store}>
        <Summary />
      </Provider>
    );
    const textElement = screen.getByText("Number of Invoices:");
    expect(textElement).toBeInTheDocument();
  });
});

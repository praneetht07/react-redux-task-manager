import { createSlice } from "@reduxjs/toolkit";

const getInitialInvoice = () => {
  // getting invoice list
  const localInvoiceList = window.localStorage.getItem("invoiceList");
  // if invoice list is not empty
  if (localInvoiceList) {
    return JSON.parse(localInvoiceList);
  }
  window.localStorage.setItem("invoiceList", []);
  return [];
};

const initialValue = {
  invoiceList: getInitialInvoice(),
};

export const invoiceSlice = createSlice({
  name: "invoice",
  initialState: initialValue,
  reducers: {
    addInvoice: (state, action) => {
      state.invoiceList.push(action.payload);
      const invoiceList = window.localStorage.getItem("invoiceList");
      if (invoiceList) {
        const invoiceListArr = JSON.parse(invoiceList);
        invoiceListArr.push({
          ...action.payload,
        });
        window.localStorage.setItem(
          "invoiceList",
          JSON.stringify(invoiceListArr)
        );
      } else {
        window.localStorage.setItem(
          "invoiceList",
          JSON.stringify([
            {
              ...action.payload,
            },
          ])
        );
      }
    },
    updateInvoice: (state, action) => {
      const invoiceList = window.localStorage.getItem("invoiceList");
      if (invoiceList) {
        const invoiceListArr = JSON.parse(invoiceList);
        invoiceListArr.forEach((invoice) => {
          if (invoice.id === action.payload.id) {
            invoice.amount = action.payload.amount;
            invoice.customerName = action.payload.customerName;
          }
        });
        window.localStorage.setItem(
          "invoiceList",
          JSON.stringify(invoiceListArr)
        );
        state.invoiceList = [...invoiceListArr];
      }
    },
    deleteInvoice: (state, action) => {
      const invoiceList = window.localStorage.getItem("invoiceList");
      if (invoiceList) {
        const invoiceListArr = JSON.parse(invoiceList);
        invoiceListArr.forEach((invoice, index) => {
          if (invoice.id === action.payload) {
            invoiceListArr.splice(index, 1);
          }
        });
        window.localStorage.setItem(
          "invoiceList",
          JSON.stringify(invoiceListArr)
        );
        state.invoiceList = invoiceListArr;
      }
    },
  },
});

export const { addInvoice, updateInvoice, deleteInvoice } =
  invoiceSlice.actions;
export default invoiceSlice.reducer;

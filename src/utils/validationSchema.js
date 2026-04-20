import * as yup from "yup";

export const transactionSchema = yup.object({
    title: yup.string().required("Title is required"),

    amount: yup
        .number()
        .typeError("Amount must be a number")
        .positive("Amount must be greater than 0")
        .required("Amount is required"),

    category: yup.string().required("Category is required"),

    type: yup.string().required("Transaction type is required"),

    date: yup.date().required("Date is required"),

    notes: yup.string(),
});
import { createSlice } from "@reduxjs/toolkit";

let initialState = {
    orders: [],
    orderId: 1,
    product: null,
    description: null,
    unit: null,
    quantity: 1.0,
};

const currentOrderSlice = createSlice({
    name: "currentOrder",
    initialState,
    reducers: {
        setProduct: (state, action) => {
            state.product = action.payload;
        },
        setUnit: (state, action) => {
            state.unit = action.payload;
        },
        clearLine: (state) => {
            state.product = null;
            state.description = null;
            state.unit = null;
            state.quantity = null;
        },
        addOrder: (state, action) => {
            if (state.product === null || state.unit === null) return;
            state.orders.push({
                id: state.orderId++,
                product: state.product,
                description: action.payload.description,
                unit: state.unit,
                quantity: action.payload.quantity,
            });
        },
        removeOrder: (state, action) => {
            state.orders = state.orders.filter((order) => order.id !== action.payload);
        },
        clearOrders: (state) => {
            state.orders = [];
        },
    },
});

export const { setProduct, setUnit, clearLine, addOrder, removeOrder, clearOrders } = currentOrderSlice.actions;
export default currentOrderSlice.reducer;
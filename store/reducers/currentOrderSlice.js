import { createSlice } from "@reduxjs/toolkit";

let initialState = {
    orders: [],
    orderId: 1,
    productId: null,
    description: null,
    unitId: null,
    quantity: null,
};

const currentOrderSlice = createSlice({
    name: "currentOrder",
    initialState,
    reducers: {
        setProductId: (state, action) => {
            state.productId = action.payload;
        },
        setUnitId: (state, action) => {
            state.unitId = action.payload;
        },
        clearLine: (state) => {
            state.productId = null;
            state.description = null;
            state.unitId = null;
            state.quantity = null;
        },
        addOrder: (state, action) => {
            state.orders.push({
                id: state.orderId++,
                productId: state.productId,
                description: action.payload.description,
                unitId: state.unitId,
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

export const { setProductId, setUnitId, clearLine, addOrder, removeOrder, clearOrders } = currentOrderSlice.actions;
export default currentOrderSlice.reducer;
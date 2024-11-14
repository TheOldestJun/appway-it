import { OrderStatus } from "@prisma/client";

export const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 6) {
        return "Доброї ночі";
    } else if (hour < 12) {
        return "Доброго ранку";
    } else if (hour < 18) {
        return "Доброго дня";
    } else {    
        return "Доброго вечора";
    }
}

export const getOrderStatus = (status) => {
    const orderStatusMapping = { 
        CREATED: "Створено",
        APPROVED: "Схвалено",
        ORDERED: "Замовлено",
        RECEIVED: "Отримано",
        CLOSED: "Закрито",
    };
    return orderStatusMapping[status];
}

export const checkOrderStatus = (order) => {
  
}

export const storeCorrectDate = (date) => {
  return new Date(
    Date.parse(date.toUTCString()) - date.getTimezoneOffset() * 60000
  ).toDateString();
};

export const formatDate = (str) => {
  const date = new Date(str);
  return date.toLocaleString("uk-UA", {
    //weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
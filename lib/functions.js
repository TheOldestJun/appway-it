import { FcAddDatabase, FcAcceptDatabase, FcDeleteDatabase, FcInTransit, FcShipped, FcCheckmark } from "react-icons/fc";

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
        REJECTED: "Відхилено",
        ORDERED: "Замовлено",
        RECEIVED: "Отримано",
        CLOSED: "Закрито",
    };
    return orderStatusMapping[status];
}

export const iconOrderStatus = (status) => {
  switch (status) {
    case "CREATED":
      return <FcAddDatabase />;
    case "APPROVED":
      return <FcAcceptDatabase />;
    case "REJECTED":
      return <FcDeleteDatabase />;
    case "ORDERED":
      return <FcInTransit />;
    case "RECEIVED":
      return <FcShipped />;
    default:
      return <FcCheckmark />;
  }
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
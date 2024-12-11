import { FcAddDatabase, FcAcceptDatabase, FcDeleteDatabase, FcInTransit, FcShipped, FcCheckmark } from "react-icons/fc";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClipboardCheck, faClipboardList, faRectangleXmark, faSquareCheck, faTruck, faTruckRampBox } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@/components/ui/button";


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
      return (
        <div className="text-red-600">
          <FontAwesomeIcon icon={faClipboardList} /> 
        </div>
      );
    case "APPROVED":
      return (
        <div className="text-yellow-500">
            <FontAwesomeIcon icon={faClipboardCheck} />
        </div>
      );
    case "REJECTED":
      return (
        <div className="text-red-600">
            <FontAwesomeIcon icon={faRectangleXmark} />
        </div>
      );
    case "ORDERED":
      return (
        <div className="text-sky-600">
            <FontAwesomeIcon icon={faTruck} />
        </div>
      );
    case "ORDER_PENDING":
      return (
        <div className="text-yellow-500">
            <FontAwesomeIcon icon={faTruck} />
        </div>
      );
    case "RECEIVED":
      return (
        <div className="text-violet-600">
            <FontAwesomeIcon icon={faTruckRampBox} />
        </div>
      );
    case "RECEIVE_PENDING":
      return (
        <div className="text-yellow-500">
            <FontAwesomeIcon icon={faTruckRampBox} />
        </div>
      );
    default:
      return (
        <div className="text-green-600">
            <FontAwesomeIcon icon={faSquareCheck} />
        </div>
      );
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
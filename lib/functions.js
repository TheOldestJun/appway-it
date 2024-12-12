import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faClipboardCheck,
  faClipboardList,
  faRectangleXmark,
  faSquareCheck,
  faTruck,
  faTruckRampBox,
} from '@fortawesome/free-solid-svg-icons';

export const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 6) {
    return 'Доброї ночі';
  } else if (hour < 12) {
    return 'Доброго ранку';
  } else if (hour < 18) {
    return 'Доброго дня';
  } else {
    return 'Доброго вечора';
  }
};

export const getOrderStatus = status => {
  const orderStatusMapping = {
    CREATED: 'Створено',
    APPROVED: 'Схвалено',
    REJECTED: 'Відхилено',
    ORDERED: 'Замовлено',
    ORDER_PENDING: 'Замовлено частково',
    RECEIVED: 'Отримано',
    RECEIVE_PENDING: 'Отримано частково',
    CLOSED: 'Закрито',
  };
  return orderStatusMapping[status];
};

export const iconOrderStatus = status => {
  switch (status) {
    case 'CREATED':
      return (
        <div className="text-red-600">
          <FontAwesomeIcon icon={faClipboardList} />
        </div>
      );
    case 'APPROVED':
      return (
        <div className="text-yellow-500">
          <FontAwesomeIcon icon={faClipboardCheck} />
        </div>
      );
    case 'REJECTED':
      return (
        <div className="text-red-600">
          <FontAwesomeIcon icon={faRectangleXmark} />
        </div>
      );
    case 'ORDERED':
      return (
        <div className="text-sky-600">
          <FontAwesomeIcon icon={faTruck} />
        </div>
      );
    case 'ORDER_PENDING':
      return (
        <div className="text-yellow-500">
          <FontAwesomeIcon icon={faTruck} />
        </div>
      );
    case 'RECEIVED':
      return (
        <div className="text-violet-600">
          <FontAwesomeIcon icon={faTruckRampBox} />
        </div>
      );
    case 'RECEIVE_PENDING':
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
};

export const getTableRowColor = status => {
  switch (status) {
    case 'CREATED':
      return 'bg-red-100';
    case 'APPROVED':
      return 'bg-yellow-100';
    case 'REJECTED':
      return 'bg-red-100';
    case 'ORDERED':
      return 'bg-sky-300';
    case 'ORDER_PENDING':
      return 'bg-sky-200';
    case 'RECEIVED':
      return 'bg-violet-300';
    case 'RECEIVE_PENDING':
      return 'bg-violet-200';
    default:
      return 'bg-green-200';
  }
};

export const storeCorrectDate = date => {
  return new Date(
    Date.parse(date.toUTCString()) - date.getTimezoneOffset() * 60000,
  ).toDateString();
};

export const formatDate = str => {
  const date = new Date(str);
  return date.toLocaleString('uk-UA', {
    //weekday: "long",
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

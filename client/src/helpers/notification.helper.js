import { toast } from 'react-toastify';
import { NOTIFICATION_TYPES_MAP } from '../constant/notification.const';
import 'react-toastify/dist/ReactToastify.css';

const initialConfig = {
  position: toast.POSITION.BOTTOM_RIGHT,
  newestOnTop: true,
  draggable: true,
  autoClose: 4000,
  theme: 'colored'
};

const notificationCreator = {
  showOnSuccess(content) {
    this.show(content, NOTIFICATION_TYPES_MAP.SUCCESS);
  },
  showOnFailure(content) {
    this.show(content, NOTIFICATION_TYPES_MAP.ERROR);
  },
  show(content, type) {
    toast[type](content, initialConfig);
  }
};

export default notificationCreator;

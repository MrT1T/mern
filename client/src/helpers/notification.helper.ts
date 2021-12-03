import { toast, ToastContent } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import type { ObjectType } from '../types/objects.type';

const initialConfig = {
  position: toast.POSITION.BOTTOM_RIGHT,
  newestOnTop: true,
  draggable: true,
  autoClose: 4000,
  theme: 'colored'
};

const notificationCreator = {
  showOnSuccess(content: ToastContent): void {
    this.show(content, toast.success);
  },
  showOnFailure(content: ToastContent): void {
    this.show(content, toast.error);
  },
  show(
    content: ToastContent,
    notification: <T>(text: ToastContent, config: ObjectType<T>) => void
  ): void {
    notification(content, initialConfig);
  }
};

export default notificationCreator;

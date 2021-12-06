import { toast, ToastContent, ToastOptions } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const initialConfig: ToastOptions = {
  position: toast.POSITION.BOTTOM_RIGHT,
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
    notification: <T>(text: ToastContent, config: ToastOptions<T>) => void
  ): void {
    notification(content, initialConfig);
  }
};

export default notificationCreator;

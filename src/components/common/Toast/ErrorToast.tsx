import { toast } from 'react-toastify';

type Props = {
  text: string;
};
const ErrorToast = (text: string) => {
  return toast.error(text, {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

export default ErrorToast;

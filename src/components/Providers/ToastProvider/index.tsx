import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

function ToastProvider() {
  return (
    <ToastContainer
      style={{ zIndex: 1000, position: 'absolute' }}
      hideProgressBar
      position="top-right"
      autoClose={1000}
    />
  );
}

export default ToastProvider;

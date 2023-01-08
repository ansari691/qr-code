import { useContext } from 'react';
import { AppContext } from '../pages/_app';

export const useSnackAlert = () => {
  const { setSnackData } = useContext(AppContext);
  const showSnackAlert = (
    severity: 'info' | 'error' | 'warning' | 'success',
    message: string,
    duration?: number
  ) =>
    setSnackData({
      severity,
      message,
      duration,
    });
  return showSnackAlert;
};

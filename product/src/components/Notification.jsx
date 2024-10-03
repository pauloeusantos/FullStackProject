import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { useNotification } from '../contexts/NotificationContext';

const Notification = ({ id, message, type }) => {
  const { removeNotification } = useNotification();

  useEffect(() => {
    const timer = setTimeout(() => {
      removeNotification(id);
    }, 5000);

    return () => clearTimeout(timer);
  }, [id, removeNotification]);

  const bgColor = type === 'success' ? 'bg-green-500' : type === 'error' ? 'bg-red-500' : 'bg-blue-500';

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      className={`fixed top-4 right-4 p-4 rounded-md text-white ${bgColor} shadow-lg`}
    >
      {message}
    </motion.div>
  );
};

Notification.propTypes = {
  id: PropTypes.number.isRequired,
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['success', 'error', 'info']).isRequired,
};

export default Notification;
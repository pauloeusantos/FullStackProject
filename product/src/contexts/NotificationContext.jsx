import React, { createContext, useContext, useReducer } from 'react';
import PropTypes from 'prop-types';
import { Toast } from 'flowbite-react';
import { AnimatePresence, motion } from 'framer-motion';

const NotificationContext = createContext();

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_NOTIFICATION':
      return [...state, { id: Date.now(), ...action.payload }];
    case 'REMOVE_NOTIFICATION':
      return state.filter(notification => notification.id !== action.payload);
    default:
      return state;
  }
};

export const NotificationProvider = ({ children }) => {
  const [notifications, dispatch] = useReducer(notificationReducer, []);

  const addNotification = (message, type = 'info') => {
    dispatch({
      type: 'ADD_NOTIFICATION',
      payload: { message, type }
    });
  };

  const removeNotification = (id) => {
    dispatch({
      type: 'REMOVE_NOTIFICATION',
      payload: id
    });
  };

  return (
    <NotificationContext.Provider value={{ notifications, addNotification, removeNotification }}>
      {children}
      <AnimatePresence>
        {notifications.map((notification) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-4 right-4"
          >
            <Toast>
              <div className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${notification.type === 'success' ? 'bg-green-100 text-green-500' : notification.type === 'error' ? 'bg-red-100 text-red-500' : 'bg-blue-100 text-blue-500'}`}>
                {notification.type === 'success' ? '✓' : notification.type === 'error' ? '✗' : 'i'}
              </div>
              <div className="ml-3 text-sm font-normal">{notification.message}</div>
              <Toast.Toggle onDismiss={() => removeNotification(notification.id)} />
            </Toast>
          </motion.div>
        ))}
      </AnimatePresence>
    </NotificationContext.Provider>
  );
};

NotificationProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useNotification = () => useContext(NotificationContext);
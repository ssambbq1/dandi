import React from 'react';

interface NotificationProps {
  message: string;
  show: boolean;
  color?: string;
}

const Notification: React.FC<NotificationProps> = ({ message, show, color = 'green' }) => {
  if (!show) return null;
  const bgColor = color === 'red' ? 'bg-red-500' : 'bg-green-500';
  return (
    <div className={`fixed top-6 left-1/2 -translate-x-1/2 ${bgColor} text-white px-6 py-3 rounded-lg shadow-lg z-50 text-base animate-fade-in`}>
      {message}
    </div>
  );
};

export default Notification;

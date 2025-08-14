'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import markMessageAsRead from '@/app/actions/markMessageAsRead';
import deleteMessage from '@/app/actions/deleteMessage';
import { useGlobalContext } from '@/context/GlobalContext';
import { Message } from '@/types';

type MessageCardProps = {
  message: Message;
};

const MessageCard = ({ message }: MessageCardProps) => {
  const [isRead, setIsRead] = useState(message.read);
  const [isDeleted, setIsDeleted] = useState(false);

  const { setUnreadMessageCount } = useGlobalContext();

  const handleReadClick = async () => {
    const read = await markMessageAsRead(message._id);

    setIsRead(read);
    setUnreadMessageCount((prevCount: number) =>
      read ? prevCount - 1 : prevCount + 1,
    );
    toast.success(`Marked As ${read ? 'Read' : 'New'}`);
  };

  const handleDeleteClick = async () => {
    await deleteMessage(message._id);
    setIsDeleted(true);
    setUnreadMessageCount((prevCount: number) =>
      isRead ? prevCount : prevCount - 1,
    );
    toast.success('Message Deleted');
  };

  if (isDeleted) {
    return <p>Deleted Message</p>;
  }

  return (
    <div className="relative rounded-md border border-gray-200 bg-white p-4 shadow-md">
      {!isRead && (
        <div className="absolute top-2 right-2 rounded-md bg-yellow-500 px-2 py-1 text-white">
          New
        </div>
      )}
      <h2 className="mb-4 text-xl">
        <span className="font-bold">Property Inquiry:</span>{' '}
        {message.property.name}
      </h2>
      <p className="text-gray-700">{message.body}</p>

      <ul className="mt-4">
        <li>
          <strong>Reply Email:</strong>{' '}
          <a href={`mailto:${message.email}`} className="text-blue-500">
            {message.email}
          </a>
        </li>
        <li>
          <strong>Reply Phone:</strong>{' '}
          <a href={`tel:${message.phone}`} className="text-blue-500">
            {message.phone}
          </a>
        </li>
        <li>
          <strong>Received:</strong>{' '}
          {new Date(message.createdAt).toLocaleString('en-GB')}
        </li>
      </ul>
      <div className="mt-4 flex gap-3">
        <button
          onClick={handleReadClick}
          className={'rounded-md bg-blue-500 px-3 py-1 text-white'}
        >
          {isRead ? 'Mark As New' : 'Mark As Read'}
        </button>
        <button
          onClick={handleDeleteClick}
          className="rounded-md bg-red-500 px-3 py-1 text-white"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default MessageCard;

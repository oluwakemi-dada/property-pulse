import connectDB from '@/config/database';
import Message from '@/models/Message';
import { redirect } from "next/navigation";
import MessageCard from '@/components/MessageCard';
import { getSessionUser } from '@/utils/getSessionUser';
import { convertToSerializeableObject } from '@/utils/convertToSerializeableObject';
import '@/models/Property';
import type { Message as MessageType } from '@/types';

const MessagesPage = async () => {
  await connectDB();

  const sessionUser = await getSessionUser();

  if (!sessionUser) {
    redirect("/signin")
  };

  const { userId } = sessionUser;

  const readMessages = await Message.find({
    recipient: userId,
    read: true,
  })
    .sort({ createdAt: -1 })
    .populate('sender', 'username')
    .populate('property', 'name')
    .lean();

  const unreadMessages = await Message.find({
    recipient: userId,
    read: false,
  })
    .sort({ createdAt: -1 })
    .populate('sender', 'username')
    .populate('property', 'name')
    .lean();

  const messages: MessageType[] = [...unreadMessages, ...readMessages].map(
    (messageDoc) => {
      const message = convertToSerializeableObject(messageDoc);
      message.sender = convertToSerializeableObject(messageDoc.sender);
      message.property = convertToSerializeableObject(messageDoc.property);
      return message;
    },
  );

  return (
    <section className="bg-blue-50">
      <div className="container m-auto max-w-6xl py-24">
        <div className="m-4 mb-4 rounded-md border bg-white px-6 py-8 shadow-md md:m-0">
          <h1 className="mb-4 text-3xl font-bold">Your Messages</h1>

          <div className="space-y-4">
            {messages.length === 0 && <p>You have no messages</p>}
            {messages.length > 0 &&
              messages.map((message) => (
                <MessageCard key={message._id} message={message} />
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MessagesPage;

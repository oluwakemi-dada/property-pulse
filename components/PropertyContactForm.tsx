'use client'

import { FaPaperPlane } from 'react-icons/fa';
import SubmitButton from './SubmitButton';
import { Property } from '@/types';

type PropertyContactFormProps = {
  property: Property;
};

const PropertyContactForm = ({ property }: PropertyContactFormProps) => {
  return (
    <div className="rounded-lg bg-white p-6 shadow-md">
      <h3 className="mb-6 text-xl font-bold">Contact Property Manager</h3>
      <form>
        <input
          type="hidden"
          id="property"
          name="property"
          defaultValue={property._id}
        />
        <input
          type="hidden"
          id="recipient"
          name="recipient"
          defaultValue={property.owner}
        />
        <div className="mb-4">
          <label
            className="mb-2 block text-sm font-bold text-gray-700"
            htmlFor="name"
          >
            Name:
          </label>
          <input
            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
            id="name"
            name="name"
            type="text"
            placeholder="Enter your name"
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="mb-2 block text-sm font-bold text-gray-700"
            htmlFor="email"
          >
            Email:
          </label>
          <input
            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="mb-2 block text-sm font-bold text-gray-700"
            htmlFor="phone"
          >
            Phone:
          </label>
          <input
            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
            id="phone"
            name="phone"
            type="text"
            placeholder="Enter your phone number"
          />
        </div>
        <div className="mb-4">
          <label
            className="mb-2 block text-sm font-bold text-gray-700"
            htmlFor="message"
          >
            Message:
          </label>
          <textarea
            className="focus:shadow-outline h-44 w-full appearance-none rounded border px-3 py-2 text-gray-700 shadow focus:outline-none"
            id="message"
            name="message"
            placeholder="Enter your message"
          ></textarea>
        </div>
        <div>
          <SubmitButton
            pendingLabel="Sending..."
            extraClassNames="flex items-center justify-center"
          >
            <FaPaperPlane className="mr-2" /> Send Message
          </SubmitButton>
        </div>
      </form>
    </div>
  );
};
export default PropertyContactForm;

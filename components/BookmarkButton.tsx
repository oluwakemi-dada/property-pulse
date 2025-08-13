'use client';

import { FaBookmark } from 'react-icons/fa';
import { toast } from 'sonner';
import bookmarkProperty from '@/app/actions/bookmarkProperty';

import { Property } from '@/types';

type BookmarkButtonProps = {
  property: Property;
};

const BookmarkButton = ({ property }: BookmarkButtonProps) => {
  const isBookmarked = false;

  return isBookmarked ? (
    <button className="flex w-full items-center justify-center rounded-full bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-600">
      <FaBookmark className="mr-2" /> Remove Bookmark
    </button>
  ) : (
    <button className="flex w-full items-center justify-center rounded-full bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-600">
      <FaBookmark className="mr-2" /> Bookmark Property
    </button>
  );
};
export default BookmarkButton;

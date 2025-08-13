'use client';

import { useState, useEffect } from 'react';
import { FaBookmark } from 'react-icons/fa';
import { useSession } from 'next-auth/react';
import { toast } from 'sonner';
import bookmarkProperty from '@/app/actions/bookmarkProperty';
import checkBookmarkStatus from '@/app/actions/checkBookmarkStatus';
import { Property } from '@/types';

type BookmarkButtonProps = {
  property: Property;
};

const BookmarkButton = ({ property }: BookmarkButtonProps) => {
  const { data: session } = useSession();
  const userId = session?.user.id;

  const [isBookmarked, setIsBookmarked] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookmarkStatus = async () => {
      if (!userId) {
        setLoading(false);
        return;
      }

      try {
        const res = await checkBookmarkStatus(property._id);

        if (res.isBookmarked) setIsBookmarked(res.isBookmarked);
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : 'Something went wrong';
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchBookmarkStatus();
  }, [property._id, userId]);

  const handleClick = async () => {
    if (!userId) {
      toast.error('You need to be signed in to bookmark a listing');
      return;
    }

    try {
      const res = await bookmarkProperty(property._id);
      setIsBookmarked(res.isBookmarked);
      toast.success(res.message);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Something went wrong';
      toast.error(errorMessage);
      console.error(error);
    }
  };

  const buttonText = isBookmarked ? 'Remove Bookmark' : 'Bookmark Property';
  const buttonColor = isBookmarked
    ? 'bg-red-500 hover:bg-red-600'
    : 'bg-blue-500 hover:bg-blue-600';

  if(loading) {
    return <p className="text-center">Loading...</p>
  }

  return (
    <button
      onClick={handleClick}
      className={`flex w-full items-center justify-center rounded-full px-4 py-2 font-bold text-white ${buttonColor}`}
    >
      <FaBookmark className="mr-2" /> {buttonText}
    </button>
  );
};
export default BookmarkButton;

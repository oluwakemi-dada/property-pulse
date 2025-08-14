import Link from 'next/link';

interface PaginationProps {
  page: number;
  pageSize: number;
  totalItems: number;
}

const Pagination = ({ page, pageSize, totalItems }: PaginationProps) => {
  const totalPages = Math.ceil(totalItems / pageSize);
  const buttonClass = 'px-2 py-1 border border-gray-300 rounded';

  return (
    <nav
      className="container mx-auto my-8 flex items-center justify-center"
      aria-label="Pagination"
    >
      {page > 1 && (
        <Link
          className={`${buttonClass} mr-2`}
          href={`/properties?page=${page - 1}`}
        >
          Previous
        </Link>
      )}

      <span className="mx-2">
        Page {page} of {totalPages}
      </span>

      {page < totalPages && (
        <Link
          className={`${buttonClass} ml-2`}
          href={`/properties?page=${page + 1}`}
        >
          Next
        </Link>
      )}
    </nav>
  );
};

export default Pagination;

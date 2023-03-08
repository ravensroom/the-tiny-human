interface PaginatorProps {
  totalItems: number;
  itemsPerPage: number;
  currentPageIndex: number;
  onPageChange: (pageIndex: number) => void;
}

const Paginator: React.FC<PaginatorProps> = ({
  totalItems,
  itemsPerPage,
  currentPageIndex = 1,
  onPageChange,
}) => {
  const pageRange = Math.ceil(totalItems / itemsPerPage);
  if (pageRange === 1) return null;

  const pageIndexes = Array.from({ length: pageRange }, (_, i) => i + 1);

  return (
    <div className="border-t-1 container mt-4 flex content-end justify-center gap-4">
      {pageIndexes.map((pageIndex) => {
        return (
          <button
            key={pageIndex}
            onClick={() => onPageChange(pageIndex)}
            className={`border border-gray-100 bg-gray-200 px-2 py-1 hover:bg-gray-300 ${
              currentPageIndex === pageIndex ? 'bg-gray-400' : ''
            }`}
          >
            {pageIndex}
          </button>
        );
      })}
    </div>
  );
};

export default Paginator;

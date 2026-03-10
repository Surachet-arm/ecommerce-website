const Pagination = ({ page, pages, onPageChange }) => {
  if (pages <= 1) return null;
  return (
    <div className="mt-8 flex items-center justify-center gap-2">
      {Array.from({ length: pages }).map((_, idx) => {
        const p = idx + 1;
        return (
          <button
            key={p}
            type="button"
            onClick={() => onPageChange(p)}
            className={`rounded-md px-3 py-1 text-sm ${p === page ? 'bg-brand-700 text-white' : 'bg-white border border-stone-300'}`}
          >
            {p}
          </button>
        );
      })}
    </div>
  );
};

export default Pagination;

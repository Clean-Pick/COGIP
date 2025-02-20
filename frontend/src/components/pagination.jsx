// Pagination.jsx
import React from 'react';

export default function Pagination({ currentPage, totalPages, onPageChange }) {
return(

    <div className="flex items-center justify-center mt-15 gap-2">
            <PaginationButton
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                symbol="&#60;"
                className="text-cogip-yellow"
            />

            <PaginationButton onClick={() => onPageChange(1)} active={currentPage === 1}>
                1
            </PaginationButton>

            {currentPage > 3 && <span>...</span>}

            {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter(page => page >= currentPage - 1 && page <= currentPage + 1 && page !== 1 && page !== totalPages)
                .map(page => (
                    <PaginationButton key={page} onClick={() => onPageChange(page)} active={currentPage === page}>
                        {page}
                    </PaginationButton>
                ))}

            {currentPage < totalPages - 2 && <span>...</span>}

            <PaginationButton onClick={() => onPageChange(totalPages)} active={currentPage === totalPages}>
                {totalPages}
            </PaginationButton>

            <PaginationButton
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                symbol="&#62;"
                className="text-cogip-yellow"
            />
        </div>
)
}

        function PaginationButton({ onClick, disabled, active, symbol, children, className }) {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`px-4 py-2 ${active ? 'border-cogip-yellow text-cogip-yellow' : 'text-black-200'} 
                        ${disabled ? 'border border-gray-300' : 'border-cogip-yellow'} 
                        rounded-sm focus:border border-cogip-yellow focus:text-cogip-yellow transition ${className}`}
        >
            {symbol || children}
        </button>
    );
}
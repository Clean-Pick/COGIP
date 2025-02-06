import {useState} from 'react';

export default function Datalist({
                                     title = "default title",
                                     nbre_rows,
                                     columns,
                                     decorationBar = false,
                                     hideSearchBar = true,
                                     hidePagination = true,
                                     adminMode = false
                                 }) {
    // Search
    const [searchQuery, setSearchQuery] = useState("");
    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;

    // Filter
    const filteredRowIndexes = columns.length > 0
        ? columns[0].data.map((_, rowIndex) =>
            columns[0].data[rowIndex]?.toLowerCase().includes(searchQuery.toLowerCase()) // Rechercher uniquement dans la première colonne
        )
        : [];
    // Calcul du nombre de lignes après filtrage
    const filteredRowCount = filteredRowIndexes.filter(Boolean).length;

    // Pagination
    const paginatedRows = filteredRowIndexes
        .map((isVisible, index) => (isVisible ? index : -1)) // Suivi des indices des lignes visibles
        .filter(index => index !== -1) // Supprimer les -1 du tableau de pagination
        .slice((currentPage - 1) * pageSize, currentPage * pageSize); // Récupérer les lignes de la page actuelle

    const totalPages = Math.ceil(filteredRowCount / pageSize);
    // Handle page change
    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    // S'assurer qu'il y a toujours 6 colonnes
    const completeColumns = Array.from({length: 6}, (_, index) => (
        columns[index] || {
            name: '',
            data: Array(nbre_rows).fill('')
        }
    ));

    // Pour le mode admin, limiter les colonnes à 3
    const adminColumns = Array.from({length: 3}, (_, index) => (
        columns[index] || {
            name: '',
            data: Array(nbre_rows).fill('')
        }
    ));

    if (adminMode === true) {
        return (
            <section className="flex-wrap row-span-2 w-full bg-zinc-50 rounded-lg pb-[30px]">
                <h2 className="w-full p-[30px] font-bold text-xl capitalize">{title}</h2>
                <hr className="relative left-[30px] w-10/11 mb-[28px]"/>

                <table className="relative left-[30px] w-10/11">
                    <thead>
                    <Columns columns={adminColumns} adminMode={true}/>
                    </thead>

                    <tbody>
                    <Rows columns={adminColumns} filteredRowIndexes={paginatedRows} adminMode={true}/>
                    </tbody>
                </table>
            </section>
        );
    } else {
        return (
            <section className="px-30 py-10 flex w-full overflow-hidden">
                <div className="datalist w-full overflow-hidden">
                    <h2 className="font-black font-cogip-inter text-5xl capitalize pb-20">{title}</h2>

                    {decorationBar && (
                        <span
                            className="relative block h-7  w-55 bg-cogip-yellow top-[-95px] left-[130px] z-[-1]"></span>
                    )}

                    {!hideSearchBar && (
                        <div className="search-bar mb-10 flex justify-end">
                            <input
                                type="text"
                                className="border px-3 py-2 rounded-lg"
                                placeholder="Search..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    )}


                    <table className="w-full">
                        <thead>
                        <Columns columns={completeColumns}/>
                        </thead>
                        <tbody>
                        <Rows columns={completeColumns} filteredRowIndexes={paginatedRows}/>
                        </tbody>
                    </table>

                    {/* pagination */}
                    {!hidePagination && totalPages > 1 && (
                        <div className="flex items-center justify-center mt-15 gap-2">
                            <PaginationButton
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                symbol="&#60;"
                                className="text-cogip-yellow"
                            /> {/* Bouton Précédent */}

                            <PaginationButton
                                onClick={() => handlePageChange(1)}
                                active={currentPage === 1}
                            >
                                1
                            </PaginationButton> {/* Toujours afficher 1er page */}

                            {currentPage > 3 && <span>...</span>} {/* "..." si on est loin du début */}

                            {/* Pages autour de la page actuelle */}
                            {Array.from({length: totalPages}, (_, i) => i + 1)
                                .filter(page => page >= currentPage - 1 && page <= currentPage + 1 && page !== 1 && page !== totalPages)
                                .map(page => (
                                    <PaginationButton
                                        key={page}
                                        onClick={() => handlePageChange(page)}
                                        active={currentPage === page}
                                    >
                                        {page}
                                    </PaginationButton>
                                ))}

                            {currentPage < totalPages - 2 && <span>...</span>} {/* "..." si on est loin de la fin */}

                            <PaginationButton
                                onClick={() => handlePageChange(totalPages)}
                                active={currentPage === totalPages}
                            >
                                {totalPages}
                            </PaginationButton> {/* Toujours afficher la dernière page */}

                            <PaginationButton
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                symbol="&#62;"
                                className="text-cogip-yellow"
                            /> {/*Suivant */}
                        </div>
                    )}
                </div>
            </section>
        );
    }

}


function Columns({columns, adminMode = false}) {

    if (adminMode === true) {

        return (

            <tr className="text-left font-cogip-inter capitalize font-semibold">
                {columns.map((col, index) => (
                    <th key={index} className={index === 0 ? "w-1/3" : "w-1/3"}>{col.name}</th> // Appliquer pl-8 uniquement à la première colonne
                ))}
            </tr>

        )

    } else {
        return (

            <tr className="text-left font-cogip-roboto bg-cogip-yellow h-12 capitalize font-semibold">
                {columns.map((col, index) => (
                    <th key={index} className={index === 0 ? "pl-8 w-1/6" : "w-1/6"}>{col.name}</th> // Appliquer pl-8 uniquement à la première colonne
                ))}
            </tr>
        );
    }


}

function Rows({columns, filteredRowIndexes, adminMode}) {

    if (adminMode === true) {

        return filteredRowIndexes.map((i, rowIndex) => {  // Si la ligne ne correspond pas à la recherche, on la saute


            return (
                <tr key={i} className={`text-left font-cogip-inter`}>
                    {columns.map((col, index) => (
                        <td key={index} className={index === 0 ? "w-1/3 h-16" : "w-1/3 h-16"}>{col.data[i]}</td> // Appliquer pl-8 uniquement à la première colonne
                    ))}
                </tr>
            );
        });

    } else {
        return filteredRowIndexes.map((i, rowIndex) => {  // Si la ligne ne correspond pas à la recherche, on la saute
            const backgroundColor = rowIndex % 2 === 0 ? "bg-white" : "bg-gray-100";

            return (
                <tr key={i} className={`text-left font-cogip-roboto font-semibold pl-3 ${backgroundColor}`}>
                    {columns.map((col, index) => (
                        <td key={index} className={index === 0 ? "pl-8 w-1/6 h-12" : "w-1/6 h-12"}>{col.data[i]}</td> // Appliquer pl-8 uniquement à la première colonne
                    ))}
                </tr>
            );
        });
    }

}

function PaginationButton({onClick, disabled, active, symbol, children, className}) {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`px-4 py-2 ${active ? 'border-cogip-yellow text-cogip-yellow' : 'text-black-200'} 
                        ${disabled ? 'border border-gray-300' : 'border-cogip-yellow'} 
                        rounded-sm 
                        focus:border border-cogip-yellow focus:text-cogip-yellow transition  ${className}`}
        >
            {symbol || children}
        </button>
    );
}
import { useState } from 'react';

export default function Datalist({title, nbre_rows, columns, decorationBar, hideSearchBar}) {

    // Search
    const [searchQuery, setSearchQuery] = useState("");
    // Filter 
    const filteredRowIndexes = columns.length > 0 
        ? columns[0].data.map((_, rowIndex) => 
            columns.some(col => col.data[rowIndex]?.toLowerCase().includes(searchQuery.toLowerCase()))
          )
        : [];
      //calcul nbr after filter
      const filteredRowCount = filteredRowIndexes.filter(Boolean).length;

    // S'assurer qu'il y a toujours 6 colonnes
    const completeColumns = Array.from({length: 6}, (_, index) => {
        return columns[index] || {
            name: '',
            data: Array(nbre_rows).fill('')
        }; // Remplir avec des colonnes vides si nécessaire
    });


    return (
        <section className="p-30 flex w-full overflow-hidden">
            <div className="datalist w-full overflow-hidden">
                <h2 className="font-black font-cogip-inter text-5xl capitalize pb-20">{title}</h2>
                
                {decorationBar && (
                    <span className="relative block h-7 mb-[-89px]
                     w-55 bg-cogip-yellow top-[-95px] left-[130px] z-[-1]"></span>
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
                    <Rows nbre_rows={nbre_rows} columns={completeColumns} filteredRowIndexes={filteredRowIndexes}/>
                    </tbody>
                </table>
            </div>
        </section>
    );
}

function Columns({columns}) {
    return (
        <tr className="text-left font-cogip-roboto bg-cogip-yellow h-12 capitalize font-semibold">
            {columns.map((col, index) => (
                <th key={index} className={index === 0 ? "pl-8 w-1/6" : "w-1/6"}>{col.name}</th> // Appliquer pl-8 uniquement à la première colonne
            ))}
        </tr>
    );
}

function Rows({nbre_rows, columns, filteredRowIndexes}) {
    let rows = [];

    for (let i = 0; i < nbre_rows; i++) {
        if (!filteredRowIndexes[i]) continue;  //Si la ligne ne correspond pas à la recherche, on la saute

        const backgroundColor = i % 2 === 0 ? "bg-white" : "bg-gray-100";

        rows.push(
            <tr className={`text-left font-cogip-roboto font-semibold pl-3 ${backgroundColor}`}>
                {columns.map((col, index) => (
                    <td key={index} className={index === 0 ? "pl-8 w-1/6 h-12" : "w-1/6 h-12"}>{col.data[i]}</td> // Appliquer pl-8 uniquement à la première colonne
                ))}
            </tr>
        );
    }
    return rows;
}
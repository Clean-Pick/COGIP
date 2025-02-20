// Datalist.jsx
import {useState} from 'react';
import {Link} from "react-router-dom";
import Pagination from "./pagination";

export default function Datalist({
                                     title = "default title",
                                     columns,
                                     dataType,
                                     decorationBar = false,
                                     hideSearchBar = true,
                                     hidePagination = true,
                                     adminMode = false
                                 }) {
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;

    const filteredRowIndexes = columns.length > 0
        ? columns[0].data.map((_, rowIndex) =>
            columns[0].data[rowIndex]?.toLowerCase().includes(searchQuery.toLowerCase()) ? rowIndex : -1
        ).filter((index) => index !== -1)
        : [];

    const filteredRowCount = filteredRowIndexes.length;
    const totalPages = Math.ceil(filteredRowCount / pageSize);

    const paginatedRows = adminMode
        ? filteredRowIndexes.slice(0, 5)
        : filteredRowIndexes.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const displayedColumns = adminMode ? columns.slice(0, 3) : columns;

    return adminMode ? (
        <section className="flex-wrap row-span-2 w-full bg-zinc-50 rounded-lg pb-[30px]">
            <h2 className="w-full p-[30px] font-bold text-xl capitalize">{title}</h2>
            <hr className="relative left-[30px] w-10/11 mb-[28px]"/>
            <table className="relative left-[30px] w-full">
                <thead>
                <Columns columns={displayedColumns} adminMode={true}/>
                </thead>
                <tbody>
                <Rows columns={displayedColumns} filteredRowIndexes={paginatedRows} adminMode={true}
                      dataType={dataType}/>
                </tbody>
            </table>
        </section>
    ) : (
        <section className="px-30 py-10 flex w-full overflow-hidden">
            <div className="datalist w-full overflow-hidden">
                <h2 className="font-black font-cogip-inter text-5xl capitalize mb-20">{title}</h2>
                {decorationBar &&
                    <span className="relative block h-7 w-55 bg-cogip-yellow top-[-100px] left-[130px] z-[-1]"></span>}
                {!hideSearchBar && (
                    <div className="search-bar mb-8 flex justify-end">
                        <input type="text" className="border px-3 py-2 rounded-lg" placeholder="Search..."
                               value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>
                    </div>
                )}
                <table className="w-full">
                    <thead>
                    <Columns columns={displayedColumns}/>
                    </thead>
                    <tbody>
                    <Rows columns={displayedColumns} filteredRowIndexes={paginatedRows} dataType={dataType}/>
                    </tbody>
                </table>
                {!hidePagination && totalPages > 1 &&
                    <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange}/>}
            </div>
        </section>
    );
}

function Columns({columns, adminMode = false}) {
    return (
        <tr className={adminMode ? "text-left font-cogip-inter capitalize font-semibold" : "text-left font-cogip-roboto bg-cogip-yellow h-12 capitalize font-semibold"}>
            {columns.map((col, index) => (
                <th key={index} className={adminMode ? "w-1/3" : "pl-8 w-1/6"}>{col.name}</th>
            ))}
        </tr>
    );
}

function Rows({columns, filteredRowIndexes, adminMode, dataType}) {
    return filteredRowIndexes.map((originalIndex, rowIndex) => {
        const rowClass = adminMode ? "text-left font-cogip-inter" : rowIndex % 2 === 0 ? "bg-white" : "bg-gray-100";
        return (
            <tr key={originalIndex} className={rowClass}>
                {columns.map((col, index) => (
                    <td key={index} className={adminMode ? "w-1/6 h-16" : "px-4 py-2"}>
                        {index === 0 && (dataType === "companies" || dataType === "contacts") ? (
                            adminMode ? (
                                <span className="text-black ">{col.data[originalIndex]}</span>
                            ) : (
                                <Link to={`/${dataType}/${col.id[originalIndex]}`}
                                      className="underline underline-offset-2">
                                    {col.data[originalIndex]}
                                </Link>
                            )
                        ) : (
                            col.data[originalIndex]
                        )}
                    </td>
                ))}
            </tr>
        );
    });
}

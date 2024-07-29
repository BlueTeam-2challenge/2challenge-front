import styles from "./Search.module.css";
import { Search } from "lucide-react";
import { useState, useEffect } from "react";
import { tableTst } from "./test";

const SearchBar = () => {
    const [search, setSearch] = useState("");
    const [table, setTable] = useState(tableTst);

    // Testando a busca
    const handleSearch = () => {
        const searchLowercase = search.toLowerCase();
        const tableFilter = tableTst.filter((tst) =>
            tst.name.toLowerCase().includes(searchLowercase) || tst.description.toLowerCase().includes(searchLowercase)
        );
        setTable(tableFilter);
    };

    useEffect(() => {
        if (search === "") {
            setTable(tableTst);
        }
    }, [search]);
    // Fim do teste

    return (
        <div>
            <div className={styles.searchWrapper}>
                <input
                    type="search"
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <Search className={styles.search_btn} onClick={handleSearch}/>
            </div>

            {/* Teste da busca */}
            <ul>
                {table.map((tst) => (
                    <li key={tst.name}>
                        <ul>
                            <p>{tst.name}</p>
                            <p>{tst.description}</p>
                        </ul>
                    </li>
                ))}
            </ul>
            {/* Fim do teste */}
        </div>
    );
};

export default SearchBar;

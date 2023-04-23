import { faSearch, faTimes } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useContext, useEffect, useRef, useState } from "react"
import { OrdersContext } from "../../../context/OrdersContext"
import { filterSearch } from "../../../funtions/filterSearch"
import { Link } from "react-router-dom"

const Searcher = () => {

    const { searchProduct, searchResult, viewProductSearch, setViewProductSearch } = useContext(OrdersContext)
    const [searchVisible, setSearchVisible] = useState(false)
    const inputRef = useRef(null)
    const [loadedProducts, setLoadedProducts] = useState(1);

    const products = viewProductSearch.slice(0, loadedProducts * 10)

    const openAndCloseSearch = () => {
        return !searchVisible ?
            <FontAwesomeIcon icon={faSearch} onClick={() => setSearchVisible(true)} />
            :
            <FontAwesomeIcon icon={faTimes} onClick={() => {
                setSearchVisible(false)
                setViewProductSearch([])
            }} />
    }

    const loadOnScroll = e => {
        if (products.length < viewProductSearch.length)
            if ((e.scrollTop + e.clientHeight + 5) >= e.scrollHeight) setLoadedProducts(loadedProducts + 1)
    }

    useEffect(() => {
        searchVisible && inputRef.current.focus();
    }, [searchVisible])

    return (
        <div className="searcher">
            {openAndCloseSearch()}
            {searchVisible &&
                <form>
                    <input
                        type="text"
                        placeholder="Código"
                        onChange={({ target }) => {
                            const dataSearch = { code: target.value.trim(), name: '' }
                            searchProduct({ ...dataSearch })
                            setViewProductSearch(filterSearch({ ...dataSearch, searchResult }))
                            setLoadedProducts(1)
                        }}
                        ref={inputRef}
                    />
                    <input
                        type="text"
                        placeholder="Nombre producto"
                        onChange={({ target }) => {
                            const dataSearch = { code: '', name: target.value.trim() }
                            searchProduct({ ...dataSearch })
                            setViewProductSearch(filterSearch({ ...dataSearch, searchResult }))

                        }}
                    />
                    <div className="containerResultSearch" onScroll={({ target }) => loadOnScroll(target)}>
                        {products.map(e =>
                            <Link
                                target="_blank"
                                to={'/' + e.id}
                                key={e.id}
                                className="resultSearch"
                            >
                                <img src={e.picture} alt={e.name} />
                                <div>
                                    <span> {e.code} <br /> {e.name} </span>
                                </div>
                            </Link>
                        )}
                    </div>
                </form>}
        </div>
    )
}

export default Searcher
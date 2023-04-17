import { faSearch, faTimes } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useContext, useState } from "react"
import { OrdersContext } from "../../../context/OrdersContext"
import { filterSearch } from "../../../funtions/filterSearch"
import { Link } from "react-router-dom"

const Searcher = () => {

    const {
        searchProduct,
        searchResult,
        viewProductSearch,
        setViewProductSearch
    } = useContext(OrdersContext)
    const [searchVisible, setSearchVisible] = useState(false)

    return (
        <div className="searcher">
            {searchVisible ?
                <FontAwesomeIcon icon={faTimes} onClick={() => setSearchVisible(false)} />
                :
                <FontAwesomeIcon icon={faSearch} onClick={() => setSearchVisible(true)} />
            }
            {searchVisible &&
                <form>
                    <input
                        type="text"
                        placeholder="Código"
                        onChange={({ target }) => {
                            const dataSearch = { code: target.value.trim(), name: '' }
                            searchProduct({ ...dataSearch })
                            setViewProductSearch(filterSearch({ ...dataSearch, searchResult }))

                        }}
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
                    <div className="containerResultSearch">
                        {viewProductSearch.map(e =>
                            <Link
                                target="_blank"
                                to={'/' + e.id}
                                key={e.id}
                                onClick={() => {
                                    // setViewProductSearch([])
                                }}
                                type="button"
                                className="resultSearch">
                                <img src={e.picture} />
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
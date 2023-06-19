import { faSearch, faTimes } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useContext, useEffect, useState } from "react"
import { OrdersContext } from "../../../context/OrdersContext"
import { Link } from "react-router-dom"
import Loading from '../../Loading/Loading'

const Searcher = () => {

    const { searchProduct, searchResult } = useContext(OrdersContext)
    const [searchVisible, setSearchVisible] = useState(false)
    const [loading, setLoading] = useState(true)

    const openAndCloseSearch = () => {
        return !searchVisible ?
            <FontAwesomeIcon icon={faSearch} onClick={() => setSearchVisible(true)} />
            :
            <FontAwesomeIcon icon={faTimes} onClick={() => setSearchVisible(false)} />
    }

    useEffect(() => {
        setLoading(false)
    }, [searchResult])

    return (
        <div className="searcher">
            {openAndCloseSearch()}
            {searchVisible &&
                <form>
                    <input
                        type="text"
                        placeholder="Código"
                        onChange={({ target }) => {
                            setLoading(true)
                            const dataSearch = { code: target.value.trim(), name: '' }
                            searchProduct({ ...dataSearch })
                        }}
                    />
                    <input
                        type="text"
                        placeholder="Nombre producto"
                        onChange={({ target }) => {
                            setLoading(true)
                            const dataSearch = { code: '', name: target.value.trim() }
                            searchProduct({ ...dataSearch })
                        }}
                    />
                    {loading ?
                        <Loading />
                        :
                        <div className="containerResultSearch">
                            {searchResult &&
                                searchResult.map(e =>
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
                                )

                            }
                        </div>
                    }
                </form>}
        </div>
    )
}

export default Searcher
import { faSearch, faTimes } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useContext, useEffect, useState } from "react"
import { OrdersContext } from "../../../context/OrdersContext"
import { Link, useNavigate } from "react-router-dom"
import Loading from '../../Loading/Loading'

const Searcher = () => {

    const { searchProduct, searchResult } = useContext(OrdersContext)
    const [searchVisible, setSearchVisible] = useState(false)
    const [loading, setLoading] = useState(true)
    const [searchValue, setSearchValue] = useState()

    const navigate = useNavigate()

    const openAndCloseSearch = () => {
        return !searchVisible ?
            <FontAwesomeIcon icon={faSearch} onClick={() => setSearchVisible(true)} />
            :
            <FontAwesomeIcon icon={faTimes} onClick={() => setSearchVisible(false)} />
    }

    const submitFormSearch = (e) => {
        e.preventDefault()
        searchValue && navigate(`/buscador/${searchValue}`)
        setSearchVisible(false)
    }

    useEffect(() => {
        setLoading(false)
    }, [searchResult])

    return (
        <div className="searcher">
            {openAndCloseSearch()}
            {searchVisible &&
                <form onSubmit={e => submitFormSearch(e)}>
                    <input
                        type="text"
                        placeholder="Código"
                        onChange={({ target }) => {
                            setLoading(true)
                            const dataSearch = { code: target.value.trim(), name: '' }
                            setSearchValue(JSON.stringify(dataSearch))
                            searchProduct({ ...dataSearch })
                        }}
                    />
                    <input
                        type="text"
                        placeholder="Nombre producto"
                        onChange={({ target }) => {
                            setLoading(true)
                            const dataSearch = { code: '', name: target.value.trim() }
                            setSearchValue(JSON.stringify(dataSearch))
                            searchProduct({ ...dataSearch })
                        }}
                    />
                    <button type="submit"></button>
                    {loading ?
                        <Loading />
                        :
                        <div className="containerResultSearch">
                            {searchResult &&
                                searchResult.map(e =>
                                    <Link
                                        to={'/' + e.id}
                                        key={e.id}
                                        className="resultSearch"
                                        title={e.name}
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
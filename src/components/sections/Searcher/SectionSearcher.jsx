import { useContext, useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { NavigationContext } from "../../../context/NavigationContext"
import './SeactionSearcher.css'
import { urlHost } from "../../../constants/constants"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowAltCircleLeft } from "@fortawesome/free-solid-svg-icons"

export const SearcherSection = () => {

    const { setSectionCurrent, sectionCurrent } = useContext(NavigationContext)

    const { searchValue } = useParams()

    const [offset, setOffset] = useState(2)
    const [result, setResult] = useState(null)
    const [searcher, setSearcher] = useState()

    const { name, code } = JSON.parse(searchValue)

    const navigate = useNavigate()

    const submitFormSearch = (e) => {
        e.preventDefault()
        navigate(`/buscador/${searcher}`)
    }

    useEffect(() => {
        sectionCurrent !== '' && setResult(null)
        setSectionCurrent('')

        fetch(`${urlHost}sectionSearchProduct.php?name=${name}&code=${code}&offset=${(offset * 10) - 20}`)
            .then(e => e.json())
            .then(e => {
                console.log(e)
                if (e?.response === 'error') {
                    setResult(null)
                    console.log(e)
                } else {
                    console.log(e)
                    setResult(e)
                }
            })
    }, [searchValue, offset])

    return (
        <section className="sectionSearcher">
            <div className='back'>
                <FontAwesomeIcon icon={faArrowAltCircleLeft} />
                <Link to={'/productos/all'}>Volver para productos</Link>
            </div>
            <header className="headerSectionSearcher">
                <h1>
                    Resultados de la busqueda "{name}{code}"
                </h1>
                <form className="formSectionSearcher" onSubmit={e => submitFormSearch(e)}>
                    <input
                        type="text"
                        placeholder="Código"
                        onChange={({ target }) => {
                            const dataSearch = { code: target.value.trim(), name: '' }
                            setSearcher(JSON.stringify(dataSearch))
                        }}
                    />
                    <input
                        type="text"
                        placeholder="Nombre producto"
                        onChange={({ target }) => {
                            const dataSearch = { code: '', name: target.value.trim() }
                            setSearcher(JSON.stringify(dataSearch))
                        }}
                    />
                    <button type="submit"></button>
                </form>
            </header>
            <div className="ContainerResultProductSearch">
                {result &&
                    result.products.map(e => (
                        <Link key={e.id} to={'/' + e.id} className="resultProductSearch">
                            <div className="containerPicture">
                                <img src={e.picture} alt={e.name} />
                            </div>
                            <span>{e.code}</span>
                            <h2>{e.name}</h2>
                        </Link>
                    ))}
            </div>
            {result &&
                <div className='pagination'>
                    {offset > 2 && <button onClick={() => setOffset(offset - 2)}>Anterior</button>}
                    <span>{offset / 2} de {Math.ceil(result.total / 20)}</span>
                    {(offset * 10) < result.total && <button onClick={() => setOffset(offset + 2)}>Siguente</button>}
                </div>
            }
        </section>
    )
}
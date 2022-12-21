import { faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Loading from '../Loading/Loading'
import './Detail.css'

const Detail = () => {

    const { productId } = useParams()
    const [detail, setDetail] = useState()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)
        fetch('http://localhost:80/Bazar-Backend/productDetail.php?id=' + productId)
            .then(e => e.json())
            .then(e => {
                setDetail(e[0])
                setLoading(false)
            })
    }, [productId])


    return (
        <section className='sectionDetail'>
            {
                loading ?
                    <Loading />
                    :
                    <div>
                        {console.log(detail)}
                        <div className='back' onClick={() => window.history.back()}>
                            <FontAwesomeIcon icon={faArrowAltCircleLeft} />
                            <span>Volver para atras</span>
                        </div>
                        <div className='containerDetail'>
                            <div className='containerImage'>
                                <img src={detail.picture} alt={detail.name} />
                            </div>
                            <div>
                                <span className='detailCode'>Código: {detail.code}</span>
                                <h1 className='detailName'>{detail.name}</h1>
                            </div>
                        </div>
                    </div>
            }
        </section>
    )
}

export default Detail
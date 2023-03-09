import { useContext, useEffect } from 'react'
import { NavigationContext } from '../../../context/NavigationContext'
import './Home.css'
import Sections from './Sections'
const Home = () => {

    const { setSectionCurrent, sections } = useContext(NavigationContext)

    useEffect(() => {
        setSectionCurrent('inicio')
    }, [])

    return (
        <section>
            <Sections sections={sections} />
            <h2>Inicio</h2>
        </section>
    )
}

export default Home
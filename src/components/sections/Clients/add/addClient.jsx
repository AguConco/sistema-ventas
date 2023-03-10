import { useContext } from "react"
import { useState } from "react"
import { ClientContext } from "../../../../context/ClientContext"
import { generateId } from "../../../../funtions/generateId"

const AddClient = () => {

    const { addClient } = useContext(ClientContext)

    const [name, setName] = useState()
    const [transport, setTransport] = useState()

    return (
        <section className="sectionAddClient">
            <h3>Agregar nuevo cliente</h3>
            <form id="formAddClient" 
            onSubmit={e => {
                e.preventDefault()
                const dataClient = {
                    name: name.charAt(0).toUpperCase() + name.slice(1),
                    generateId: generateId()
                }
                addClient(dataClient)
                document.getElementById('formAddClient').reset()
            }}
            onReset={()=>{
                setName('')
                setTransport('')
            }}
            >
                <input type="text" placeholder="Cliente / Nombre" onChange={e => setName(e.target.value)} value={name} required />
                <input type="text" placeholder="Transporte (opcional)" onChange={e => setTransport(e.target.value)} value={transport} />
                <button className="reset" type="reset">reset</button>
                <button className="agregar" type="submit">Agregar</button>
            </form>
        </section>
    )
}

export default AddClient
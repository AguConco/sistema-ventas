import { useState } from "react"
import Loading from "../Loading/Loading"

export const DeleteImageDrive = ({ data }) => {

    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState(null)

    const deleteImageDrive = () => {
        setLoading(true)

        fetch('https://upload-google-drive.onrender.com/deleteFile', {
            method: 'DELETE',
            body: JSON.stringify({ name: data.name, folderId: data.folderId }),
        })
            .then((e) => e.json())
            .then((e) => {
                setMessage(e.message)
                setTimeout(() => setMessage(null), 3000)
            })
            .finally(() => setLoading(false))
    }

    return (
        !loading
            ? <>
                <button className="delete-image-drive" onClick={deleteImageDrive}>Eliminar de Drive {message && <pre>{message}</pre>}</button>
            </>
            : <Loading />
    )
}
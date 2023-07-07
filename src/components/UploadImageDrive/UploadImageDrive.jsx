import fondoImgDrive from '../../assets/images/fondo-img-drive.png'
import logodrive from '../../assets/images/drive.png'
import { useContext, useEffect, useRef, useState } from 'react'
import { ProductContext } from '../../context/ProductContext'
import Loading from '../../components/Loading/Loading'
import './UploadImageDrive.css'

// import pictureDev from '../../assets/images/04350054_04350054_0_2023-06-12_03_00_04.webp'

export const UploadImageDrive = ({ data, setImageDrive }) => {

    const { picture, name, price, id, folder } = data
    const { changeFolderDrive } = useContext(ProductContext)

    const [canvasValue, setCanvasValue] = useState(true)
    const [folders, setFolders] = useState([])
    const [folderId, setFolderId] = useState(folder)
    const [loadingFolders, setLoadingFolders] = useState(true)
    const [loadingUploadImage, setLoadingUploadImage] = useState(false)

    const nameFolder = folders.filter(e => e.id === folderId)[0]?.name

    const canvasRef = useRef(null)

    const uploadDriveImage = () => {

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d')

        const imageBackground = new Image()
        imageBackground.src = fondoImgDrive

        imageBackground.onload = () => {
            const widthCanvas = canvas.width
            const heightCanvas = canvas.height

            ctx.drawImage(imageBackground, 0, 0, widthCanvas, heightCanvas)

            const image = new Image()
            image.crossOrigin = 'anonymous';
            image.src = picture

            image.onload = function () {
                const maxWidthPicture = (widthCanvas / 2)
                const maxHeightPicture = (heightCanvas / 2)

                const proportion = Math.min(maxWidthPicture / image.width, maxHeightPicture / image.height)

                ctx.drawImage(
                    image,
                    (widthCanvas / 2) - (image.width * proportion) / 2, // posición en X
                    (heightCanvas / 2) - (image.height * proportion) / 2, // posición en Y
                    image.width * proportion, // tamaño de la imagen en X
                    image.height * proportion // tamaño de la imagen en X
                )

                function wrapText() {
                    const words = name.split(' ');
                    let line = '';
                    let lines = [];

                    for (let i = 0; i < words.length; i++) {
                        const word = words[i];
                        const testLine = line + word + ' ';
                        const metrics = ctx.measureText(testLine);
                        const testWidth = metrics.width;

                        if (testWidth > 630) {
                            lines.push(line.trim());
                            line = word + ' ';
                        } else {
                            line = testLine;
                        }
                    }

                    lines.push(line.trim());
                    return lines;
                }

                const fontPromise = document.fonts.load(`1em Copperplate`);

                fontPromise.then(() => {
                    ctx.font = '55px Copperplate'
                    ctx.textAlign = 'center'

                    const lines = wrapText()
                    const lineHeight = lines.length >= 3 ? 40 : 45;
                    const startY = 50;

                    for (let i = 0; i < lines.length; i++) {
                        const line = lines[i];
                        let y = startY + (lineHeight * i);

                        if (lines.length === 1) y = 75

                        ctx.fillText(line, 540, y + 50);
                    }

                    ctx.fillStyle = 'white'
                    ctx.fillText('$' + price, 540, 985);

                    setImageDrive(canvas.toDataURL())
                    setCanvasValue(false)
                    setLoadingUploadImage(true)

                    fetch(`https://upload-drive.onrender.com/upload`, {
                        method: 'POST',
                        body: JSON.stringify({ image: canvas.toDataURL(), name, folder: folderId }),
                    })
                        .then(e => {
                            // ademas de un mensaje onda notificacion
                            setCanvasValue(true)
                            changeFolderDrive({ folderId, id })
                                .then(e => e.json())
                                .then(e => {
                                    setFolderId(e.newFolder)
                                    setLoadingUploadImage(false)
                                })
                        })
                        .catch(error => {
                            console.log('Error al guardar la imagen:', error);
                        });
                })
            }
        }
    }

    useEffect(() => {
        fetch(`https://upload-drive.onrender.com/upload`)
            .then(e => e.json())
            .then(e => {
                setFolders(e)
                setLoadingFolders(false)
            })
            .catch(error => {
                console.log('error al obtener las carpetas', error);
            });
    }, [])

    return (
        <>
            {canvasValue && <canvas ref={canvasRef} width={1080} height={1080}></canvas>}
            {loadingFolders
                ? <Loading />
                : <>
                    <>
                        {folderId === folder
                            ? <span className='folderName'>
                                Esta en la carpeta
                                <a href={folders.filter(e => e.id === folderId)[0]?.webViewLink} target='_blank'>{nameFolder}</a>
                            </span>
                            : <span className='folderName'>
                                Cambiar a
                                <a href={folders.filter(e => e.id === folderId)[0]?.webViewLink} target='_blank'>{nameFolder}</a>
                            </span>
                        }
                        <select className='selectFolder' onChange={({ target }) => setFolderId(target.value)}>
                            <option value={''}>{nameFolder ? 'Selecciona otra carpeta' : 'Selecciona una carpeta'}</option>
                            {folders.map(e => <option key={e.id} value={e.id}>{e.name}</option>)}
                        </select>
                    </>
                    {loadingUploadImage
                        ? <Loading />
                        : nameFolder && <button onClick={uploadDriveImage}><img src={logodrive} />Agregar a Drive</button>
                    }
                </>
            }
        </>
    )
}
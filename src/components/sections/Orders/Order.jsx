import { useContext, useState } from "react"
import { OrdersContext } from "../../../context/OrdersContext"

const Order = () => {

    const { currentOrder, searchProduct, searchResult, addProductToOrder } = useContext(OrdersContext)
    
    const [code, setCode] = useState('')
    const [checkboxEnabled, setCheckboxEnabled] = useState(false)
    const [selectedProduct, setSelectedProduct] = useState('')
    const [subtotal, setSubtotal] = useState(0)

    const filterSearch = (code) => {
        for(let i = 0; i < searchResult.length; i++){
            if (searchResult[i].code.includes(code)) {
                setSelectedProduct({
                    name: searchResult[i].name,
                    picture :searchResult[i].picture,
                    price: searchResult[i].price.price_wholesaler,
                    code: searchResult[i].code,                   
                    id: searchResult[i].id                    
                })
                break
            }else setSelectedProduct('')
        } 
    }

    return (
        <div className='detailOrder'>
            <h4>Pedido para: <span>{currentOrder.client}</span></h4>
            <h4>Total: <span>$00</span></h4>
            <table cellSpacing={0}>
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Cantidad</th>
                        <th>Producto</th>
                        <th>p/unidad</th>
                        <th>subtotal</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td contenteditable={checkboxEnabled ? "false" : "true"}
                            onKeyDown={e => {
                                if(e.keyCode === 13) {
                                    e.target.blur()
                                    selectedProduct !== '' && setCheckboxEnabled(true)
                                } 
                            }}
                            onKeyUp={e => {
                                setCheckboxEnabled(false)
                                const target = e.target.innerText
                                target.length !== 0 ? filterSearch(target) : setSelectedProduct('') 
                                
                                target.length > 5 ?
                                    e.target.innerText = code
                                    :
                                    setCode(target)
                                searchProduct({ code: target, name: '' })
                            }
                            }
                        >
                            {checkboxEnabled && (code !== selectedProduct.code && selectedProduct.code) }
                        </td>
                        <td
                            onKeyUp={e => setSubtotal(parseInt(e.target.innerText) * selectedProduct.price)}
                            onKeyDown={e => {
                                if(e.keyCode === 13) {
                                    e.target.blur()
                                    addProductToOrder({
                                        productId: selectedProduct.id,
                                        orderId: currentOrder.order_id,
                                        quantity: subtotal / selectedProduct.price,
                                        subtotal
                                    })
                                }
                            }}
                            contenteditable={checkboxEnabled && "true"}
                            ></td>
                        <td
                            onKeyUp={e => console.log(e.target.innerText)}>
                            <div>
                                <img src={selectedProduct.picture} alt={selectedProduct.name} />
                                <span>{selectedProduct.name}</span>
                            </div>
                        </td>
                        <td>{selectedProduct.price && '$'+selectedProduct.price}</td>
                        <td>{subtotal && '$'+subtotal}</td>
                    </tr>
                </tbody>
            </table>
        </div >
    )
}

// FALTA QUE CUANDO COMPLETE LA CANTIDAD SE CONFIRME QUE SE AGREGÓ ESE PRODUCTO AL PEDIDO 

export default Order  


// let buscar = $('#buscar').val();
// let producto2 = '';

// for(let i = 0; i < datos_respuesta.length; i++){

//     if(datos_respuesta[i].descripcion.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,"").includes(buscar.toLowerCase().trim()) == true || datos_respuesta[i].codigo.includes(buscar.toLowerCase().trim()) == true){
//         producto2 +=`<tr class="fila1" id="${datos_respuesta[i].codigo}" >
//                         <td class="codigo" >#${datos_respuesta[i].codigo}</td>
//                         <td class="descripcion"><p title="${datos_respuesta[i].descripcion.toLowerCase()}">${datos_respuesta[i].descripcion.charAt(0).toUpperCase() + datos_respuesta[i].descripcion.slice(1)}</p></td>
//                         <td class="p-precios">$ ${datos_respuesta[i].pCompra}</td>
//                         <td class="p-precios">$ ${datos_respuesta[i].pVenta}</td>
//                         <td class="stock">${datos_respuesta[i].stock}</td>
//                         <td class="opciones"><i class="fas fa-edit editar"></i><i class="fas fa-trash-alt borrar"></i></td>
//                     </tr>` 
                    
//     }
                   
// }
// $('#div-tabla-productos').html(producto2 || '<h4 class="no-encuentro">No se encontró el producto "' + buscar +'"</h4>');

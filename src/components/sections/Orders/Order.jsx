import { useContext, useState } from "react"
import { OrdersContext } from "../../../context/OrdersContext"

const Order = () => {

    const { currentOrder, searchProduct, searchResult } = useContext(OrdersContext)
    
    const [code, setCode] = useState('')
    const [filteredProduct, setFilteredProduct] = useState('')

    const filterSearch = (code) => {
        for(let i = 0; i < searchResult.length; i++){
            if (searchResult[i].code.includes(code)) {
                setFilteredProduct({
                    name: searchResult[i].name,
                    picture :searchResult[i].picture,
                    price: searchResult[i].price.price_wholesaler,                    
                })
                break
            }else setFilteredProduct('')
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
                        <td contenteditable="true"
                            onKeyDown={e => e.keyCode == 13 && e.target.blur()}
                            onKeyUp={e => {
                                const target = e.target.innerText
                                target.length !== 0 ? filterSearch(target) : setFilteredProduct('') 
                                
                                target.length > 5 ?
                                    e.target.innerText = code
                                    :
                                    setCode(target)
                                searchProduct({ code: target, name: '' })
                            }
                            }
                        ></td>
                        <td></td>
                        <td
                            onKeyDown={e => e.keyCode == 13 && e.target.blur()}
                            onKeyUp={e => console.log(e.target.innerText)}>
                            <div>
                                <img src={filteredProduct.picture} alt={filteredProduct.name} />
                                <span>{filteredProduct.name}</span>
                            </div>
                        </td>
                        <td>{filteredProduct.price}</td>
                        <td></td>
                    </tr>
                </tbody>
            </table>
        </div >
    )
}

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

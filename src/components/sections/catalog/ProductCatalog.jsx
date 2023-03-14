
const ProductCatalog = ({ detail }) => {

    return (
        <div className="productCatalog">
            <h3> {detail.name} </h3>
            <div className="containerPicture">
                <img src={detail.picture}/>

            </div>
        </div>
    )
}

export default ProductCatalog
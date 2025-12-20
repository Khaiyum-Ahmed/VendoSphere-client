import Reviews from "../Reviews/Reviews";

const ProductTabs = ({ product }) => {
    // console.log(product)
    return (
        <div>
            {/* name of each tab group should be unique */}
            < div className="tabs tabs-lift" >
                <input type="radio" name="my_tabs_3" className="tab" aria-label="Description" />
                <div className="tab-content bg-base-100 border-base-300 p-6">{product.description}</div>

                <input type="radio" name="my_tabs_3" className="tab" aria-label="Specification" defaultChecked />
                <div className="tab-content bg-base-100 border-base-300 p-6">
                    <table className="table">
                        <tbody>
                            {product.specifications &&
                                Object.entries(product.specifications).map(([k, v]) => (
                                    <tr key={k}>
                                        <td className="font-semibold">{k} :</td>
                                        <td>{v}</td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>

                <input type="radio" name="my_tabs_3" className="tab" aria-label="Reviews" />
                <div className="tab-content bg-base-100 border-base-300 p-6"><Reviews productId={product._id} /></div>
            </div >
        </div>


    );
};

export default ProductTabs;

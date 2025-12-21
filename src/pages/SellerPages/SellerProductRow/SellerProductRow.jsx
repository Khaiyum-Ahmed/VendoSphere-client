import { FaEdit, FaTrash } from "react-icons/fa";
import UseAxios from "../../../hooks/UseAxios";
import toast from "react-hot-toast";
import { NavLink } from "react-router";

const SellerProductRow = ({ product, refetch, page, setPage, productsLength, }) => {
    const axiosSecure = UseAxios();

    const handleDelete = async () => {
        const confirm = window.confirm("Are you sure you want to delete?");
        if (!confirm) return;

        try {
            await axiosSecure.delete(`/products/${product._id}`);
            toast.success("Product deleted");

            // ✅ EDGE CASE FIX (THIS IS THE RIGHT PLACE)
            if (productsLength === 1 && page > 1) {
                setPage(page - 1);
            }

            refetch();
        } catch (error) {
            toast.error("Failed to delete product");
            console.log(error)
        }
    };

    const toggleStatus = async () => {
        await axiosSecure.patch(`/products/status/${product._id}`, {
            status: product.status === "active" ? "inactive" : "active",
        });
        refetch();
    };

    return (
        <tr>
            <td>
                <img src={product.images?.[0]} className="w-50 h-30 rounded" />
            </td>
            <td>{product.name}</td>
            <td>{product.category}</td>
            <td>${product.price}</td>
            <td>{product.discount} %</td>
            <td>{product.stock}</td>
            <td>
                <button
                    onClick={toggleStatus}
                    className={`badge ${product.status === "active" ? "badge-success" : "badge-error"}`}
                >
                    {product.status}
                </button>
            </td>
            <td className="flex gap-2.5 flex-col-reverse">
                <NavLink
                    to={`/dashboard/seller/edit-product/${product._id}`}
                    className="btn btn-md btn-warning"
                >
                    <FaEdit></FaEdit>
                </NavLink>
                <button onClick={handleDelete} className="btn btn-md btn-error">
                    <FaTrash />
                </button>
            </td>
        </tr>
    );
};

export default SellerProductRow;

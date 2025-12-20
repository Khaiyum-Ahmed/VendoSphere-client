import { Link } from "react-router";

const SellerInfo = ({ seller }) => {
    // console.log(seller)
  if (!seller) return null;

  return (
    <div className="border rounded-lg p-6">
      <h3 className="text-xl font-bold">{seller.name}</h3>
      <p>⭐ {seller.rating}</p>
      <p>Selling since {seller.joinDate}</p>

      <Link to={`/seller/${seller._id}`} className="btn btn-outline mt-4">
        Visit Store
      </Link>
    </div>
  );
};

export default SellerInfo;

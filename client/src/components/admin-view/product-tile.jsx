import { useEffect } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import './css/Product.css'
import { useDispatch } from "react-redux";
import { toggleProductListing, fetchAllProducts } from "@/store/admin/products-slice";

function AdminProductTile({
  product,
  setFormData,
  setOpenCreateProductsDialog,
  setCurrentEditedId,
  handleDelete
}) {

   const dispatch = useDispatch();
 const handleToggle = () => {
   dispatch(toggleProductListing({ id: product._id, isListed: !product.isListed }))
     .then(() => dispatch(fetchAllProducts()));
 };

	useEffect(() => {
		console.log(product, "productTile")
	}, [])
  return (
    <div className="product">
  <span className="product__price text-center">Rs. {product?.price}</span>
  <img className="product__image" src={product?.frontSide} alt="Image not available" />
  <h1 className="product__title whitespace-nowrap overflow-hidden truncate max-w-xs font-serif">{product?.title}</h1>
  <hr />
  <div className="flex gap-2 h-min">
    <p className="font-bold text-gray-600">Certificate: {product?.certificate}</p>
    <p>•</p>
  <p className="font-bold text-gray-600">Sku: {product?.sku}</p>
  </div>
  <p className="font-bold oswald text-2xl text-black">Origin: {product?.origin}</p>
  <div className="flex gap-2 h-min">
    <p className="dancing text-2xl">Shape: {product?.shape}</p>
    <p>•</p>
  <p className="dancing text-2xl">Weight: {product?.weight}</p>
  </div>

  <Button onClick={handleToggle}>
        {product.isListed ? "Pause" : "Resume"}
     </Button>
  
  <button className="button-53 mb-3 mt-3" onClick={() => {
              setOpenCreateProductsDialog(true);
              setCurrentEditedId(product?._id);
              setFormData(product);
            }}>Edit</button>
  <a class="product__btn btn cursor-pointer" onClick={() => handleDelete(product?._id)}>Delete</a>
</div>
  );
}

export default AdminProductTile;

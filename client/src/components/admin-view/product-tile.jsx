import { useEffect } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import './css/Product.css'

function AdminProductTile({
  product,
  setFormData,
  setOpenCreateProductsDialog,
  setCurrentEditedId,
  handleDelete
}) {
	useEffect(() => {
		console.log(product, "productTile")
	}, [])
  return (
    // <Card className="w-full max-w-sm mx-auto">
    //   <div>
    //     <div className="relative">
    //       <img
    //         src={product?.image}
    //         alt={product?.title}
    //         className="w-full h-[300px] object-cover rounded-t-lg"
    //       />
    //     </div>
    //     <CardContent>
    //       <h2 className="text-xl font-bold mb-2 mt-2">{product?.title}</h2>
    //       <div className="flex justify-between items-center mb-2">
    //         <span
    //           className={`${
    //             product?.sku > 0 ? "line-through" : ""
    //           } text-lg font-semibold text-primary`}
    //         >
    //           ${product?.sku}
    //         </span>
    //         {product?.sku > 0 ? (
    //           <span className="text-lg font-bold">${product?.sku}</span>
    //         ) : null}
    //       </div>
    //     </CardContent>
    //     <CardFooter className="flex justify-between items-center">
    //       <Button
    //         onClick={() => {
    //           setOpenCreateProductsDialog(true);
    //           setCurrentEditedId(product?._id);
    //           setFormData(product);
    //         }}
    //       >
    //         Edit
    //       </Button>
          // <Button onClick={() => handleDelete(product?._id)}>Delete</Button>
    //     </CardFooter>
    //   </div>
    // </Card>
    <div className="product">
  <span className="product__price text-center">Rs. {product?.price}</span>
  <img className="product__image" src={product?.image} alt="Image not available" />
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
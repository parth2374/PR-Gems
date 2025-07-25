import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { originOptionsMap, certificateOptionsMap, shapeOptionsMap } from "@/config";
import { Badge } from "../ui/badge";
import './css/product.css'
import { Check, Info, ShoppingCart, X } from "lucide-react";
import { useState } from "react";

function ShoppingProductTile({
  product,
  handleGetProductDetails,
  // handleAddtoCart,
}) {

  const [isClicked, setIsClicked] = useState(false);

  const handleBuy = () => {
    setIsClicked(true);
  };

  const handleRemove = () => {
    setIsClicked(false);
  };

  return (
    // <Card onClick={() => handleGetProductDetails(product?._id)} className="w-full max-w-sm mx-auto">
    //   <div>
    //     <div className="relative">
    //       <img
    //         src={product?.image}
    //         alt={product?.title}
    //         className="w-full h-[300px] object-cover rounded-t-lg"
    //       />
    //       {/* {product?.totalStock === 0 ? (
    //         <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
    //           Out Of Stock
    //         </Badge>
    //       ) : product?.totalStock < 10 ? (
    //         <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
    //           {`Only ${product?.totalStock} items left`}
    //         </Badge>
    //       ) : product?.salePrice > 0 ? ( */}
    //         <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
    //           Sale
    //         </Badge>
    //       {/* ) : null} */}
    //     </div>
    //     <CardContent className="p-4">
    //       <h2 className="text-xl font-bold mb-2">{product?.title}</h2>
    //       <div className="flex justify-between items-center mb-2">
    //         <span className="text-[16px] text-muted-foreground">
    //           {originOptionsMap[product?.origin]}
    //         </span>
    //         <span className="text-[16px] text-muted-foreground">
    //           {certificateOptionsMap[product?.certificate]}
    //         </span>
    //       </div>
    //       <div className="flex justify-between items-center mb-2">
    //         <span
    //           className={`${
    //             product?.price > 0 ? "line-through" : ""
    //           } text-lg font-semibold text-primary`}
    //         >
    //           ${product?.price}
    //         </span>
    //         {product?.price > 0 ? (
    //           <span className="text-lg font-semibold text-primary">
    //             {product?.shape}
    //             {/* sku {product?.sku} &nbsp;
    //             weight{product?.weight} */}
    //           </span>
    //         ) : null}
    //       </div>
    //     </CardContent>
    //   </div>
    //   <CardFooter>
    //     {/* {product?.totalStock === 0 ? (
    //       <Button className="w-full opacity-60 cursor-not-allowed">
    //         Out Of Stock
    //       </Button>
    //     ) : ( */}
    //       <Button
    //         // onClick={() => handleAddtoCart(product?._id, product?.totalStock)}
    //         className="w-full"
    //       >
    //         Add to cart
    //       </Button>
    //     {/* )} */}
    //   </CardFooter>
    // </Card>
    <div className="productWrapper shadow-md">
      <div className="productContainer">
        <div className="top" onClick={() => handleGetProductDetails(product?._id)} style={{ backgroundImage: `url(${product?.frontSide})`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
        <div className={`bottom ${isClicked ? 'clicked' : ''}`}>
          <div className="left">
            <div className="details">
              <h1 className="whitespace-nowrap overflow-hidden text-ellipsis archivo font-bold text-xl w-[12rem]">{product?.title}</h1>
              <p>Weight: {product?.weight}</p>
              <p className="whitespace-nowrap overflow-hidden text-ellipsis">Origin: {originOptionsMap[product?.origin]}</p>
              <div className="flex justify-center items-center">
                <button className="button-30 mt-3 whitespace-nowrap overflow-hidden" role="button">Contact<div className="block md:hidden lg:hidden xl:block ml-2"> Us For Price</div></button>
              </div>
            </div>
            {/* <div className="buy flex justify-center items-center" onClick={handleBuy}><ShoppingCart /></div> */}
          </div>
          {/* <div className="right">
            <div className="done flex justify-center items-center"><Check /></div>
            <div className="details">
              <h1>Chair</h1>
              <p>Added to your cart</p>
            </div>
            <div className="remove flex justify-center items-center" onClick={handleRemove}><X /></div>
          </div> */}
        </div>
      </div>
      <div className="inside">
        <div className="icon"><Info /></div>
        <div className="contents">
          <table className="ms-4">
            <tr>
              <th>Title</th>
            </tr>
            <tr>
              <td>{product?.title}</td>
            </tr>
            <tr>
              <th>Origin</th>
            </tr>
            <tr>
              <td>{originOptionsMap[product?.origin]}</td>
            </tr>
            <tr>
              <th>Certificate</th>
            </tr>
            <tr>
              <td>{certificateOptionsMap[product?.certificate]}</td>
            </tr>
            <tr>
              <th>Weight</th>
            </tr>
            <tr>
              <td>{product?.weight}</td>
            </tr>
            <tr>
              <th>SKU</th>
            </tr>
            <tr>
              <td>{product.sku}</td>
            </tr>
            <tr>
              <th>Shape</th>
            </tr>
            <tr>
              <td>{shapeOptionsMap[product?.shape]}</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ShoppingProductTile;

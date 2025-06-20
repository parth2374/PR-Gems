import ProductBackSideImageUpload from "@/components/admin-view/back-image-upload";
import ProductFrontSideImageUpload from "@/components/admin-view/front-image-upload";
import ProductImageUpload from "@/components/admin-view/image-upload";
import AdminProductTile from "@/components/admin-view/product-tile";
import ProductVideoUpload from "@/components/admin-view/video-upload";
import CommonForm from "@/components/common/form";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { addProductFormElements } from "@/config";
import {
  addNewProduct,
  deleteProduct,
  editProduct,
  fetchAllProducts,
} from "@/store/admin/products-slice";
import { Fragment, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

const initialFormData = {
	video: null,
	image: null,
	frontSide: null,
	backSide: null,
	title: "",
	origin: "",
	certificate: "",
	price: "",
	weight: "",
	sku: "",
	shape: ""
};

function AdminProducts() {

	const [openCreateProductsDialog, setOpenCreateProductsDialog] = useState(false);
	const [formData, setFormData] = useState(initialFormData);
	const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
	const [videoFile, setVideoFile] = useState(null);
  const [uploadedVideoUrl, setUploadedVideoUrl] = useState("");
  const [videoLoadingState, setVideoLoadingState] = useState(false);
	const [frontSideFile, setFrontSideFile] = useState(null);
  const [uploadedFrontSideUrl, setUploadedFrontSideUrl] = useState("");
  const [frontSideLoadingState, setFrontSideLoadingState] = useState(false);
	const [backSideFile, setBackSideFile] = useState(null);
  const [uploadedBackSideUrl, setUploadedBackSideUrl] = useState("");
  const [backSideLoadingState, setBackSideLoadingState] = useState(false);
	const [currentEditedId, setCurrentEditedId] = useState(null);

	const [searchTerm, setSearchTerm] = useState("");

	const { productList } = useSelector((state) => state.adminProducts);
	const dispatch = useDispatch();

	useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

	const filteredProducts = useMemo(() => {
  const lower = searchTerm.toLowerCase().trim();
  if (!lower) return productList;

  return productList.filter((p) => {
    // Coerce each field to a string, defaulting to empty string
    const title  = String(p.title  || "").toLowerCase();
    const origin = String(p.origin || "").toLowerCase();
    const sku    = String(p.sku    || "").toLowerCase();
    const certificate    = String(p.certificate    || "").toLowerCase();
    const price    = String(p.price    || "").toLowerCase();
    const shape    = String(p.shape    || "").toLowerCase();
    const weight   = String(p.weight    || "").toLowerCase();

    return (
      title.includes(lower) ||
      origin.includes(lower) ||
      sku.includes(lower) ||
			certificate.includes(lower) ||
			price.includes(lower) ||
			shape.includes(lower) ||
			weight.includes(lower)
    );
  });
}, [productList, searchTerm]);

	console.log(productList, uploadedImageUrl, 'productList')

	function onSubmit(event) {
		event.preventDefault();

		currentEditedId !== null
			? dispatch(
				editProduct({
					id: currentEditedId,
					formData,
				})
			).then((data) => {
				console.log(data, "edit");

				if (data?.payload?.success) {
					dispatch(fetchAllProducts());
					setFormData(initialFormData);
					setOpenCreateProductsDialog(false);
					setCurrentEditedId(null);
					toast("Changes Saved!")
				}
			})
			: dispatch(
				addNewProduct({
					...formData,
					image: uploadedImageUrl,
					video: uploadedVideoUrl,
					frontSide: uploadedFrontSideUrl,
					backSide: uploadedBackSideUrl
				})
			).then((data) => {
				console.log(data)
				if (data?.payload?.success) {
					dispatch(fetchAllProducts());
					setOpenCreateProductsDialog(false);
					setImageFile(null);
					setVideoFile(null);
					setFrontSideFile(null);
					setBackSideFile(null);
					setFormData(initialFormData);
					toast("Product added successfully");
				}
			});
	}

	function handleDelete(getCurrentProductId) {
    dispatch(deleteProduct(getCurrentProductId)).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllProducts());
      }
    });
  }

	function isFormValid() {
    return Object.keys(formData)
      // .filter((currentKey) => currentKey !== "averageReview")
      .map((key) => formData[key] !== "")
      .every((item) => item);
  }

	console.log(formData, "formData")

	return (
		<Fragment>

			
			<div className="mb-15 w-full flex flex-col md:flex-row lg:flex-row gap-5 justify-between">
				{/* <input
          type="text"
          placeholder="Search products…"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border bg-white rounded px-3 py-1 w-64"
        /> */}
				
<form class="flex items-center w-full max-w-xl">   
    <label for="simple-search" class="sr-only">Search</label>
    <div class="relative w-full">
        <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg class="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5v10M3 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm12 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0V6a3 3 0 0 0-3-3H9m1.5-2-2 2 2 2"/>
            </svg>
        </div>
        <input type="text" onChange={(e) => setSearchTerm(e.target.value)} id="simple-search" class="bg-white border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-3 shadow-md dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search products..." required />
    </div>
    <button type="submit" class="p-[0.8rem] shadow-md ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
        </svg>
        <span class="sr-only">Search</span>
    </button>
</form>


				<button className="button-73" onClick={() => setOpenCreateProductsDialog(true)}>
					Add New Product
				</button>

				
			</div>
			{/* <div className="grid gap-2 gap-y-20 mb-5 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 ms-4 items-center justify-center">
				{productList && productList.length > 0
          ? productList.map((productItem) => (
              <AdminProductTile
                setFormData={setFormData}
                setOpenCreateProductsDialog={setOpenCreateProductsDialog}
                setCurrentEditedId={setCurrentEditedId}
                product={productItem}
                handleDelete={handleDelete}
              />
            ))
          : null}
			</div> */}
			{/* grid: map over filteredProducts, which is productList when searchTerm is empty */}
      <div className="grid gap-2 gap-y-20 mb-5 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 ms-4">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((productItem) => (
            <AdminProductTile
              key={productItem.id}
              setFormData={setFormData}
              setOpenCreateProductsDialog={setOpenCreateProductsDialog}
              setCurrentEditedId={setCurrentEditedId}
              product={productItem}
              handleDelete={handleDelete}
            />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No products found.
          </p>
        )}
      </div>
			<Sheet
				open={openCreateProductsDialog}
				onOpenChange={() => {
					setOpenCreateProductsDialog(false);
					setCurrentEditedId(null);
					setFormData(initialFormData);
				}}
			>
				<SheetContent side="right" className="overflow-auto">
					<SheetHeader>
						<SheetTitle>
							<h1 className="text-[1.5rem] font-bold basic-heading">{currentEditedId !== null ? "Edit Product" : "Add New Product"}</h1>
						</SheetTitle>
					</SheetHeader>
					<ProductImageUpload
            imageFile={imageFile}
            setImageFile={setImageFile}
            uploadedImageUrl={uploadedImageUrl}
            setUploadedImageUrl={setUploadedImageUrl}
            setImageLoadingState={setImageLoadingState}
            imageLoadingState={imageLoadingState}
            isEditMode={currentEditedId !== null}
          />
					<ProductVideoUpload
            videoFile={videoFile}
            setVideoFile={setVideoFile}
            uploadedVideoUrl={uploadedVideoUrl}
            setUploadedVideoUrl={setUploadedVideoUrl}
            setVideoLoadingState={setVideoLoadingState}
            videoLoadingState={videoLoadingState}
            isEditMode={currentEditedId !== null}
          />
					<ProductFrontSideImageUpload
            frontSideFile={frontSideFile}
            setFrontSideFile={setFrontSideFile}
            uploadedFrontSideUrl={uploadedFrontSideUrl}
            setUploadedFrontSideUrl={setUploadedFrontSideUrl}
            setFrontSideLoadingState={setFrontSideLoadingState}
            frontSideLoadingState={frontSideLoadingState}
            isEditMode={currentEditedId !== null}
          />
					<ProductBackSideImageUpload
            backSideFile={backSideFile}
            setBackSideFile={setBackSideFile}
            uploadedBackSideUrl={uploadedBackSideUrl}
            setUploadedBackSideUrl={setUploadedBackSideUrl}
            setBackSideLoadingState={setBackSideLoadingState}
            backSideLoadingState={backSideLoadingState}
            isEditMode={currentEditedId !== null}
          />
					<div className="p-6">
						<CommonForm
							onSubmit={onSubmit}
							formData={formData}
							setFormData={setFormData}
							buttonText={currentEditedId !== null ? "Save Changes" : "Add"}
							formControls={addProductFormElements}
							isBtnDisabled={!isFormValid()}
						/>
					</div>
				</SheetContent>
			</Sheet>
		</Fragment>
	);
}

export default AdminProducts;

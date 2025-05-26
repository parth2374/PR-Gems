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
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

const initialFormData = {
	video: null,
	image: null,
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
	const [currentEditedId, setCurrentEditedId] = useState(null);

	const { productList } = useSelector((state) => state.adminProducts);
	const dispatch = useDispatch();

	useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

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
				})
			).then((data) => {
				console.log(data)
				if (data?.payload?.success) {
					dispatch(fetchAllProducts());
					setOpenCreateProductsDialog(false);
					setImageFile(null);
					setVideoFile(null);
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
			<div className="mb-5 w-full flex justify-end">
				<button className="button-73" onClick={() => setOpenCreateProductsDialog(true)}>
					Add New Product
				</button>

			</div>
			<div className="grid gap-2 gap-y-20 mb-5 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 ms-4 items-center justify-center">
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
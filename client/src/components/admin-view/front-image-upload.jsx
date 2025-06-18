import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useEffect, useRef } from "react";
import { Button } from "../ui/button";
import axios from "axios";
import { Skeleton } from "../ui/skeleton";
import { useLocation } from "react-router-dom";

function ProductFrontSideImageUpload({
	frontSideFile,
	setFrontSideFile,
	frontSideLoadingState,
	uploadedFrontSideUrl,
	setUploadedFrontSideUrl,
	setFrontSideLoadingState,
	isEditMode,
	isCustomStyling = false,
}) {

	const location = useLocation();
	const isDashboard = location.pathname === "/admin/dashboard";

	const inputRef = useRef(null);

	// console.log(isEditMode, "isEditMode");

	function handleFrontSideFileChange(event) {
		console.log(event.target.files, "event.target.files");
		const selectedFile = event.target.files?.[0];
		console.log(selectedFile);

		if (selectedFile) setFrontSideFile(selectedFile);
	}

	function handleDragOver(event) {
		event.preventDefault();
	}

	function handleDrop(event) {
		event.preventDefault();
		const droppedFile = event.dataTransfer.files?.[0];
		if (droppedFile) setFrontSideFile(droppedFile);
	}

	function handleRemoveFrontSide() {
		setFrontSideFile(null);
		if (inputRef.current) {
			inputRef.current.value = "";
		}
	}

	async function uploadFrontSideToCloudinary() {
		setFrontSideLoadingState(true);
		const data = new FormData();
		data.append("my_front_image_file", frontSideFile);
		const response = await axios.post(
			`${import.meta.env.VITE_API_URL}/api/admin/products/upload-front-image`,
			data
		);
		console.log(response, "response");

		if (response?.data?.success) {
			setUploadedFrontSideUrl(response.data.result.url);
			setFrontSideLoadingState(false);
		}
	}

	useEffect(() => {
		if (frontSideFile !== null) uploadFrontSideToCloudinary();
	}, [frontSideFile]);

	return (
		<div
			className={`w-full pe-6 ps-6 mt-4 ${isCustomStyling ? "" : "max-w-md mx-auto"}`}
		>
			<Label className={`text-lg font-semibold mb-2 block ${isDashboard ? "cursive text-2xl" : ""}`}>Upload Front Side Image</Label>
			<div
				onDragOver={handleDragOver}
				onDrop={handleDrop}
				className={`${
					isEditMode ? "opacity-60" : ""
				} border-2 border-dashed rounded-lg p-4`}
			>
				<Input
					id="front-image-upload"
					type="file"
					className="hidden"
					ref={inputRef}
					onChange={handleFrontSideFileChange}
					disabled={isEditMode}
				/>
				{!frontSideFile ? (
					<Label
						htmlFor="front-image-upload"
						className={`${
							isEditMode ? "cursor-not-allowed" : ""
						} flex flex-col items-center justify-center h-32 cursor-pointer`}
					>
						<UploadCloudIcon className="w-10 h-10 text-muted-foreground mb-2" />
						<span>Drag & drop or click to upload image</span>
					</Label>
				) : frontSideLoadingState ? (
					<Skeleton className="h-10 bg-gray-100" />
				) : (
					<div className="flex items-center justify-between">
						<div className="flex items-center">
							<FileIcon className="w-8 text-primary mr-2 h-8" />
						</div>
						<p className="text-sm font-medium">{frontSideFile.name}</p>
						<Button
							variant="ghost"
							size="icon"
							className="text-muted-foreground hover:text-foreground"
							onClick={handleRemoveFrontSide}
						>
							<XIcon className="w-4 h-4 text-white" />
							<span className="sr-only">Remove File</span>
						</Button>
					</div>
				)}
			</div>
		</div>
	);
}

export default ProductFrontSideImageUpload;
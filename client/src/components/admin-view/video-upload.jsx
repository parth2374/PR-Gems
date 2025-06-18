import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useEffect, useRef } from "react";
import { Button } from "../ui/button";
import axios from "axios";
import { Skeleton } from "../ui/skeleton";

function ProductVideoUpload({
	videoFile,
	setVideoFile,
	videoLoadingState,
	uploadedVideoUrl,
	setUploadedVideoUrl,
	setVideoLoadingState,
	isEditMode,
	// isCustomStyling = false,
}) {

	const inputRef = useRef(null);

	// console.log(isEditMode, "isEditMode");

	function handleVideoFileChange(event) {
		console.log(event.target.files, "event.target.files");
		const selectedFile = event.target.files?.[0];
		console.log(selectedFile);

		if (selectedFile) setVideoFile(selectedFile);
	}

	function handleDragOver(event) {
		event.preventDefault();
	}

	function handleDrop(event) {
		event.preventDefault();
		const droppedFile = event.dataTransfer.files?.[0];
		if (droppedFile) setVideoFile(droppedFile);
	}

	function handleRemoveVideo() {
		setVideoFile(null);
		if (inputRef.current) {
			inputRef.current.value = "";
		}
	}

	async function uploadVideoToCloudinary() {
		setVideoLoadingState(true);
		const data = new FormData();
		data.append("my_video_file", videoFile);
		const response = await axios.post(
			`${import.meta.env.VITE_API_URL}/api/admin/products/upload-video`,
			data
		);
		console.log(response, "response");

		if (response?.data?.success) {
			setUploadedVideoUrl(response.data.result.url);
			setVideoLoadingState(false);
		}
	}

	useEffect(() => {
		if (videoFile !== null) uploadVideoToCloudinary();
	}, [videoFile]);

	return (
		<div
			// className={`w-full  mt-4 ${isCustomStyling ? "" : "max-w-md mx-auto"}`}
			className={`w-full mt-4 max-w-md mx-auto pt-6 ps-6 pe-6`}
		>
			<Label className="text-lg font-semibold mb-2 block">Upload Video</Label>
			<div
				onDragOver={handleDragOver}
				onDrop={handleDrop}
				className={`${
					isEditMode ? "opacity-60" : ""
				} border-2 border-dashed rounded-lg p-4`}
			>
				<Input
					id="video-upload"
					type="file"
					className="hidden"
					ref={inputRef}
					onChange={handleVideoFileChange}
					disabled={isEditMode}
				/>
				{!videoFile ? (
					<Label
						htmlFor="video-upload"
						className={`${
							isEditMode ? "cursor-not-allowed" : ""
						} flex flex-col items-center justify-center h-32 cursor-pointer`}
					>
						<UploadCloudIcon className="w-10 h-10 text-muted-foreground mb-2" />
						<span>Drag & drop or click to upload video</span>
					</Label>
				) : videoLoadingState ? (
					<Skeleton className="h-10 bg-gray-100" />
				) : (
					<div className="flex items-center justify-between">
						<div className="flex items-center">
							<FileIcon className="w-8 text-primary mr-2 h-8" />
						</div>
						<p className="text-sm font-medium">{videoFile.name}</p>
						<Button
							variant="ghost"
							size="icon"
							className="text-muted-foreground hover:text-foreground"
							onClick={handleRemoveVideo}
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

export default ProductVideoUpload;
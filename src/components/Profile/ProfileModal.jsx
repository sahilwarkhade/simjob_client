import { useState } from "react";
import { Upload, User, X } from "lucide-react";

const ProfileModal = ({ currentPhoto, setCurrentPhoto, setIsModalOpen }) => {
  const [previewPhoto, setPreviewPhoto] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewPhoto(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);

    const file = event.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewPhoto(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    setIsDragging(false);
  };

  const handleSave = () => {
    if (previewPhoto) {
      setCurrentPhoto(previewPhoto);
      setPreviewPhoto(null);
      setIsModalOpen(false);
    }
  };

  const handleCancel = () => {
    setPreviewPhoto(null);
    setIsModalOpen(false);
  };

  const handleRemovePhoto = () => {
    setCurrentPhoto(null);
    setPreviewPhoto(null);
  };
  return (
    <div className="fixed inset-0 bg-gray-700/50 bg-opacity-50 flex items-center justify-center !p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md !mx-4">
        {/* Modal Header */}
        <div className="flex items-center justify-between !p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">
            Change Profile Photo
          </h2>
          <button
            onClick={handleCancel}
            className="!p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="!p-6">
          {/* Current/Preview Photo */}
          <div className="text-center !mb-6">
            <div className="w-24 h-24 !mx-auto rounded-full overflow-hidden bg-gray-100 border-2 border-gray-200">
              {previewPhoto ? (
                <img
                  src={previewPhoto}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              ) : currentPhoto ? (
                <img
                  src={currentPhoto}
                  alt="Current"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <User className="w-8 h-8 text-gray-400" />
                </div>
              )}
            </div>
          </div>

          {/* File Upload Area */}
          <div
            className={`border-2 border-dashed rounded-lg !p-8 text-center transition-colors ${
              isDragging
                ? "border-blue-400 bg-blue-50"
                : "border-gray-300 hover:border-gray-400"
            }`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          >
            <Upload className="w-12 h-12 text-gray-400 !mx-auto !mb-4" />
            <p className="text-gray-600 !mb-2">
              Drag & drop your photo here, or{" "}
              <label className="text-blue-500 hover:text-blue-600 cursor-pointer underline">
                browse
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </label>
            </p>
            <p className="text-sm text-gray-400">PNG, JPG up to 5MB</p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 !mt-6">
            {currentPhoto && (
              <button
                onClick={handleRemovePhoto}
                className="flex-1 !px-4 !py-2 text-red-600 border border-red-300 rounded-lg hover:bg-red-50 transition-colors font-medium cursor-pointer"
              >
                Remove Photo
              </button>
            )}
            <button
              onClick={handleCancel}
              className="flex-1 !px-4 !py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={!previewPhoto}
              className={`flex-1 !px-4 !py-2 rounded-lg font-medium transition-colors ${
                previewPhoto
                  ? "bg-blue-500 text-white hover:bg-blue-600 cursor-pointer"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              Save Photo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;

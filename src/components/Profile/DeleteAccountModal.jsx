import React, { useState } from "react";
import { AlertTriangle, Trash2, X } from "lucide-react";

const DeleteAccountModal = ({setIsDeleteModalOpen}) => {
  const [confirmText, setConfirmText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteAccount = async () => {
    if (confirmText !== "DELETE") {
      return;
    }

    setIsDeleting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    alert("Account deleted successfully");
    setIsDeleting(false);
    setIsDeleteModalOpen(false);
    setConfirmText("");
  };

  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
    setConfirmText("");
  };

  const isConfirmValid = confirmText === "DELETE";
  return (
    <>
      <div className="fixed inset-0 bg-gray-700/50 flex items-center justify-center !p-4 z-50">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-md !mx-4">
          {/* Modal Header */}
          <div className="flex items-center justify-between !p-6 border-b">
            <div className="flex items-center !space-x-3">
              <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-4 h-4 text-red-600" />
              </div>
              <h2 className="text-lg font-semibold text-gray-900">
                Delete Account
              </h2>
            </div>
            <button
              onClick={handleCancelDelete}
              className="!p-1 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
              disabled={isDeleting}
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Modal Content */}
          <div className="!p-6">
            {/* Warning Message */}
            <div className="!mb-6">
              <p className="text-gray-700 !mb-4">
                Are you sure you want to delete your account? This action cannot
                be undone.
              </p>
              <div className="bg-red-50 border border-red-200 rounded-lg !p-3">
                <p className="text-red-800 text-sm">
                  All your data, files, and settings will be permanently
                  deleted.
                </p>
              </div>
            </div>

            {/* Confirmation Input */}
            <div className="!mb-6">
              <label className="block text-sm font-medium text-gray-700 !mb-2">
                Type <span className="font-bold text-red-600">DELETE</span> to
                confirm:
              </label>
              <input
                type="text"
                value={confirmText}
                onChange={(e) => setConfirmText(e.target.value)}
                placeholder="Type DELETE"
                className="w-full !px-3 !py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors text-gray-950"
                autoComplete="off"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleCancelDelete}
                disabled={isDeleting}
                className="flex-1 !px-4 !py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium disabled:opacity-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAccount}
                disabled={!isConfirmValid || isDeleting}
                className={`flex-1 !px-4 !py-2 rounded-lg font-medium transition-colors flex items-center justify-center !space-x-2 ${
                  isConfirmValid && !isDeleting
                    ? "bg-red-600 text-white hover:bg-red-700 cursor-pointer"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
              >
                {isDeleting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Deleting...</span>
                  </>
                ) : (
                  <>
                    <Trash2 className="w-4 h-4" />
                    <span>Delete Account</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteAccountModal;

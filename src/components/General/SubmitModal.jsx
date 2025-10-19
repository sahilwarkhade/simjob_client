import { AlertTriangle } from "lucide-react";

const SubmitModal = ({
  setShowSubmitModal,
  title,
  description,
  subDescription,
  handleSubmit,
}) => {
  return (
    <div>
      <div className="fixed inset-0 bg-gray-300/50 flex items-center justify-center !p-4 z-50">
        <div className="bg-gray-800 border border-gray-700 rounded-lg max-w-md w-full !p-6">
          <div className="flex items-center !mb-4">
            <AlertTriangle className="w-6 h-6 text-orange-400 !mr-3" />
            <h3 className="text-lg font-semibold text-white">{title}</h3>
          </div>
          <p className="text-gray-300 !mb-4">{description}</p>
          <p className="text-sm text-gray-400 !mb-6">{subDescription}</p>
          <div className="flex !space-x-3 justify-end">
            <button
              onClick={() => setShowSubmitModal(false)}
              className="!px-4 !py-2 bg-gray-700 text-gray-300 rounded hover:bg-gray-600 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={(e) => handleSubmit(e)}
              className="!px-4 !py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors cursor-pointer"
            >
              Submit Test
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmitModal;

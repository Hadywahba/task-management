import { useState } from 'react';
import { ClipLoader } from 'react-spinners';

interface DeleteModalProps {
  setdeletemodal: React.Dispatch<React.SetStateAction<boolean>>;
  DeleteTask: (id: number) => void;
  taskID: number;
}

export default function DeleteModal({
  setdeletemodal,
  DeleteTask,
  taskID,
}: DeleteModalProps) {
  const [delloading, setdelloading] = useState<boolean>(false);
  const [loading, setloading] = useState<boolean>(false);

  //! handle close modal
  const closeModal = () => {
    setloading(true);
    setTimeout(() => {
      setdeletemodal(false);

      setloading(false);
    }, 300);
  };

  const deleteTask = () => {
    setdelloading(true);
    setTimeout(() => {
      DeleteTask(taskID);
    }, 300);
    setloading(false);
  };

  return (
    <>
      <div>
        {/* Modal toggle */}

        {/* Main modal */}
        <div className="fixed top-0 right-0 left-0 z-50 flex h-[calc(100%-1rem)] max-h-full w-full items-center justify-center overflow-x-hidden overflow-y-auto md:inset-0">
          <div className="relative max-h-full w-full max-w-2xl p-4">
            {/* Modal content */}
            <div className="relative rounded-lg bg-white shadow-sm">
              {/* Modal header */}
              <div className="flex items-center justify-between rounded-t border-b border-gray-200 p-4 md:p-5">
                <h3 className="text-xl font-semibold text-gray-900">
                  Delete Task
                </h3>
              </div>
              <div className="p-4 md:p-20">
                <p className="text-center text-lg leading-relaxed text-gray-500">
                  Are you sure you want to delete this task ?
                </p>
              </div>
              <div className="flex items-center justify-center gap-2">
                <button
                  type="submit"
                  onClick={deleteTask}
                  className="bg-secondary hover:bg-primary mx-auto mb-4 flex w-max cursor-pointer items-center justify-center rounded-lg px-12 py-3 font-bold text-white transition-colors disabled:opacity-50"
                >
                  {delloading ? (
                    <ClipLoader color="#ebe7e7" size={19} />
                  ) : (
                    ' Delete'
                  )}
                </button>
                <button
                  onClick={closeModal}
                  className="bg-secondary hover:bg-primary mx-auto mb-4 flex w-max cursor-pointer items-center justify-center rounded-lg px-12 py-3 font-bold text-white transition-colors disabled:opacity-50"
                >
                  {' '}
                  {loading ? (
                    <ClipLoader color="#ebe7e7" size={19} />
                  ) : (
                    ' Cancel'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

'use client';
import { useForm, type SubmitHandler } from 'react-hook-form';
import {
  taskSchema,
  type taskFormFields,
} from '../../../services/validation/addTask';
import TextInput from '../../ui/Form/TextInput';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { ClipLoader } from "react-spinners";
interface ModalProps {
  exitModal: () => void;
  setmodal: React.Dispatch<React.SetStateAction<boolean>>;
  task?: Pick<taskFormFields, 'title' | 'description' | 'category_id'>;
  AddTask?: (values: taskFormFields) => void;
  UpdateTask?: (data: { id: number; values: Partial<taskFormFields> }) => void;
  taskId?: number;
}

export default function Modal({
  exitModal,
  setmodal,
  task,
  UpdateTask,
  AddTask,
  taskId,
}: ModalProps) {
  const [loading, setloading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(taskSchema),
    mode: 'all',
    defaultValues: {
      title: task?.title || '',
      description: task?.description || '',
      category_id: task?.category_id || '',
    },
  });

  const submitTask: SubmitHandler<taskFormFields> = (data) => {
    setloading(true);
    setTimeout(() => {
      if (task && UpdateTask && taskId) {
        UpdateTask({ id: taskId, values: data });
        setloading(true);
      } else if (AddTask) {
        AddTask(data);
        setloading(true);
      }
      setmodal(false);
      setloading(false);
      reset();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="mx-4 rounded-xl bg-white py-8 text-center md:w-[40%]">
        <div className="flex-col items-center justify-center space-y-2 p-4">
          <form
            className="mx-auto w-full space-y-4"
            onSubmit={handleSubmit(submitTask)}
          >
            <div className="mb-5">
              <TextInput
                errors={errors}
                name="title"
                placeholder="please enter task title"
                register={register}
                type="text"
              />
            </div>
            <div className="mb-5">
              <TextInput
                errors={errors}
                name="category_id"
                placeholder="please enter category_id"
                register={register}
                type="p"
              />
            </div>
            <div className="mb-5">
              <TextInput
                errors={errors}
                name="description"
                placeholder="please enter task description"
                register={register}
                type="text"
              />
            </div>

            <div className="flex items-center justify-center gap-2">
              <button
                type="submit"
                className="bg-secondary hover:bg-primary mx-auto mb-4 flex w-max cursor-pointer items-center justify-center rounded-lg px-12 py-3 font-bold text-white transition-colors disabled:opacity-50"
              >
                {loading ? (
                  <ClipLoader color="#ebe7e7" size={19} />
                ) : task ? (
                  'Edit'
                ) : (
                  'Add'
                )}
              </button>
              <button
                onClick={exitModal}
                className="bg-secondary hover:bg-primary mx-auto mb-4 flex w-max cursor-pointer items-center justify-center rounded-lg px-12 py-3 font-bold text-white transition-colors disabled:opacity-50"
              >
                {' '}
                Exit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

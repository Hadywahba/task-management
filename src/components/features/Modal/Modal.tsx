'use client';
import { useMutation } from '@tanstack/react-query';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { addTask } from '../../../services/api/task';
import {
  taskSchema,
  type taskFormFields,
} from '../../../services/validation/addTask';
import TextInput from '../../ui/Form/TextInput';
import { zodResolver } from '@hookform/resolvers/zod';
interface ModalProps {
  exitModal: () => void;
  setmodal: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Modal({ exitModal, setmodal }: ModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: zodResolver(taskSchema), mode: 'all' });

  const submitTask: SubmitHandler<taskFormFields> = (data) => {
    mutate(data);
    console.log(data);
    setmodal(false);
    reset()
  };
  const { mutate } = useMutation({
    mutationFn: addTask,
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="mx-4 rounded-xl bg-white text-center md:w-[40%] py-8">
        <div className="flex-col items-center justify-center space-y-2 p-4">
          <form className="mx-auto w-full space-y-4" onSubmit={handleSubmit(submitTask)}>
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
                Add
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

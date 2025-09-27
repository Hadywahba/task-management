import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { getSingleTask, updateTask } from '../../../services/api/task';
import { useEffect, useState } from 'react';
import TaskImage from '../../../components/features/TaskImage/TaskImage';
import PageLoader from '../../../components/loaders/PageLoader';
import ListError from '../../../components/errors/ListError';
import ListLoader from '../../../components/loaders/ListLoader';
import type { Task } from '../../../types/task';
import { useTaskStore } from '../../../stores/useTask';

export default function TaskDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const offset = useTaskStore((state) => state.offset);
  const selectedCategory = useTaskStore((state) => state.selectedCategory);
  const [Completed, setCompleted] = useState<boolean>(false);
  const { data, isLoading, isError, error, isPending } = useQuery({
    queryKey: ['singleTask',id],
    queryFn: () => getSingleTask(Number(id)),
  });
  const { mutate: updateTasks } = useMutation({
    mutationFn: ({ id, values }: { id: number; values: Partial<Task> }) =>
      updateTask(id, values),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['singleTask', id],
      });
      queryClient.invalidateQueries({
        queryKey: ['getTasks', offset, selectedCategory],
      });
    },
  });

  useEffect(() => {
    console.log(data);
  }, [data]);

  useEffect(() => {
    if (data) {
      setCompleted(data[0]?.completed);
    }
  }, [data]);

  const backToTasks = () => {
    navigate('/');
  };

  const handleToggle = () => {
    const newValue = !Completed;
    setCompleted(newValue);
    updateTasks({ id: Number(id), values: { completed: newValue } });
  };

  if (isLoading) return <PageLoader />;
  return (
    <main className="flex flex-1 flex-col bg-blue-100">
      <ListError isError={isError} error={error}>
        <ListLoader isPending={isPending} items={data || []}>
          <div className="container mx-auto mt-12 px-4 md:mt-28 md:w-[50%] lg:w-full lg:px-16">
            <button
              onClick={backToTasks}
              className="bg-secondary hover:bg-primary block w-auto cursor-pointer rounded-lg px-20 py-2 text-white transition-colors"
            >
              Back
            </button>
          </div>
          <div className="grid grid-cols-1 items-start justify-center gap-6 px-4 py-12 lg:grid-cols-12">
            <section className="col-span-5 container mx-auto">
              <TaskImage
                alt={data[0]?.title}
                src={data[0]?.image_url}
                className={'h-80'}
              />
            </section>
            <section className="col-span-5 container mx-auto space-y-8 md:w-[50%] lg:w-full">
              <div className="space-y-4">
                <h1 className="font-bold sm:text-xl md:text-3xl">
                  {data[0]?.title}
                </h1>
                <h5 className="text-base font-normal sm:text-xl">
                  {data[0]?.description}
                </h5>
              </div>
              <div className="flex justify-between">
                <span className="rounded-sm bg-blue-100 py-1 text-lg font-medium text-blue-800">
                  CategoryID : {data[0]?.id}
                </span>
                <span
                  className={` ${data[0]?.completed ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'} rounded-sm px-2.5 py-1 text-sm font-medium`}
                >
                  {data[0]?.completed ? 'completed' : 'pending'}
                </span>
              </div>
              <div className="flex flex-row items-center justify-between gap-6">
                <span
                  className={`${data[0]?.priority == 'high' ? 'bg-red-600 text-white' : data[0]?.priority == 'medium' ? 'bg-amber-400 text-black' : data[0]?.priority == 'low' ? 'bg-blue-400 text-white' : ''} rounded-sm px-1.5 py-2 text-sm font-medium sm:px-2.5 md:py-3 md:text-xl`}
                >
                  priority : {data[0]?.priority}
                </span>

                <label className="inline-flex cursor-pointer items-center">
                  <span className="mr-2 text-xs font-medium text-gray-900 sm:text-sm">
                    pending
                  </span>
                  <input
                    type="checkbox"
                    className="peer sr-only"
                    onChange={handleToggle}
                    checked={Completed}
                  />
                  <div className="peer relative h-6 w-11 rounded-full bg-gray-800 peer-checked:bg-blue-600 peer-focus:ring-4 peer-focus:ring-blue-300 peer-focus:outline-none after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-white rtl:peer-checked:after:-translate-x-full" />
                  <span className="ms-2 text-xs font-medium text-gray-900 sm:text-sm">
                    completed
                  </span>
                </label>
              </div>
            </section>
          </div>
        </ListLoader>
      </ListError>
    </main>
  );
}

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  addTask,
  deleteTask,
  getTasks,
  updateTask,
} from '../../../services/api/task';
import { useTaskStore } from '../../../stores/useTask';
import { useEffect, useState } from 'react';
import type { Task } from '../../../types/task';
import TaskCard from '../../../components/features/TaskCard/TaskCard';
import { getCategories } from '../../../services/api/categories';
import ListLoader from '../../../components/loaders/ListLoader';
import ListError from '../../../components/errors/ListError';
import CategoryCard from '../../../components/features/CategoryCard/CategoryCard';
import Modal from '../../../components/features/Modal/Modal';

export default function Tasks() {
  const [modal, setmodal] = useState<boolean>(false);
  const offset = useTaskStore((state) => state.offset);
  const setOffset = useTaskStore((state) => state.setoffset);
  const selectedCategory = useTaskStore((state) => state.selectedCategory);
  const [editTask, seteditTask] = useState<Pick<
    Task,
    'id' | 'title' | 'category_id' | 'description'
  > | null>(null);
  const queryClient = useQueryClient();
  const { data: dataCategory } = useQuery({
    queryKey: ['Categories'],
    queryFn: () => getCategories({ params: { limit: 30, offset } }),
  });
  useEffect(() => {
    console.log(dataCategory);
  }, [dataCategory]);

  const { data, isPending, isError, error } = useQuery({
    queryKey: ['getTasks', offset, selectedCategory],
    queryFn: () =>
      getTasks({
        params: {
          limit: 20,
          offset,
          ...(selectedCategory
            ? { category_id: `eq.${selectedCategory}` }
            : {}),
        },
      }),
  });

  const { mutate: AddTask } = useMutation({
    mutationFn: addTask,
  });

  const { mutate: DeleteTask } = useMutation({
    mutationFn: (id: number) => deleteTask(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['getTasks', offset, selectedCategory],
      });
    },
  });

  const { mutate: updateTasks } = useMutation({
    mutationFn: ({ id, values }: { id: number; values: Partial<Task> }) =>
      updateTask(id, values),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['getTasks', offset, selectedCategory],
      });
    },
  });

  useEffect(() => {
    console.log(data);
  }, [data]);

  //todo Next button
  const nextButton = () => {
    setOffset(offset + 20);
  };
  //^ Next button
  const previousButton = () => {
    setOffset(offset - 20);
  };
  //& Exit Modal
  const exitModal = () => {
    setmodal(false);
    seteditTask(null);
  };

  return (
    <main className="flex flex-1 flex-col bg-blue-100">
      <section>
        <CategoryCard dataCategory={dataCategory} />
      </section>
      <section className="my-14 border-t-2 border-b-gray-600">
        <div className="container mx-auto mt-8">
          <button
            onClick={() => setmodal(true)}
            className="bg-secondary hover:bg-primary cursor-pointer rounded-lg px-12 py-2 text-white transition-colors"
          >
            Add Tak
          </button>
        </div>
      </section>

      <section className="container mx-auto grid grid-cols-1 justify-items-center gap-6 px-4 py-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <ListError isError={isError} error={error}>
          <ListLoader isPending={isPending} items={data || []}>
            {data?.map((task: Task) => (
              <div
                className="relative max-w-sm rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800"
                key={task.id}
              >
                <TaskCard
                  image_url={task.image_url}
                  category_id={task.category_id}
                  completed={task.completed}
                  title={task.title}
                  description={task.description}
                  id={task.id}
                  DeleteTask={DeleteTask}
                  seteditTask={seteditTask}
                  setmodal={setmodal}
                  
                />
              </div>
            ))}
          </ListLoader>
        </ListError>
      </section>

      <section className="flex items-center justify-center gap-8 pb-8">
        <button
          onClick={previousButton}
          disabled={offset == 0}
          className={`${offset == 0 ? 'bg-gray' : 'bg-primary hover:bg-secondary cursor-pointer'} rounded-lg px-10 py-2 text-white transition-colors`}
        >
          Previous
        </button>
        <button
          onClick={nextButton}
          className="bg-secondary hover:bg-primary cursor-pointer rounded-lg px-12 py-2 text-white transition-colors"
        >
          Next
        </button>
      </section>

      {modal && (
        <Modal
          exitModal={exitModal}
          setmodal={setmodal}
          task={editTask || undefined}
          taskId={editTask?.id}
          AddTask={AddTask}
          UpdateTask={updateTasks}
        />
      )}
    </main>
  );
}

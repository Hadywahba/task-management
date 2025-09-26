import { useQuery } from '@tanstack/react-query';
import { getTasks } from '../../../services/api/task';
import { useTaskStore } from '../../../stores/useTask';
import { useEffect } from 'react';
import type { Task } from '../../../types/task';
import TaskCard from '../../../components/features/TaskCard/TaskCard';
import PageLoader from '../../../components/loaders/PageLoader';

export default function Tasks() {
  const offset = useTaskStore((state) => state.offset);
  const setOffset = useTaskStore((state) => state.setoffset);
  const { data, isLoading } = useQuery({
    queryKey: ['getTasks', offset],
    queryFn: () => getTasks({ params: { limit: 20, offset } }),
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

  if (isLoading) return <PageLoader />;
  return (
    <main className="flex flex-1 flex-col bg-blue-100">
      <section className="container mx-auto grid grid-cols-1 justify-items-center gap-6 px-4 py-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
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
            />
          </div>
        ))}
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
    </main>
  );
}

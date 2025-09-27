import { useEffect, useState } from 'react';
import { useTaskStore } from '../../../stores/useTask';
import TaskImage from '../TaskImage/TaskImage';
import type { Task } from '../../../types/task';
import DeleteModal from '../DeleteModal/DeleteModal';
import { Link } from 'react-router-dom';

interface Taskprops {
  image_url: string;
  title: string;
  completed: boolean;
  category_id: number;
  description: string;
  id: number;
  priority: string;
  DeleteTask: (id: number) => void;
  seteditTask: React.Dispatch<
    React.SetStateAction<Pick<
      Task,
      'id' | 'title' | 'category_id' | 'description'
    > | null>
  >;
  setmodal: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function TaskCard({
  image_url,
  title,
  completed,
  category_id,
  description,
  id,
  priority,
  seteditTask,
  setmodal,
  DeleteTask,
}: Taskprops) {
  const [deletemodal, setdeletemodal] = useState<boolean>(false);
  const setTaskId = useTaskStore((state) => state.setTaskId);
  useEffect(() => {
    setTaskId(id);
  }, [id]);

  //* handle edit

  const onEditTask = () => {
    seteditTask({
      id,
      category_id,
      description,
      title,
    });
    setmodal(true);
  };

  //todo handle delete modal

  const deleteModal = () => {
    setdeletemodal(true);
  };

  return (
    <>
      <Link to={`/tasks/${id}`}>
        <TaskImage src={image_url} alt={title} />
      </Link>
      <div className="p-4 mb-4">
        <h5 className="mb-3 text-base font-bold tracking-tight text-gray-900 sm:text-lg md:text-xl lg:text-2xl">
          {title.split(' ').splice(0, 2).join(' ')}
        </h5>

        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {description
            ? description.split(' ').splice(0, 4).join(' ')
            : 'No description available'}
        </p>

        <span
          className={`${priority == 'high' ? 'bg-red-600 text-white' : priority == 'medium' ? 'bg-amber-400 text-black' : priority == 'low' ? 'bg-blue-400 text-white' : ''} rounded-sm px-2.5 py-2  text-sm font-medium`}
        >
          priority : {priority}
        </span>
      </div>
      <span
        className={` ${completed ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'} absolute top-2 left-2 me-2 rounded-sm px-2.5 py-1 text-sm font-medium`}
      >
        {completed ? 'completed' : 'pending'}
      </span>

      <span className="absolute top-2 right-2 me-2 rounded-sm bg-blue-100 px-2.5 py-1 text-sm font-medium text-blue-800">
        Category: {category_id}
      </span>
      <div className="flex items-center justify-center gap-2">
        <button
          type="submit"
          onClick={deleteModal}
          className="bg-secondary hover:bg-primary mx-auto mb-4 flex w-max cursor-pointer items-center justify-center rounded-lg px-12 py-3 font-bold text-white transition-colors disabled:opacity-50"
        >
          Delete
        </button>
        <button
          onClick={onEditTask}
          className="bg-secondary hover:bg-primary mx-auto mb-4 flex w-max cursor-pointer items-center justify-center rounded-lg px-12 py-3 font-bold text-white transition-colors disabled:opacity-50"
        >
          {' '}
          update
        </button>
      </div>
      {deletemodal && (
        <DeleteModal
          setdeletemodal={setdeletemodal}
          DeleteTask={DeleteTask}
          taskID={id}
        />
      )}
    </>
  );
}

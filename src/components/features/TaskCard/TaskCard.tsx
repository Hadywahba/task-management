import { useEffect } from "react";
import { useTaskStore } from "../../../stores/useTask";
import TaskImage from "../TaskImage/TaskImage";

interface Taskprops {
  image_url: string;
  title: string;
  completed: boolean;
  category_id: number;
  description: string;
  id:number;
DeleteTask:(id:number)=>void;
}

export default function TaskCard({
  image_url,
  title,
  completed,
  category_id,
  description,
DeleteTask,
  id,
}: Taskprops) {
    const setTaskId = useTaskStore((state) => state.setTaskId);
     useEffect(() => {
    setTaskId(id)
  }, [id]);
  return (
    <>
      <TaskImage src={image_url} alt={title}/>

      <div className="p-4">
        <h5 className="mb-2 text-base font-bold tracking-tight text-gray-900 sm:text-lg md:text-xl lg:text-2xl">
          {title.split(' ').splice(0, 2).join(' ')}
        </h5>

        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {description}
        </p>
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
                 onClick={()=>DeleteTask(id)}
                className="bg-secondary hover:bg-primary mx-auto mb-4 flex w-max cursor-pointer items-center justify-center rounded-lg px-12 py-3 font-bold text-white transition-colors disabled:opacity-50"
              >
               Delete
              </button>
              <button
              
                className="bg-secondary hover:bg-primary mx-auto mb-4 flex w-max cursor-pointer items-center justify-center rounded-lg px-12 py-3 font-bold text-white transition-colors disabled:opacity-50"
              >
                {' '}
                update
              </button>
            </div>
    </>
  );
}

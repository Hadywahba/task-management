import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from '../Layout/Layout';
import Tasks from '../pages/Main/Tasks/Tasks';
import TaskForms from '../pages/Main/TaskForms/TaskForms';
import TaskDetails from '../pages/Main/TaskDetails/TaskDetails';

function App() {
  const router = createBrowserRouter([
    {
      path: '',
      element: <Layout />,
      children: [
        { index: true, element: <Tasks /> },

        { path: 'tasks/new', element: <TaskForms type="add" /> },
        { path: 'tasks//:id/edit', element: <TaskForms type="edit" /> },
        { path: 'tasks/:id', element: <TaskDetails /> },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;

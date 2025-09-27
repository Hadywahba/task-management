import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from '../Layout/Layout';
import Tasks from '../pages/Main/Tasks/Tasks';
import TaskDetails from '../pages/Main/TaskDetails/TaskDetails';

function App() {
  const router = createBrowserRouter([
    {
      path: '',
      element: <Layout />,
      children: [
        { index: true, element: <Tasks /> },

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

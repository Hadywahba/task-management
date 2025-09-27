import axiosInstance from '../../lib/axios';
import type { Task } from '../../types/task';
import type { taskFormFields } from '../validation/addTask';

export const getTasks = async ({
  params,
}: {
  params: { limit: number; offset: number; category_id?: string };
}) => {
  const { data } = await axiosInstance.get('/tasks', { params });
  return data;
};

export const addTask = async (values: taskFormFields) => {
  const { data } = await axiosInstance.post('/tasks', values);
  return data;
};

export const deleteTask = async (id: number) => {
  const { data } = await axiosInstance.delete('/tasks', {
    params: { id: `eq.${id}` },
  });
  return data;
};

export const updateTask = async (id: number , values: Partial<Task>) => {
  const { data } = await axiosInstance.patch('/tasks',values , {
    params: { id: `eq.${id}` },
  });
  return data;
};
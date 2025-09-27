import axiosInstance from '../../lib/axios';
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

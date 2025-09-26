import axiosInstance from '../../lib/axios';

export const getTasks = async ({
  params,
}: {
  params: { limit: number, offset: number };
}) => {
  const { data } = await axiosInstance.get('/tasks', { params });
  return data;
};

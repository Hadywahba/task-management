import axiosInstance from '../../lib/axios';

export const getCategories = async ({
  params,
}: {
  params: { limit: number, offset: number };
}) => {
  const { data } = await axiosInstance.get('/categories', { params });
  return data;
};

import { ReactNode } from 'react';
import Spinner from './Spinner';

interface Props {
  isPending: boolean;
  items: any[] | undefined;
  children: ReactNode;
}

const ListLoader = ({ isPending, items, children }: Props) => {
  if (isPending) {
    return (
      <div className="col-span-full flex h-auto items-center justify-center rounded-xl p-8">
        <Spinner color="text-primary" />
      </div>
    );
  }

  if (items?.length === 0) {
    return (
      <div className="col-span-full flex h-auto items-center justify-center rounded-xl bg-white p-8 w-full text-center">
        <p className="text-xl text-gray-900 w-full font-bold">No Data</p>
      </div>
    );
  }

  return children;
};

export default ListLoader;

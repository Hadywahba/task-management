import  { ReactNode } from 'react';

interface Props {
  isError: boolean;
  error: any;
  children: ReactNode;
}

const ListError = ({ isError, error, children }: Props) => {
  if (isError) {
    // console.log(error);
    return (
      <div className="col-span-full flex h-auto w-full items-center justify-center rounded-xl bg-gray-50/80 p-8">
        <p>
          <strong className="mx-1 font-bold w-full">Error!</strong>
          <span>{error.response.data.message}</span>
        </p>
      </div>
    );
  }

  return children;
};

export default ListError;

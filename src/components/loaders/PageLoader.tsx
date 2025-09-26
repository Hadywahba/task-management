import Spinner from './Spinner';


const PageLoader = () => {
  return (
    <div className="z-50 flex w-full flex-1 items-center justify-center bg-blue-100">
      <Spinner color="text-primary" />
    </div>
  );
};

export default PageLoader;

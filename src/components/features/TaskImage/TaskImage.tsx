import { useState } from 'react';
import { CiImageOff } from 'react-icons/ci';
import Spinner from '../../loaders/Spinner';

interface TaskImageProps {
  src: string;
  alt: string;
  className?:string,
  
}

export default function TaskImage({ src, alt , className }: TaskImageProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  return (
    <div className={`flex h-50 w-full items-center justify-center overflow-hidden rounded-t-lg ${className}` }>
      {loading && !error && (
        <div className="flex h-full w-full items-center justify-center bg-gray-300">
          <Spinner />
        </div>
      )}

      {!error && (
        <img
          src={src}
          alt={alt}
          onLoad={() => setLoading(false)}
          onError={() => {
            setLoading(false);
            setError(true);
          }}
        />
      )}

      {error && (
        <div className="flex flex-col items-center justify-center text-gray-500">
          <CiImageOff />
        </div>
      )}
    </div>
  );
}

import { useTaskStore } from '../../../stores/useTask';
import type { Category } from '../../../types/category';

interface CategoryProps {
  dataCategory: Category[];
}

export default function CategoryCard({ dataCategory }: CategoryProps) {
  const setSelectedCategory = useTaskStore(
    (state) => state.setSelectedCategory,
  );
  const selectedCategory = useTaskStore((state) => state.selectedCategory);
  //! handelCategory
  const handelCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value ? Number(e.target.value) : null);
  };
  return (
    <>
      <section className="container mx-auto mt-12 hidden px-4 md:visible md:flex md:flex-wrap md:gap-4">
        <button
          onClick={() => setSelectedCategory(null)}
          className={`cursor-pointer rounded-lg px-4 py-2 ${
            selectedCategory === null ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
        >
          All
        </button>
        {dataCategory?.map((categ: Category) => (
          <button
            onClick={() => setSelectedCategory(categ.id)}
            key={categ.id}
            style={{ backgroundColor: categ.color }}
            className={`flex cursor-pointer gap-2 rounded-lg px-4 py-2 text-white`}
          >
            {categ.name}
            <img src={categ.icon_url} alt="" />
          </button>
        ))}
      </section>
      <section className="visible container mx-auto mt-12 w-full px-4 md:hidden md:gap-4">
        <select
          value={selectedCategory ? selectedCategory : ''}
          onChange={handelCategory}
          className="w-full space-y-4 bg-gray-600 text-white"
        >
          <option value="" className="bg-blue-500 text-white">
            All
          </option>
          {dataCategory?.map((categ: Category) => (
            <option
              key={categ.id}
              value={categ.id}
              style={{ backgroundColor: categ.color }}
              className="space-y-4"
            >
              {categ.name}
            </option>
          ))}
        </select>
      </section>
    </>
  );
}

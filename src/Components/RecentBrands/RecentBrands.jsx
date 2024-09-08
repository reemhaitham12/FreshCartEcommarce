import { Link } from "react-router-dom";

export default function RecentBrand({ brand }) {
  return (
    <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/6 Brand py-4 px-2 rounded-lg shadow-md">
      <Link  className="rounded-lg overflow-hidden block">
        {brand?.image ? (
          <img src={brand.image} alt={brand.name} width={900} />
        ) : (
          <p>No Image Available</p>
        )}
        <h2 className="text-main text-sm sm:text-base md:text-lg">{brand.name}</h2>
      </Link>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Link } from "react-router-dom";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      });
  }, []); // component yüklendiğinde ürünleri çek ve loading durumunu güncelle

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 text-xl font-semibold">
        <AiOutlineLoading3Quarters className="animate-spin" />
      </div>
    );
  }
  return (
    <div>
      <h2 className="text-3xl font-bold mb-8 text-gray-800">Tüm Ürünler</h2>
      {/* Grid Yapısı: Mobilde 1, Tablette 2, Masaüstünde 4 sütun */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <div
            key={product.id}
            className="group bg-white border border-gray-200 rounded-xl p-4 transition-all hover:shadow-xl flex flex-col h-full"
          >
            <div className="flex-1">
              <div className="relative overflow-hidden rounded-lg aspect-square mb-4">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="text-sm font-medium text-gray-700 line-clamp-2 h-10 mb-2 px-2">
                {product.title}
              </h3>
            </div>

            <div className="mt-auto pt-4 border-t border-gray-100">
              <p className="text-lg font-bold text-gray-900 mb-3">
                ${product.price}
              </p>
              <Link
                to={`/product/${product.id}`}
                className="block w-full bg-black text-white text-center py-2.5 rounded-lg hover:bg-gray-800 transition-colors font-medium text-sm"
              >
                İncele
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;

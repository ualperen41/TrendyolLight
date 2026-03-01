import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { CartContext } from "../context/CartContext";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const ProductDetail = () => {
  const { id } = useParams(); // URL'den ürün ıd si almak için useParams hook kullanılır.bu id ile Apı'dan ürün detayları çekildi
  const [product, setProduct] = useState(null);
  const { addToCart } = useContext(CartContext); // Sepet işlemi  için CartContex'ten addToCart fonksiyonu alınır

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, [id]); // id değiştiğinde ürünü tekrar çekmek için useEffect'e id bağımlılığı eklenir
  const handleAddToBag = () => {
    if (product) {
      addToCart(product);
      toast.success(`${product.title.substring(0, 20)}... sepete eklendi! 🛍️`, {
        position: "top-right",
        autoClose: 2000,
      });
    }
  };

  if (!product)
    return (
      <div className="p-10 text-center flex flex-col items-center justify-center mt-30">
        <AiOutlineLoading3Quarters className="animate-spin " />
      </div>
    );
  return (
    <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-10">
      {/* Görsel Alanı */}
      <div className="bg-white p-8 border rounded-xl flex justify-center">
        <img
          src={product.image}
          alt={product.title}
          className="max-h-96 object-contain"
        />
      </div>
      {/* Bilgi Alanı */}
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold">{product.title}</h1>
        <p>${product.price}</p>
        <button onClick={handleAddToBag} className="bg-violet-600 text-white py-4 px-8 rounded-lg font-bold hover:bg-violet-700 transition-all active:scale-95 shadow-lg">Add to bag</button>
      </div>
    </div>
  );
};

export default ProductDetail;

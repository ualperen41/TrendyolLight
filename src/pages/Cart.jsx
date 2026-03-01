import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const Cart = () => {
  const navigate = useNavigate();
  const [showConfirm, setShowConfirm] = useState(false);
  const [isCheckout, setIsCheckout] = useState(false); // 👈 Yeni eklenen: Sayfa kontrolü
  const [couponInput, setCouponInput] = useState("");
  const {
    cart,
    decreaseQuantity,
    increaseQuantity,
    removeFromCart,
    clearCart,
    totalPrice,
    shippingFee,
    amountToFreeShipping,
    finalTotal,
    couponValue,
    applyCoupon,
  } = useContext(CartContext);

  const confirmClear = () => {
    clearCart();
    setShowConfirm(false);
  };

  return (
    <div className="relative min-h-screen">
      {/* 1. Üstten Kayan Onay Barı (Aynı Kalıyor) */}
      <div
        className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 transform ${showConfirm ? "translate-y-0" : "-translate-y-full"}`}
      >
        <div className="bg-orange-600 text-white p-6 shadow-2xl flex flex-col md:flex-row items-center justify-center gap-6 border-b-4 border-orange-700">
          <p className="font-bold text-lg text-center">
            Sepetini tamamen boşaltmak istediğine emin misin? 🧡
          </p>
          <div className="flex gap-4">
            <button
              onClick={() => setShowConfirm(false)}
              className="px-8 py-2 bg-white text-orange-600 rounded-full font-black hover:scale-105 transition-transform"
            >
              Kalsın
            </button>
            <button
              onClick={confirmClear}
              className="px-8 py-2 bg-orange-900 text-white rounded-full font-black hover:bg-black transition-colors border border-orange-400"
            >
              Temizle 🗑️
            </button>
          </div>
        </div>
      </div>

      {/* 2. ANA İÇERİK: Burada isCheckout kontrolü başlıyor */}
      <div
        className={`max-w-6xl mx-auto p-4 transition-all duration-300 ${showConfirm ? "blur-md opacity-50 pointer-events-none" : ""}`}
      >
        {!isCheckout ? (
          /* ==================== 🛒 ESKİ TASARIMIN (DOKUNULMADI) ==================== */
          <>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800">
                {" "}
                Sepetim ({cart.length} Ürün)
              </h2>
              {cart.length > 0 && (
                <button
                  onClick={() => setShowConfirm(true)}
                  className="text-red-500 hover:text-red-700 font-medium transition-colors flex items-center gap-1 text-sm"
                >
                  🗑️ Sepeti Temizle
                </button>
              )}
            </div>

            {cart.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-2xl shadow-sm border">
                <p className="text-xl text-gray-500 mb-6">
                  Sepetin şu an boş 🛒
                </p>
                <Link
                  to="/"
                  className="bg-orange-500 text-white px-8 py-3 rounded-xl font-bold hover:bg-orange-600 transition-all shadow-lg shadow-orange-200"
                >
                  Alışverişe Başla
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* SEPET LİSTESİ */}
                <div className="lg:col-span-2 space-y-4">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between bg-white p-4 rounded-xl border border-gray-100 shadow-sm"
                    >
                      <div className="flex items-center gap-4 w-3/5">
                        <img
                          src={item.image}
                          className="w-20 h-20 object-contain p-2 bg-gray-50 rounded-lg"
                          alt={item.title}
                        />
                        <h4 className="text-sm font-semibold text-gray-700 line-clamp-2">
                          {item.title}
                        </h4>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-3 border border-gray-200 rounded-full px-3 py-1 bg-white">
                          <button
                            onClick={() => decreaseQuantity(item.id)}
                            className="text-orange-500 font-black hover:scale-110 transition-transform"
                          >
                            −
                          </button>
                          <span className="font-bold min-w-[20px] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => increaseQuantity(item.id)}
                            className="text-orange-500 font-black hover:scale-110 transition-transform"
                          >
                            +
                          </button>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="w-8 h-8 flex items-center justify-center bg-orange-50 text-orange-600 rounded-full hover:bg-orange-500 hover:text-white transition-all"
                        >
                          ✕
                        </button>
                        <p className="font-bold text-gray-800 w-24 text-right">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}

                  {/* Kupon Kodu Girişi */}
                  <div className="mb-6 p-4 bg-white rounded-xl border border-gray-100">
                    <label className="block text-xs font-bold text-gray-400 uppercase mb-2 ml-1">
                      İndirim Kuponu
                    </label>
                    {couponValue > 0 ? (
                      <div className="flex items-center justify-between bg-green-50 border border-green-200 p-3 rounded-xl">
                        <span className="text-green-700 font-medium text-sm">
                          🎉 Kupon Uygulandı! % {couponValue * 100} İndirim
                        </span>
                        <button
                          onClick={() => applyCoupon("")}
                          className="text-xs font-bold text-red-500 underline"
                        >
                          İptal Et
                        </button>
                      </div>
                    ) : (
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={couponInput}
                          onChange={(e) => setCouponInput(e.target.value)}
                          placeholder="Kod: BEDAVA20"
                          className="flex-1 px-4 py-2 border rounded-xl text-sm outline-none focus:ring-2 focus:ring-orange-500"
                        />
                        <button
                          onClick={() => applyCoupon(couponInput)}
                          className="bg-gray-800 text-white px-4 py-2 rounded-xl font-bold text-sm"
                        >
                          Uygula
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* SİPARİŞ ÖZETİ (SAĞ TARAF) */}
                <div className="lg:col-span-1">
                  <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xl sticky top-24">
                    <h3 className="text-xl font-bold mb-6 text-gray-800 border-b pb-4">
                      Sipariş Özeti
                    </h3>
                    {amountToFreeShipping > 0 ? (
                      <div className="bg-orange-50 text-orange-700 p-4 rounded-xl mb-6 text-sm border">
                        Kargonun bedava olması için{" "}
                        <span className="font-black">
                          ${amountToFreeShipping.toFixed(2)}
                        </span>{" "}
                        daha ekle!
                      </div>
                    ) : (
                      <div className="bg-green-50 text-green-700 p-4 rounded-xl mb-6 text-sm font-bold italic">
                        🎉 Kargonuz bedava!
                      </div>
                    )}
                    <div className="space-y-4 mb-6">
                      <div className="flex justify-between text-gray-500">
                        <span>Ürünler Toplamı</span>
                        <span className="font-semibold text-gray-800">
                          ${totalPrice.toFixed(2)}
                        </span>
                      </div>
                      {couponValue > 0 && (
                        <div className="flex justify-between text-green-600 font-bold bg-green-50 p-2 rounded-lg">
                          <span>Kupon İndirimi</span>
                          <span>-${(totalPrice * couponValue).toFixed(2)}</span>
                        </div>
                      )}
                      <div className="flex justify-between text-gray-500">
                        <span>Kargo Ücreti</span>
                        <span
                          className={
                            shippingFee === 0
                              ? "text-green-600 font-bold"
                              : "font-semibold text-gray-800"
                          }
                        >
                          {shippingFee === 0
                            ? "Bedava"
                            : `$${shippingFee.toFixed(2)}`}
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-between items-end border-t pt-4 mb-8">
                      <span className="text-gray-600 font-medium">
                        Toplam Ödenecek
                      </span>
                      <span className="text-3xl font-black text-orange-600">
                        ${finalTotal.toFixed(2)}
                      </span>
                    </div>
                    {/* 👇 Burası butonu değiştirdiğimiz yer */}
                    <button
                      onClick={() => setIsCheckout(true)}
                      className="w-full bg-orange-500 text-white py-4 rounded-xl font-extrabold text-lg hover:bg-orange-600 transition-all shadow-lg"
                    >
                      Alışverişi Tamamla
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        ) : (
          /* ==================== 💳 2. ADIM: YENİ ÖDEME FORMU ==================== */
          <div className="max-w-4xl mx-auto animate-fade-in py-10">
            <button
              onClick={() => setIsCheckout(false)}
              className="text-gray-500 hover:text-black mb-8 flex items-center gap-2 font-bold underline transition-all"
            >
              ← Sepete Geri Dön ve Ürünleri Düzenle
            </button>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Sol Taraf: Form */}
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                <h3 className="text-2xl font-bold mb-8 text-gray-800">
                  Teslimat & Ödeme
                </h3>
                <div className="space-y-5">
                  <input
                    type="text"
                    placeholder="Ad Soyad"
                    className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-orange-500 outline-none"
                  />
                  <input
                    type="email"
                    placeholder="E-posta Adresi"
                    className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-orange-500 outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Kart Numarası"
                    maxLength="16"
                    className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-orange-500 outline-none"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      placeholder="AA/YY"
                      className="p-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-orange-500 outline-none"
                    />
                    <input
                      placeholder="CVV"
                      maxLength="3"
                      className="p-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-orange-500 outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Sağ Taraf: Siyah Onay Kartı */}
              <div className="bg-gray-900 text-white p-8 rounded-3xl h-fit shadow-2xl sticky top-10">
                <h4 className="text-xl font-bold mb-6 border-b border-gray-700 pb-4 italic">
                  Sipariş Özeti
                </h4>
                <div className="space-y-4 text-gray-400">
                  <div className="flex justify-between">
                    <span>Ürün Toplamı:</span>{" "}
                    <span className="text-white font-bold">
                      ${totalPrice.toFixed(2)}
                    </span>
                  </div>
                  {couponValue > 0 && (
                    <div className="flex justify-between text-green-400">
                      <span>Kupon İndirimi:</span>{" "}
                      <span>-${(totalPrice * couponValue).toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Kargo:</span>{" "}
                    <span className="text-white">
                      {shippingFee === 0 ? "Bedava" : `$${shippingFee}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-white font-black text-2xl border-t border-gray-700 pt-6">
                    <span>TOPLAM:</span>{" "}
                    <span className="text-orange-500">
                      ${finalTotal.toFixed(2)}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => {
                    alert("Harika! Siparişiniz başarıyla alındı. 🚀");
                    clearCart();
                    navigate("/");
                  }}
                  className="w-full bg-orange-500 text-white py-5 rounded-2xl mt-10 font-black text-lg hover:bg-orange-600 active:scale-95 transition-all shadow-xl shadow-orange-900/20"
                >
                  Siparişi Onayla ve Bitir
                </button>
                <p className="text-[10px] text-center mt-6 text-gray-500 uppercase tracking-[3px]">
                  Secure Checkout 🔒
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;

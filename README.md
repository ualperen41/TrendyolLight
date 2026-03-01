

# TrendyolLight

TrendyolLight, React ve Vite kullanılarak geliştirilmiş, modern ve hızlı bir e-ticaret uygulamasıdır. Kullanıcılar ürünleri görüntüleyebilir, sepete ekleyebilir ve detay sayfasında ürün bilgilerini inceleyebilir. Proje, öğrenme ve geliştirme amaçlı hazırlanmıştır.

---

## İçindekiler
- [Proje Amacı](#proje-amacı)
- [Kullanılan Teknolojiler](#kullanılan-teknolojiler)
- [Özellikler](#özellikler)
- [Klasör Yapısı](#klasör-yapısı)
- [Kurulum](#kurulum)
- [Kullanım](#kullanım)
- [Katkı Sağlama](#katkı-sağlama)
- [Lisans](#lisans)
- [İletişim](#iletişim)

---

## Proje Amacı

Bu proje, React ekosistemini ve modern frontend geliştirme araçlarını kullanarak temel bir e-ticaret deneyimi sunmayı amaçlar. Kod yapısı, component mimarisi ve state yönetimi gibi konularda örnek teşkil eder.

## Kullanılan Teknolojiler

- **React**: Kullanıcı arayüzü oluşturmak için ana kütüphane.
- **Vite**: Hızlı geliştirme ve derleme ortamı sağlar.
- **Context API**: Uygulama genelinde sepet gibi global state yönetimi için kullanılır.
- **ESLint**: Kod kalitesini ve tutarlılığını korumak için linting aracı.
- **JavaScript (JSX)**: Bileşen tabanlı geliştirme için.
- **CSS**: Temel stillendirme için.

## Özellikler

- Ürün listeleme ve detay sayfası
- Sepet yönetimi (ekle, çıkar, toplam tutar)
- Responsive ve modern arayüz
- Component tabanlı mimari

## Klasör Yapısı

```
src/
	App.jsx           # Ana uygulama bileşeni
	index.css         # Global stiller
	main.jsx          # Uygulama giriş noktası
	components/       # Tekil ve tekrar kullanılabilir bileşenler
		Button.jsx
		Card.jsx
		Navbar.jsx
	context/          # Global state yönetimi
		CartContext.jsx
	layouts/          # Sayfa düzenleri
		MainLayout.jsx
	pages/            # Sayfa bileşenleri
		Cart.jsx
		Home.jsx
		ProductDetail.jsx
```

## Kurulum

1. Depoyu klonlayın:
	 ```bash
	 git clone https://github.com/kullaniciadi/TrendyolLight.git
	 cd TrendyolLight
	 ```
2. Bağımlılıkları yükleyin:
	 ```bash
	 npm install
	 ```
3. Geliştirme sunucusunu başlatın:
	 ```bash
	 npm run dev
	 ```

## Kullanım

Geliştirme sunucusu başlatıldıktan sonra tarayıcınızda `http://localhost:5173` adresini ziyaret ederek uygulamayı görüntüleyebilirsiniz.

## Katkı Sağlama

Katkıda bulunmak için:
1. Depoyu fork'layın
2. Yeni bir branch oluşturun (`git checkout -b ozellik-adi`)
3. Değişikliklerinizi yapın ve commit'leyin
4. Pull request gönderin

## Lisans

Bu proje MIT lisansı ile lisanslanmıştır. Detaylar için LICENSE dosyasını inceleyebilirsiniz.

## İletişim

Sorularınız veya önerileriniz için [e-posta adresinizi buraya ekleyin] veya GitHub Issues üzerinden iletişime geçebilirsiniz.

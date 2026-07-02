import React from 'react';
import { Phone, MapPin, Clock, Sparkles } from 'lucide-react';
import logoImg from '../assets/images/flora_logo_1782987086551.jpg';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-stone-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo & Tagline */}
          <div className="flex items-center space-x-3">
            <div className="w-11 h-11 rounded-full overflow-hidden shadow-md border border-stone-150 shrink-0">
              <img src={logoImg} alt="Flora Flowers Logo" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>
            <div>
              <h1 className="text-xl font-serif font-bold tracking-widest text-stone-900 flex items-center gap-1.5">
                FLORA FLOWERS
                <span className="text-[10px] font-sans tracking-normal bg-stone-100 text-stone-600 px-2 py-0.5 rounded-full font-medium">
                  ГҮЛДӨР
                </span>
              </h1>
              <p className="text-[10px] tracking-wider uppercase text-stone-500 font-sans font-medium">
                Premium Floral Boutique • Issyk-Kul
              </p>
            </div>
          </div>

          {/* Core Store Info (Desktop) */}
          <div className="hidden md:flex items-center space-x-8 text-stone-700 font-sans text-xs font-medium">
            <a
              href="https://2gis.kg/search/%D0%91%D0%B0%D0%BB%D1%8B%D0%BA%D1%87%D1%8B%20%D0%B0%D0%BC%D0%B0%D0%BD%D0%B1%D0%B0%D0%B5%D0%B2%D0%B0%20128"
              target="_blank"
              rel="noreferrer"
              className="flex items-center space-x-2 hover:text-amber-800 group transition-colors cursor-pointer"
              title="Показать на 2ГИС"
            >
              <div className="p-1.5 rounded-full bg-stone-50 text-stone-600 group-hover:bg-amber-50 group-hover:text-amber-700 transition-colors">
                <MapPin className="w-3.5 h-3.5" />
              </div>
              <div>
                <p className="text-stone-900 font-semibold group-hover:text-amber-800 transition-colors">ул. Аманбаева, 128</p>
                <p className="text-[10px] text-stone-500 group-hover:text-amber-700/80 transition-colors">г. Балыкчы • 2ГИС</p>
              </div>
            </a>

            <div className="flex items-center space-x-2">
              <div className="p-1.5 rounded-full bg-stone-50 text-stone-600">
                <Clock className="w-3.5 h-3.5" />
              </div>
              <div>
                <p className="text-stone-900 font-semibold">10:00 – 23:00</p>
                <p className="text-[10px] text-stone-500">Без выходных</p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <div className="p-1.5 rounded-full bg-amber-50 text-amber-700">
                <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              </div>
              <div>
                <p className="text-stone-900 font-semibold">Люкс-Доставка</p>
                <p className="text-[10px] text-amber-700">В аква-боксах</p>
              </div>
            </div>
          </div>

          {/* Quick Contact & Call to Action */}
          <div className="flex items-center space-x-4">
            <a
              href="tel:+996509151602"
              className="hidden sm:flex items-center space-x-2 text-stone-700 hover:text-stone-900 font-sans text-xs font-semibold"
              id="header_phone_link"
            >
              <Phone className="w-4 h-4 text-stone-500" />
              <span>+996 (509) 151-602</span>
            </a>
            <a
              href="https://wa.me/996509151602"
              target="_blank"
              rel="noreferrer"
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-sans text-xs font-medium px-4 py-2.5 rounded-full shadow-md hover:shadow-lg transition-all flex items-center space-x-1.5"
              id="header_whatsapp_btn"
            >
              <svg
                className="w-4 h-4 fill-current"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.455 5.703 1.458h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              <span>Заказать</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

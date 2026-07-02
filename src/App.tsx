import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Collection from './components/Collection';
import Configurator from './components/Configurator';
import DeliveryCalc from './components/DeliveryCalc';
import CareGuide from './components/CareGuide';
import OrderModal from './components/OrderModal';
import { Bouquet, CustomBouquet } from './types';
import { Sparkles, Phone, Instagram, MapPin, Heart, ArrowUp, Calendar, Clock, AlertCircle } from 'lucide-react';

export default function App() {
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBouquet, setSelectedBouquet] = useState<Bouquet | null>(null);
  const [customBouquet, setCustomBouquet] = useState<CustomBouquet | null>(null);
  const [checkoutPrice, setCheckoutPrice] = useState<number>(0);

  // Back to top button visibility
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOrderCurated = (bouquet: Bouquet) => {
    setSelectedBouquet(bouquet);
    setCustomBouquet(null);
    setCheckoutPrice(bouquet.priceKGS);
    setIsModalOpen(true);
  };

  const handleOrderCustom = (custom: CustomBouquet, price: number) => {
    setSelectedBouquet(null);
    setCustomBouquet(custom);
    setCheckoutPrice(price);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-white text-stone-900 font-sans selection:bg-stone-900 selection:text-white">
      
      {/* Top micro announcement bar */}
      <div className="bg-stone-950 text-white text-[10px] font-sans font-bold tracking-widest text-center py-2.5 px-4 uppercase flex items-center justify-center gap-1.5 border-b border-stone-850">
        <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
        <span>Доставка в течение 1 часа по Балыкчы. Принимаем заказы на сезон летних отпусков Иссык-Куля 2026!</span>
      </div>

      {/* Primary Header */}
      <Header />

      {/* Main Contents */}
      <main>
        
        {/* Hero Banner Section */}
        <Hero
          onScrollToCollection={() => handleScrollToSection('collection-section')}
          onScrollToConfigurator={() => handleScrollToSection('configurator-section')}
        />

        {/* Curated Collection Catalog */}
        <Collection onSelectBouquet={handleOrderCurated} />

        {/* Dynamic Bouquet Configurator */}
        <Configurator onOrderCustom={handleOrderCustom} />

        {/* Delivery zones & rates around Issyk-Kul */}
        <DeliveryCalc />

        {/* Interactive Florist Care Guide */}
        <CareGuide />

        {/* FAQ & Map Section */}
        <section className="py-16 bg-white border-b border-stone-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              
              {/* FAQ details */}
              <div className="lg:col-span-6 space-y-6">
                <h3 className="font-serif text-2xl font-bold text-stone-900">
                  Часто задаваемые вопросы
                </h3>
                <div className="h-0.5 w-12 bg-stone-900" />
                
                <div className="space-y-4 text-xs font-sans text-stone-600">
                  <div className="p-4 bg-stone-50 rounded-xl border border-stone-100">
                    <p className="font-bold text-stone-900 mb-1">Как осуществляется оплата из-за границы?</p>
                    <p className="leading-relaxed">
                      Вы можете заказать букет для близких в Балыкчы, находясь в любой точке мира. Мы принимаем онлайн-переводы на карты Visa, М-Банк (Элкарт), О!Деньги и кошелек Элсом. Свяжитесь с нами в WhatsApp для получения реквизитов.
                    </p>
                  </div>

                  <div className="p-4 bg-stone-50 rounded-xl border border-stone-100">
                    <p className="font-bold text-stone-900 mb-1">Могу ли я отправить букет анонимно?</p>
                    <p className="leading-relaxed">
                      Да, мы гарантируем полную конфиденциальность. Просто укажите в поле «Имя получателя» имя вашего адресата, а в примечании или WhatsApp сообщите, что желаете сделать сюрприз анонимно. Мы лишь передадим открытку с вашим текстом (или оставим букет вовсе без подписи).
                    </p>
                  </div>

                  <div className="p-4 bg-stone-50 rounded-xl border border-stone-100">
                    <p className="font-bold text-stone-900 mb-1">Где собираются ваши букеты?</p>
                    <p className="leading-relaxed">
                      Наш главный салон находится в центре города Балыкчы. Цветы хранятся в специальном профессиональном холодильном оборудовании при стабильной температуре +4°C, что гарантирует абсолютную свежесть каждого лепестка при отправке.
                    </p>
                  </div>
                </div>
              </div>

              {/* Physical Location Details / Map Preview */}
              <div className="lg:col-span-6 space-y-6">
                <h3 className="font-serif text-2xl font-bold text-stone-900">
                  Контакты и бутик в Балыкчы
                </h3>
                <div className="h-0.5 w-12 bg-stone-900" />

                <div className="bg-stone-50 rounded-2xl border border-stone-100 p-6 space-y-4 text-xs font-sans text-stone-700">
                  <a
                    href="https://2gis.kg/search/%D0%91%D0%B0%D0%BB%D1%8B%D0%BA%D1%87%D1%8B%20%D0%B0%D0%BC%D0%B0%D0%BD%D0%B1%D0%B0%D0%B5%D0%B2%D0%B0%20128"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-start space-x-3 group hover:text-amber-800 transition-colors cursor-pointer"
                    title="Показать на 2ГИС"
                  >
                    <MapPin className="w-5 h-5 text-amber-700 group-hover:text-amber-800 transition-colors shrink-0" />
                    <div>
                      <p className="font-bold text-stone-900 group-hover:text-amber-800 transition-colors">Физический адрес салона:</p>
                      <p className="text-stone-600 group-hover:text-stone-800 mt-0.5 underline decoration-stone-300 group-hover:decoration-amber-800">
                        Кыргызстан, Иссык-Кульская область, г. Балыкчы, ул. Аманбаева, 128 (Открыть в 2ГИС)
                      </p>
                    </div>
                  </a>

                  <div className="flex items-start space-x-3">
                    <Phone className="w-5 h-5 text-amber-700 shrink-0" />
                    <div>
                      <p className="font-bold text-stone-900">Служба заботы о клиентах (WhatsApp / Звонки):</p>
                      <p className="text-stone-600 mt-0.5">+996 (509) 151-602 (русский, кыргызский языки)</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Instagram className="w-5 h-5 text-amber-700 shrink-0" />
                    <div>
                      <p className="font-bold text-stone-900">Наш Instagram портфолио:</p>
                      <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-stone-800 underline font-semibold hover:text-amber-800 transition-colors mt-0.5 block">
                        @flora.flowers.balykchy
                      </a>
                    </div>
                  </div>
                </div>

                {/* Elegant Minimalist visual placeholder for map with 2GIS button */}
                <div className="relative rounded-2xl overflow-hidden border border-stone-200 bg-stone-50 aspect-[16/9] flex flex-col items-center justify-center p-6 text-center shadow-inner">
                  <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-60" />
                  <div className="relative space-y-3 max-w-sm z-10">
                    <div className="w-12 h-12 rounded-full bg-amber-50 text-amber-700 flex items-center justify-center mx-auto shadow-md">
                      <MapPin className="w-6 h-6 animate-bounce" />
                    </div>
                    <div>
                      <p className="font-serif text-base font-bold text-stone-800">ул. Аманбаева, 128, г. Балыкчы</p>
                      <p className="text-[10px] text-stone-500 font-sans mt-1">
                        Время работы и самовывоза: 10:00 – 23:00. Удобное расположение в центре города.
                      </p>
                    </div>
                    <a
                      href="https://2gis.kg/search/%D0%91%D0%B0%D0%BB%D1%8B%D0%BA%D1%87%D1%8B%20%D0%B0%D0%BC%D0%B0%D0%BD%D0%B1%D0%B0%D0%B5%D0%B2%D0%B0%20128"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center space-x-2 bg-[#2ba22b] hover:bg-[#258a25] text-white font-sans text-xs font-semibold px-5 py-2.5 rounded-full shadow-md transition-all mt-1 cursor-pointer"
                    >
                      <span className="font-bold text-xs tracking-wider">2ГИС</span>
                      <span>• Показать на карте</span>
                    </a>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

      </main>

      {/* Elegant Editorial Footer */}
      <footer className="bg-stone-950 text-white pt-16 pb-12 border-t border-stone-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 border-b border-stone-900 pb-12 mb-12">
            
            <div className="md:col-span-5 space-y-4">
              <h4 className="font-serif text-xl font-bold tracking-widest text-white">
                FLORA FLOWERS
              </h4>
              <p className="text-stone-400 text-xs font-sans leading-relaxed max-w-md">
                Элитный флористический бутик в Балыкчы. Мы воплощаем изысканность, создавая гармоничные композиции из самых свежих цветов для незабываемых моментов на побережье Иссык-Куля от Flora Flowers.
              </p>
              <div className="flex space-x-3 pt-2 text-stone-400">
                <a href="https://instagram.com" className="hover:text-white p-2 bg-stone-900 rounded-full transition-colors">
                  <Instagram className="w-4 h-4" />
                </a>
                <a href="tel:+996509151602" className="hover:text-white p-2 bg-stone-900 rounded-full transition-colors">
                  <Phone className="w-4 h-4" />
                </a>
              </div>
            </div>

            <div className="md:col-span-3 space-y-3">
              <h5 className="font-sans text-xs font-bold uppercase tracking-widest text-amber-400">
                Навигация
              </h5>
              <ul className="space-y-2 text-xs font-sans text-stone-400">
                <li>
                  <button onClick={() => handleScrollToSection('collection-section')} className="hover:text-white transition-colors cursor-pointer text-left">
                    Каталог букетов
                  </button>
                </li>
                <li>
                  <button onClick={() => handleScrollToSection('configurator-section')} className="hover:text-white transition-colors cursor-pointer text-left">
                    Индивидуальный конструктор
                  </button>
                </li>
                <li>
                  <button onClick={() => handleScrollToSection('delivery-section')} className="hover:text-white transition-colors cursor-pointer text-left">
                    Цены на доставку
                  </button>
                </li>
                <li>
                  <button onClick={() => handleScrollToSection('care-section')} className="hover:text-white transition-colors cursor-pointer text-left">
                    Рекомендации флористов
                  </button>
                </li>
              </ul>
            </div>

            <div className="md:col-span-4 space-y-3">
              <h5 className="font-sans text-xs font-bold uppercase tracking-widest text-amber-400">
                Эксклюзивные услуги
              </h5>
              <ul className="space-y-2 text-xs font-sans text-stone-400">
                <li>• Оформление торжеств и свадеб на берегу озера</li>
                <li>• Доставка на катера, яхты и закрытые пирсы</li>
                <li>• Корпоративное обслуживание пансионатов и отелей</li>
                <li>• Создание гигантских композиций (101 и 501 роза)</li>
              </ul>
            </div>

          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between text-[10px] font-sans text-stone-500 gap-4">
            <p>© {new Date().getFullYear()} Flora Flowers. Все права защищены. Балыкчы, Кыргызстан.</p>
            <p className="flex items-center gap-1.5">
              Сделано с <Heart className="w-3 h-3 text-red-500 fill-current" /> на берегу жемчужины Тянь-Шаня.
            </p>
          </div>
        </div>
      </footer>

      {/* Checkout Modal Overlay */}
      <OrderModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedBouquet={selectedBouquet}
        customBouquet={customBouquet}
        basePrice={checkoutPrice}
      />

      {/* Floating Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 z-40 bg-stone-900 hover:bg-stone-800 text-white p-3 rounded-full shadow-lg border border-stone-800 hover:scale-105 transition-all cursor-pointer"
          id="back_to_top_btn"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}

    </div>
  );
}

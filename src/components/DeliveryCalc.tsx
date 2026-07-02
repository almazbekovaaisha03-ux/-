import React, { useState } from 'react';
import { DELIVERY_LOCATIONS } from '../data';
import { Truck, Navigation, ShieldCheck, ThermometerSnowflake, Compass, Star } from 'lucide-react';
import { motion } from 'motion/react';

export default function DeliveryCalc() {
  const [selectedLocId, setSelectedLocId] = useState<string>('l1');

  const selectedLoc = DELIVERY_LOCATIONS.find(l => l.id === selectedLocId) || DELIVERY_LOCATIONS[0];

  return (
    <section id="delivery-section" className="py-16 md:py-24 bg-white border-b border-stone-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Split Section Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Side: Copy and selection */}
          <div className="lg:col-span-6 space-y-8">
            <div>
              <span className="text-xs tracking-widest uppercase text-amber-700 font-sans font-semibold flex items-center gap-2">
                <Truck className="w-3.5 h-3.5" />
                Логистика высшего класса
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 mt-3">
                Бережная доставка по Иссык-Кулю
              </h2>
              <div className="h-0.5 w-16 bg-stone-900 my-5" />
              <p className="text-stone-600 font-sans text-sm leading-relaxed">
                Поскольку живые цветы очень чувствительны к жаре, сквознякам и горным дорогам, мы разработали собственную премиальную систему транспортировки. Каждый букет доставляется в вертикальном положении в специальном аква-боксе с питательным раствором и климатическом контейнере, защищающем нежные лепестки от иссыхания.
              </p>
            </div>

            {/* Select Destination Dropdown */}
            <div className="space-y-3 bg-stone-50 p-6 rounded-2xl border border-stone-100">
              <label className="block text-xs font-sans font-bold text-stone-800 uppercase tracking-wider">
                Выберите пункт назначения из Балыкчы:
              </label>
              <select
                value={selectedLocId}
                onChange={(e) => setSelectedLocId(e.target.value)}
                className="w-full bg-white border border-stone-200 rounded-xl px-4 py-3 text-sm font-sans font-medium text-stone-900 focus:outline-none focus:border-stone-400 cursor-pointer"
              >
                {DELIVERY_LOCATIONS.map((loc) => (
                  <option key={loc.id} value={loc.id}>
                    {loc.name} — {loc.priceKGS === 0 ? 'Бесплатно' : `${loc.priceKGS} сом`}
                  </option>
                ))}
              </select>

              {/* Dynamic Details Box */}
              <div className="pt-4 border-t border-stone-200/60 mt-4 space-y-3">
                <div className="flex justify-between items-center text-xs font-sans">
                  <span className="text-stone-500 font-medium">Время в пути из салона:</span>
                  <span className="font-bold text-stone-900">{selectedLoc.timeHours}</span>
                </div>
                <div className="flex justify-between items-center text-xs font-sans">
                  <span className="text-stone-500 font-medium">Стоимость доставки:</span>
                  <span className="font-bold text-amber-800 text-sm">
                    {selectedLoc.priceKGS === 0 ? 'Бесплатно' : `${selectedLoc.priceKGS} сом`}
                  </span>
                </div>
                <p className="text-[11px] text-stone-600 font-sans leading-relaxed italic bg-white/80 p-3 rounded-lg border border-stone-100 mt-2">
                  {selectedLoc.description}
                </p>
              </div>
            </div>
          </div>

          {/* Right Side: Interactive Logistics Visualizer */}
          <div className="lg:col-span-6">
            <div className="bg-stone-950 text-white rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl" />
              
              <h3 className="font-serif text-lg font-bold text-white mb-6 flex items-center gap-2">
                <Compass className="w-5 h-5 text-amber-400" />
                Карта и стандарты Flora-Logistics
              </h3>

              {/* Visual Logistics Pipeline */}
              <div className="relative space-y-8 before:absolute before:bottom-2 before:top-2 before:left-3 before:w-0.5 before:bg-stone-800">
                
                {/* Stage 1: Salon */}
                <div className="relative flex items-start space-x-4">
                  <div className="w-6.5 h-6.5 rounded-full bg-emerald-500 text-stone-950 flex items-center justify-center font-bold text-xs shrink-0 z-10 border-4 border-stone-950">
                    1
                  </div>
                  <div className="space-y-1">
                    <p className="font-sans text-xs font-bold text-white uppercase tracking-wider">Отправление</p>
                    <p className="font-sans text-xs text-stone-300">Флористический салон Flora Flowers (г. Балыкчы, ул. Аманбаева, 128)</p>
                    <p className="text-[10px] text-stone-500 font-sans">Сборка букета, подрезка стеблей, крепление оазиса или аква-бокса Chrysal</p>
                  </div>
                </div>

                {/* Stage 2: Transit Care */}
                <div className="relative flex items-start space-x-4">
                  <div className="w-6.5 h-6.5 rounded-full bg-amber-400 text-stone-950 flex items-center justify-center font-bold text-xs shrink-0 z-10 border-4 border-stone-950">
                    2
                  </div>
                  <div className="space-y-1">
                    <p className="font-sans text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1">
                      <ThermometerSnowflake className="w-3.5 h-3.5 animate-pulse" />
                      Климат-Контроль в пути
                    </p>
                    <p className="font-sans text-xs text-stone-300">Специальный контейнер с постоянной температурой +7°C</p>
                    <p className="text-[10px] text-stone-500 font-sans">Цветы не вянут на солнце и защищены от сквозных иссыхающих ветров Боомского ущелья и Улана</p>
                  </div>
                </div>

                {/* Stage 3: Destination */}
                <div className="relative flex items-start space-x-4">
                  <div className="w-6.5 h-6.5 rounded-full bg-stone-800 text-stone-300 flex items-center justify-center font-bold text-xs shrink-0 z-10 border-4 border-stone-950">
                    3
                  </div>
                  <div className="space-y-1">
                    <p className="font-sans text-xs font-bold text-stone-300 uppercase tracking-wider">Пункт Назначения</p>
                    <p className="font-sans text-xs text-stone-200 font-semibold">{selectedLoc.name}</p>
                    <p className="text-[10px] text-amber-500 font-sans font-semibold">Ожидаемое время доставки: ~ {selectedLoc.timeHours}</p>
                  </div>
                </div>

              </div>

              {/* Integrity Seals */}
              <div className="grid grid-cols-2 gap-4 mt-8 pt-6 border-t border-stone-800 text-stone-400 font-sans text-[10px]">
                <div className="flex items-center space-x-2 bg-stone-900 p-2.5 rounded-xl border border-stone-800">
                  <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0" />
                  <span>Фотоотчет букета перед отправкой получателю</span>
                </div>
                <div className="flex items-center space-x-2 bg-stone-900 p-2.5 rounded-xl border border-stone-800">
                  <Star className="w-5 h-5 text-amber-400 shrink-0" />
                  <span>Возврат 100% стоимости при несоответствии качеству</span>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

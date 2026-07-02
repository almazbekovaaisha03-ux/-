import React, { useState } from 'react';
import { FLOWER_TYPES, WRAPPING_STYLES } from '../data';
import { CustomBouquet, FlowerType, WrappingStyle } from '../types';
import { Plus, Minus, Sparkles, Check, Gift, HelpCircle, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ConfiguratorProps {
  onOrderCustom: (customBouquet: CustomBouquet, totalPrice: number) => void;
}

const RIBBON_COLORS = [
  { name: 'Шёлковая Шампань', hex: '#FDFBF7', text: 'text-stone-800 border-stone-200' },
  { name: 'Изумрудный Бархат', hex: '#0F2E23', text: 'text-white border-transparent' },
  { name: 'Нежная Роза', hex: '#FFDFDF', text: 'text-stone-800 border-transparent' },
  { name: 'Глубокий Синий', hex: '#0A1E3F', text: 'text-white border-transparent' },
  { name: 'Золотая Нить', hex: '#D4AF37', text: 'text-white border-transparent' }
];

export default function Configurator({ onOrderCustom }: ConfiguratorProps) {
  const [selectedFlowers, setSelectedFlowers] = useState<{ [id: string]: number }>({});
  const [selectedWrappingId, setSelectedWrappingId] = useState<string>('w1');
  const [selectedRibbon, setSelectedRibbon] = useState<string>(RIBBON_COLORS[0].name);
  const [cardText, setCardText] = useState<string>('');
  const [cardSender, setCardSender] = useState<string>('');
  const [cardRecipient, setCardRecipient] = useState<string>('');

  const handleAdjustCount = (id: string, change: number) => {
    setSelectedFlowers((prev) => {
      const current = prev[id] || 0;
      const next = current + change;
      if (next <= 0) {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      }
      return { ...prev, [id]: next };
    });
  };

  const selectedWrapping = WRAPPING_STYLES.find(w => w.id === selectedWrappingId) || WRAPPING_STYLES[0];

  // Calculate pricing with explicit typing
  const flowersPrice = Object.entries(selectedFlowers).reduce((sum, [id, count]) => {
    const flower = FLOWER_TYPES.find(f => f.id === id);
    const countNum = count as number;
    return sum + (flower ? flower.priceKGS * countNum : 0);
  }, 0);

  const wrappingPrice = selectedWrapping.priceKGS;
  const totalPrice = flowersPrice + wrappingPrice;

  const totalStems = Object.values(selectedFlowers).reduce<number>((sum, count) => sum + (count as number), 0);

  const handleSubmit = () => {
    if (totalStems < 5) {
      alert('Минимальный премиум-букет собирается из 5 стеблей. Пожалуйста, добавьте еще цветов.');
      return;
    }

    const compiled: CustomBouquet = {
      flowers: Object.entries(selectedFlowers).map(([flowerId, count]) => ({ flowerId, count: count as number })),
      wrappingId: selectedWrappingId,
      ribbonColor: selectedRibbon,
      cardText,
      cardSender,
      cardRecipient
    };

    onOrderCustom(compiled, totalPrice);
  };

  return (
    <section id="configurator-section" className="py-16 md:py-24 bg-stone-50/50 border-b border-stone-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs tracking-widest uppercase text-amber-700 font-sans font-semibold flex items-center justify-center gap-2">
            <Gift className="w-3.5 h-3.5" />
            Индивидуальный Заказ
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 mt-3">
            Конструктор Премиум-Букета
          </h2>
          <div className="h-0.5 w-16 bg-stone-900 mx-auto my-5" />
          <p className="text-stone-600 font-sans text-sm leading-relaxed">
            Почувствуйте себя флористом элитного ателье. Выберите элитные сорта цветов, упаковку, шелковую ленту и напишите искреннее послание. Мы воплотим вашу фантазию в шедевр.
          </p>
        </div>

        {/* Builder Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Panel: Ingredients Selection */}
          <div className="lg:col-span-7 space-y-8 bg-white p-6 sm:p-8 rounded-2xl border border-stone-100 shadow-sm">
            
            {/* Step 1: Select Flowers */}
            <div>
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-stone-100">
                <h3 className="font-serif text-lg font-bold text-stone-900 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-stone-900 text-white flex items-center justify-center text-xs font-sans">1</span>
                  Выберите цветы поштучно
                </h3>
                <span className="text-xs font-sans font-semibold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full">
                  Мин. 5 стеблей
                </span>
              </div>

              <div className="space-y-4 max-h-[380px] overflow-y-auto pr-2 custom-scrollbar">
                {FLOWER_TYPES.map((flower) => {
                  const count = selectedFlowers[flower.id] || 0;
                  return (
                    <div
                      key={flower.id}
                      className={`flex items-center justify-between p-4 rounded-xl border transition-all ${
                        count > 0 ? 'bg-amber-50/20 border-amber-200' : 'bg-stone-50 border-stone-100 hover:border-stone-200'
                      }`}
                    >
                      <div className="space-y-1 max-w-[65%]">
                        <div className="flex items-center gap-2">
                          <p className="font-sans text-sm font-semibold text-stone-900">{flower.name}</p>
                          <span className="text-[10px] bg-stone-200/60 text-stone-600 px-1.5 py-0.5 rounded font-medium font-sans">
                            {flower.color}
                          </span>
                        </div>
                        <p className="text-[10px] text-stone-500 font-sans italic">{flower.symbolism}</p>
                        <p className="text-xs text-amber-800 font-medium font-sans mt-0.5">
                          {flower.priceKGS} сом / стебель
                        </p>
                      </div>

                      {/* Stepper controls */}
                      <div className="flex items-center space-x-3.5">
                        <button
                          onClick={() => handleAdjustCount(flower.id, -1)}
                          className={`w-8 h-8 rounded-full border border-stone-200 hover:bg-stone-100 flex items-center justify-center text-stone-600 transition-colors ${
                            count === 0 ? 'opacity-30 pointer-events-none' : ''
                          }`}
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="font-sans text-sm font-bold text-stone-900 w-4 text-center">
                          {count}
                        </span>
                        <button
                          onClick={() => handleAdjustCount(flower.id, 1)}
                          className="w-8 h-8 rounded-full border border-stone-200 hover:bg-stone-100 flex items-center justify-center text-stone-600 transition-colors"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Choose Wrapping Style */}
            <div>
              <div className="mb-4 pb-2 border-b border-stone-100">
                <h3 className="font-serif text-lg font-bold text-stone-900 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-stone-900 text-white flex items-center justify-center text-xs font-sans">2</span>
                  Выберите премиум-упаковку
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {WRAPPING_STYLES.map((wrap) => (
                  <label
                    key={wrap.id}
                    onClick={() => setSelectedWrappingId(wrap.id)}
                    className={`p-3.5 rounded-xl border flex flex-col justify-between cursor-pointer transition-all ${
                      selectedWrappingId === wrap.id
                        ? 'bg-stone-900 border-stone-900 text-white'
                        : 'bg-stone-50 border-stone-100 hover:bg-stone-100 hover:border-stone-200'
                    }`}
                  >
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-sans text-xs font-bold leading-tight">{wrap.name}</span>
                        {selectedWrappingId === wrap.id && <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />}
                      </div>
                      <p className={`text-[10px] leading-relaxed mb-3 ${selectedWrappingId === wrap.id ? 'text-stone-300' : 'text-stone-500'}`}>
                        {wrap.description}
                      </p>
                    </div>
                    <p className={`text-xs font-semibold ${selectedWrappingId === wrap.id ? 'text-amber-300' : 'text-stone-800'}`}>
                      {wrap.priceKGS === 0 ? 'Бесплатно' : `+ ${wrap.priceKGS} сом`}
                    </p>
                  </label>
                ))}
              </div>
            </div>

            {/* Step 3: Ribbon Colors */}
            <div>
              <div className="mb-3 pb-2 border-b border-stone-100">
                <h3 className="font-serif text-lg font-bold text-stone-900 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-stone-900 text-white flex items-center justify-center text-xs font-sans">3</span>
                  Шёлковая лента
                </h3>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                {RIBBON_COLORS.map((ribbon) => (
                  <button
                    key={ribbon.name}
                    onClick={() => setSelectedRibbon(ribbon.name)}
                    className={`flex items-center space-x-2 px-3 py-1.5 rounded-full border text-xs font-sans font-medium transition-all cursor-pointer ${
                      selectedRibbon === ribbon.name
                        ? 'border-stone-900 bg-stone-900 text-white shadow-sm'
                        : 'border-stone-200 bg-stone-50 hover:bg-stone-100 text-stone-700'
                    }`}
                  >
                    <span
                      className="w-3 h-3 rounded-full border border-stone-300/50 shrink-0"
                      style={{ backgroundColor: ribbon.hex }}
                    />
                    <span>{ribbon.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 4: Greeting Card Text */}
            <div>
              <div className="mb-4 pb-2 border-b border-stone-100">
                <h3 className="font-serif text-lg font-bold text-stone-900 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-stone-900 text-white flex items-center justify-center text-xs font-sans">4</span>
                  Подпись к букету (Подарочная открытка)
                </h3>
              </div>

              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-sans font-bold text-stone-500 uppercase tracking-wider mb-1">
                      От кого
                    </label>
                    <input
                      type="text"
                      value={cardSender}
                      onChange={(e) => setCardSender(e.target.value)}
                      placeholder="Имя отправителя"
                      className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-xs font-sans focus:outline-none focus:border-stone-400"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-sans font-bold text-stone-500 uppercase tracking-wider mb-1">
                      Кому
                    </label>
                    <input
                      type="text"
                      value={cardRecipient}
                      onChange={(e) => setCardRecipient(e.target.value)}
                      placeholder="Имя получателя"
                      className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-xs font-sans focus:outline-none focus:border-stone-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-sans font-bold text-stone-500 uppercase tracking-wider mb-1">
                    Текст пожелания (от руки каллиграфом)
                  </label>
                  <textarea
                    rows={3}
                    value={cardText}
                    onChange={(e) => setCardText(e.target.value)}
                    placeholder="Например: Любимой маме в день рождения! Самой лучшей на свете..."
                    className="w-full bg-stone-50 border border-stone-200 rounded-lg p-3 text-xs font-sans focus:outline-none focus:border-stone-400 resize-none"
                    maxLength={200}
                  />
                  <p className="text-[10px] text-right text-stone-400 font-sans mt-1">
                    {cardText.length}/200 символов
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Panel: Recipe Preview, Price & Giftcard Live Preview */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Live Recipe Preview */}
            <div className="bg-stone-900 text-white rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-amber-400/10 rounded-full blur-2xl -z-10" />
              
              <div className="flex items-center space-x-2 text-amber-400 text-xs font-sans font-bold uppercase tracking-widest mb-6">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Ваш уникальный рецепт</span>
              </div>

              <div className="space-y-4 min-h-[140px]">
                {totalStems === 0 ? (
                  <div className="flex flex-col items-center justify-center h-28 text-center text-stone-400">
                    <AlertCircle className="w-8 h-8 text-stone-500 mb-2" />
                    <p className="font-sans text-xs">Букет пуст. Добавьте цветы в левой панели, чтобы начать созидание.</p>
                  </div>
                ) : (
                  <div className="space-y-2 max-h-[180px] overflow-y-auto pr-1">
                    {Object.entries(selectedFlowers).map(([id, count]) => {
                      const flower = FLOWER_TYPES.find(f => f.id === id);
                      if (!flower) return null;
                      return (
                        <div key={id} className="flex justify-between text-xs font-sans border-b border-stone-800 pb-1.5">
                          <span className="text-stone-300">{flower.name}</span>
                          <span className="font-bold text-amber-300">{count} шт × {flower.priceKGS} сом</span>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Packaging and ribbons list */}
                <div className="pt-3 border-t border-stone-800 space-y-2 text-xs font-sans">
                  <div className="flex justify-between">
                    <span className="text-stone-400">Упаковка:</span>
                    <span className="font-medium text-stone-200">{selectedWrapping.name} ({selectedWrapping.priceKGS} сом)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-400">Лента:</span>
                    <span className="font-medium text-stone-200">{selectedRibbon}</span>
                  </div>
                </div>
              </div>

              {/* Dynamic Price Area */}
              <div className="mt-8 pt-6 border-t border-stone-800 flex items-baseline justify-between">
                <div>
                  <p className="text-[10px] text-stone-400 font-sans font-bold uppercase tracking-wider">Всего к оплате</p>
                  <p className="font-serif text-3xl font-extrabold text-amber-400 mt-1">
                    {totalPrice.toLocaleString('ru-RU')} сом
                  </p>
                </div>
                <div className="text-right text-[10px] text-stone-400 font-sans">
                  <p className="font-medium">Стеблей: {totalStems}</p>
                  <p className="mt-0.5">Сборка в подарок</p>
                </div>
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                disabled={totalStems < 5}
                className={`w-full text-center py-4 rounded-full font-sans text-sm font-bold tracking-wide mt-6 transition-all ${
                  totalStems >= 5
                    ? 'bg-amber-400 text-stone-950 hover:bg-amber-300 shadow-md hover:shadow-lg hover:scale-[1.01]'
                    : 'bg-stone-800 text-stone-500 cursor-not-allowed'
                }`}
                id="submit_custom_bouquet_btn"
              >
                {totalStems < 5 ? `Добавьте еще ${5 - totalStems} стеблей` : 'Заказать этот букет'}
              </button>
            </div>

            {/* Handwritten Greeting Card Mock-up */}
            <AnimatePresence>
              {(cardText || cardSender || cardRecipient) && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 15 }}
                  className="bg-[#FAF9F5] border-2 border-double border-stone-300/80 rounded-2xl p-6 shadow-md text-stone-800"
                >
                  <p className="text-[10px] font-sans font-bold text-stone-400 uppercase tracking-widest text-center mb-4 border-b border-stone-200/60 pb-2">
                    Каллиграфия (Эскиз открытки)
                  </p>
                  <div className="font-serif italic space-y-4 text-sm px-3 text-stone-700/90 leading-relaxed min-h-[100px] flex flex-col justify-between">
                    {cardRecipient && (
                      <p className="text-left font-bold text-stone-900">Дорогой(ая) {cardRecipient},</p>
                    )}
                    <p className="text-center font-serif text-stone-800 my-2 whitespace-pre-wrap">
                      {cardText || 'Ваше нежное пожелание будет аккуратно выведено пером каллиграфа здесь...'}
                    </p>
                    {cardSender && (
                      <p className="text-right text-stone-900 font-bold pr-4">С искренними чувствами, {cardSender}</p>
                    )}
                  </div>
                  <div className="h-0.5 w-8 bg-amber-600/30 mx-auto mt-6" />
                </motion.div>
              )}
            </AnimatePresence>

          </div>

        </div>

      </div>
    </section>
  );
}

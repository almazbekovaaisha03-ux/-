import React, { useState } from 'react';
import { CURATED_BOUQUETS } from '../data';
import { Bouquet } from '../types';
import { ShoppingBag, Sparkles, Check, Info } from 'lucide-react';
import { motion } from 'motion/react';

interface CollectionProps {
  onSelectBouquet: (bouquet: Bouquet) => void;
}

export default function Collection({ onSelectBouquet }: CollectionProps) {
  const [selectedTag, setSelectedTag] = useState<string>('Все');
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // Extract all unique tags
  const allTags = ['Все', ...Array.from(new Set(CURATED_BOUQUETS.flatMap(b => b.tags)))];

  const filteredBouquets = selectedTag === 'Все'
    ? CURATED_BOUQUETS
    : CURATED_BOUQUETS.filter(b => b.tags.includes(selectedTag));

  // Link our b3 (Ала-Тоо Величие) to our beautiful generated image
  const getBouquetImage = (bouquet: Bouquet) => {
    if (bouquet.id === 'b3') {
      return '/src/assets/images/luxury_bouquet_box_1782984477247.jpg';
    }
    return bouquet.image;
  };

  return (
    <section id="collection-section" className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs tracking-widest uppercase text-amber-700 font-sans font-semibold flex items-center justify-center gap-2">
            <Sparkles className="w-3.5 h-3.5" />
            Эксклюзивная подборка
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 mt-3">
            Авторские Букеты Flora Flowers
          </h2>
          <div className="h-0.5 w-16 bg-stone-900 mx-auto my-5" />
          <p className="text-stone-600 font-sans text-sm leading-relaxed">
            Каждая композиция — это уникальная история, рассказанная языком живых цветов. Наши шеф-флористы отбирают лучшие бутоны, прибывающие напрямую от производителей, и оформляют их в фирменном стиле.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`font-sans text-xs font-semibold px-5 py-2.5 rounded-full border transition-all cursor-pointer ${
                selectedTag === tag
                  ? 'bg-stone-900 text-white border-stone-900 shadow-sm'
                  : 'bg-stone-50 text-stone-600 border-stone-200 hover:bg-stone-100 hover:text-stone-900'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Bouquets Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {filteredBouquets.map((bouquet) => {
            const isHovered = hoveredId === bouquet.id;

            return (
              <motion.div
                key={bouquet.id}
                className="group flex flex-col h-full bg-stone-50/50 rounded-2xl overflow-hidden border border-stone-100 hover:border-stone-200 hover:shadow-xl transition-all duration-300"
                onMouseEnter={() => setHoveredId(bouquet.id)}
                onMouseLeave={() => setHoveredId(null)}
                layout
              >
                {/* Image & Tags Overlay */}
                <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
                  <img
                    src={getBouquetImage(bouquet)}
                    alt={bouquet.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Tags */}
                  <div className="absolute top-4 left-4 flex flex-wrap gap-1.5 z-10">
                    {bouquet.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-white/90 backdrop-blur-sm text-stone-800 text-[10px] font-sans font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm border border-stone-100"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Glassy composition quick-info on hover */}
                  <div
                    className={`absolute inset-0 bg-stone-950/70 backdrop-blur-xs flex flex-col justify-end p-6 transition-all duration-300 ${
                      isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'
                    }`}
                  >
                    <p className="text-amber-400 text-xs font-sans font-bold uppercase tracking-widest mb-1">
                      Состав букета:
                    </p>
                    <p className="text-white font-sans text-xs leading-relaxed">
                      {bouquet.flowersList}
                    </p>
                  </div>
                </div>

                {/* Body Details */}
                <div className="flex flex-col flex-grow p-6">
                  <div className="flex justify-between items-start gap-4 mb-2">
                    <h3 className="font-serif text-lg font-bold text-stone-900 group-hover:text-amber-800 transition-colors">
                      {bouquet.name}
                    </h3>
                    <div className="text-right">
                      <p className="font-serif text-lg font-bold text-stone-900 leading-none">
                        {bouquet.priceKGS.toLocaleString('ru-RU')} сом
                      </p>
                      <p className="text-[10px] text-stone-400 font-sans mt-1">Доставка бесплатно</p>
                    </div>
                  </div>

                  <p className="text-stone-600 font-sans text-xs leading-relaxed flex-grow mb-6">
                    {bouquet.description}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-stone-100/80">
                    <span className="inline-flex items-center text-[10px] text-stone-400 font-sans font-medium gap-1">
                      <Info className="w-3.5 h-3.5 text-stone-300" />
                      Люкс-упаковка включена
                    </span>
                    <button
                      onClick={() => onSelectBouquet(bouquet)}
                      className="bg-stone-900 hover:bg-stone-800 text-white text-xs font-sans font-semibold px-4 py-2.5 rounded-full flex items-center space-x-1.5 shadow-sm transition-all"
                      id={`order_btn_${bouquet.id}`}
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Заказать</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

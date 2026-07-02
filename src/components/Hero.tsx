import React from 'react';
import { Sparkles, Compass, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';

interface HeroProps {
  onScrollToCollection: () => void;
  onScrollToConfigurator: () => void;
}

export default function Hero({ onScrollToCollection, onScrollToConfigurator }: HeroProps) {
  // Use the exact generated image path
  const bannerImage = '/src/assets/images/luxury_flower_banner_1782984500094.jpg';

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-stone-50 via-white to-stone-50/50 py-12 md:py-20 lg:py-24 border-b border-stone-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Text Content */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center space-x-2 bg-stone-100 text-stone-800 px-3 py-1.5 rounded-full text-xs font-sans font-medium tracking-wide w-fit"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Премиальная флористика в г. Балыкчы</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-4"
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-stone-900 tracking-tight leading-[1.1]">
                Цветочное искусство <br />
                <span className="text-stone-500 italic font-normal text-3xl sm:text-4xl lg:text-5xl block mt-2">
                  на берегах Иссык-Куля
                </span>
              </h1>
              <p className="text-stone-600 font-sans text-sm sm:text-base max-w-xl leading-relaxed">
                Добро пожаловать в <strong className="text-stone-800 font-semibold">Flora Flowers</strong> — главный салон премиум-класса в Балыкчы. Мы создаем не просто букеты, а роскошные цветочные послания из редчайших сортов роз, пионов и гортензий. Каждая композиция собирается дипломированными флористами и доставляется в специальных аква-боксах для идеальной свежести.
              </p>
            </motion.div>

            {/* Quick value props */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans font-medium text-stone-700"
            >
              <div className="flex items-center space-x-3 p-3 bg-white/60 backdrop-blur-sm rounded-xl border border-stone-100 shadow-sm">
                <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                  ✓
                </div>
                <div>
                  <p className="text-stone-900 font-semibold">100% Свежесть Цветов</p>
                  <p className="text-[10px] text-stone-500">Поставки каждые 3 дня самолетом</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-3 bg-white/60 backdrop-blur-sm rounded-xl border border-stone-100 shadow-sm">
                <div className="w-8 h-8 rounded-full bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
                  ★
                </div>
                <div>
                  <p className="text-stone-900 font-semibold">Доставка-Люкс по области</p>
                  <p className="text-[10px] text-stone-500">От Балыкчы до Чолпон-Аты и Тамчы</p>
                </div>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2"
            >
              <button
                onClick={onScrollToCollection}
                className="bg-stone-900 hover:bg-stone-800 text-white font-sans text-sm font-medium py-4 px-8 rounded-full shadow-lg shadow-stone-950/15 hover:shadow-xl hover:shadow-stone-950/20 transition-all text-center"
                id="hero_collection_btn"
              >
                Посмотреть Коллекцию
              </button>
              <button
                onClick={onScrollToConfigurator}
                className="bg-white hover:bg-stone-50 text-stone-800 font-sans text-sm font-medium py-4 px-8 rounded-full border border-stone-200 hover:border-stone-300 shadow-sm transition-all text-center flex items-center justify-center gap-2"
                id="hero_custom_btn"
              >
                <Compass className="w-4 h-4 text-stone-500" />
                Собрать свой Букет
              </button>
            </motion.div>
          </div>

          {/* Luxury Banner Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="lg:col-span-5 relative"
          >
            {/* Visual accent circles */}
            <div className="absolute -top-12 -left-12 w-64 h-64 rounded-full bg-stone-100/60 blur-3xl -z-10" />
            <div className="absolute -bottom-12 -right-12 w-64 h-64 rounded-full bg-amber-50/60 blur-3xl -z-10" />
            
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-stone-100 bg-stone-100">
              <img
                src={bannerImage}
                alt="Премиальная флористика в Балыкчы"
                referrerPolicy="no-referrer"
                className="w-full h-[320px] sm:h-[400px] lg:h-[480px] object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/40 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                  <p className="font-serif text-lg font-semibold tracking-wide">
                    «Flora Flowers»
                  </p>
                  <p className="text-xs text-stone-200 font-sans mt-1">
                    Эстетика, гармония и чистая красота для ваших близких в самом сердце Иссык-Куля.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

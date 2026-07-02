import React, { useState } from 'react';
import { CARE_GUIDELINES } from '../data';
import { Heart, Droplet, Wind, Sun, Award } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function CareGuide() {
  const [activeTab, setActiveTab] = useState<number>(0);

  const getIcon = (index: number) => {
    switch (index) {
      case 0: return <Droplet className="w-4 h-4" />;
      case 1: return <Award className="w-4 h-4" />;
      case 2: return <Wind className="w-4 h-4" />;
      case 3: return <Heart className="w-4 h-4" />;
      default: return <Sun className="w-4 h-4" />;
    }
  };

  return (
    <section id="care-section" className="py-16 md:py-24 bg-stone-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Magazine style cover */}
          <div className="lg:col-span-5 bg-gradient-to-tr from-stone-900 to-stone-850 text-white rounded-3xl p-8 shadow-2xl relative overflow-hidden min-h-[400px] flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-48 h-48 bg-stone-800 rounded-full blur-2xl" />
            
            <div className="space-y-4 relative z-10">
              <span className="text-[10px] tracking-widest uppercase text-amber-400 font-sans font-bold bg-white/10 px-3 py-1 rounded-full w-fit">
                Рекомендации флористов
              </span>
              <h3 className="font-serif text-3xl font-bold leading-tight">
                Руководство по уходу за живым шедевром
              </h3>
              <p className="text-stone-300 font-sans text-xs leading-relaxed max-w-sm">
                Мы хотим, чтобы наши букеты радовали вас как можно дольше на берегу синего Иссык-Куля. Прочитайте эти простые, но важные секреты правильного ухода.
              </p>
            </div>

            <div className="relative z-10 border-t border-stone-800 pt-6 mt-12 flex items-center space-x-3.5">
              <div className="w-10 h-10 rounded-full bg-amber-400 flex items-center justify-center text-stone-950 font-bold font-serif text-base shadow-lg shadow-amber-400/20">
                F
              </div>
              <div className="font-sans text-xs">
                <p className="text-white font-semibold">Flora Flowers</p>
                <p className="text-stone-400">С заботой о каждом лепестке</p>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Tabs */}
          <div className="lg:col-span-7 space-y-6">
            <h4 className="font-serif text-xl font-bold text-stone-900">
              Интерактивная инструкция свежести
            </h4>

            {/* Vertical or Horizontal Tabs */}
            <div className="flex flex-wrap gap-2 pb-2">
              {CARE_GUIDELINES.map((guideline, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTab(index)}
                  className={`flex items-center space-x-1.5 px-4 py-2.5 rounded-full border text-xs font-sans font-semibold transition-all cursor-pointer ${
                    activeTab === index
                      ? 'bg-stone-900 text-white border-stone-900 shadow-sm'
                      : 'bg-white text-stone-600 border-stone-200 hover:bg-stone-100 hover:text-stone-900'
                  }`}
                >
                  {getIcon(index)}
                  <span>{guideline.title}</span>
                </button>
              ))}
            </div>

            {/* Content card */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-100 shadow-sm min-h-[200px] flex flex-col justify-between">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-4"
                >
                  <div className="flex items-center space-x-2 text-amber-800">
                    {getIcon(activeTab)}
                    <h5 className="font-sans text-sm font-bold uppercase tracking-wider">
                      {CARE_GUIDELINES[activeTab].title}
                    </h5>
                  </div>
                  <p className="text-stone-700 font-sans text-sm leading-relaxed">
                    {CARE_GUIDELINES[activeTab].text}
                  </p>
                </motion.div>
              </AnimatePresence>

              <div className="mt-8 pt-4 border-t border-stone-50 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="text-[11px] text-stone-500 font-sans leading-relaxed">
                  Букет поставляется в комплекте с профессиональным средством <strong className="text-stone-800 font-semibold">Chrysal</strong> и фирменной инструкцией.
                </div>
                <button
                  onClick={() => {
                    const el = document.getElementById('collection-section');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="text-stone-900 hover:text-amber-800 font-sans text-xs font-bold shrink-0 underline decoration-amber-500/40 hover:decoration-amber-500 transition-all text-left"
                >
                  Выбрать свежий букет →
                </button>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

import React, { useState, useEffect } from 'react';
import { Bouquet, CustomBouquet, OrderDetails, DeliveryLocation } from '../types';
import { DELIVERY_LOCATIONS, FLOWER_TYPES, WRAPPING_STYLES } from '../data';
import { X, Calendar, MapPin, Phone, User, MessageSquare, Receipt, CheckCircle, Sparkles, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedBouquet: Bouquet | null;
  customBouquet: CustomBouquet | null;
  basePrice: number;
}

export default function OrderModal({ isOpen, onClose, selectedBouquet, customBouquet, basePrice }: OrderModalProps) {
  // Order Form State
  const [senderName, setSenderName] = useState('');
  const [senderPhone, setSenderPhone] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [recipientPhone, setRecipientPhone] = useState('');
  const [deliveryLocationId, setDeliveryLocationId] = useState('l1'); // Balykchy Center default
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [deliveryTime, setDeliveryTime] = useState('С 09:00 до 12:00 (Утро)');
  const [cardText, setCardText] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'card' | 'elsom'>('cash');
  const [shippingMethod, setShippingMethod] = useState<'delivery' | 'pickup'>('delivery');

  // Success State
  const [isOrdered, setIsOrdered] = useState(false);
  const [orderId, setOrderId] = useState('');

  // Sync state if custom bouquet was configured
  useEffect(() => {
    if (customBouquet) {
      setCardText(customBouquet.cardText || '');
      setSenderName(customBouquet.cardSender || '');
      setRecipientName(customBouquet.cardRecipient || '');
    } else {
      setCardText('');
      setSenderName('');
      setRecipientName('');
    }
    setIsOrdered(false);
  }, [customBouquet, isOpen]);

  if (!isOpen) return null;

  const selectedLocation = DELIVERY_LOCATIONS.find(l => l.id === deliveryLocationId) || DELIVERY_LOCATIONS[0];
  const deliveryPrice = shippingMethod === 'pickup' ? 0 : selectedLocation.priceKGS;
  const totalPrice = basePrice + deliveryPrice;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (!senderName || !senderPhone || !deliveryDate || (shippingMethod === 'delivery' && (!recipientName || !recipientPhone || !deliveryAddress))) {
      alert('Пожалуйста, заполните все обязательные поля.');
      return;
    }

    const uniqueOrderId = `FLORA-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderId(uniqueOrderId);

    // Build items description
    let itemsSummary = '';
    if (selectedBouquet) {
      itemsSummary = `Букет "${selectedBouquet.name}"`;
    } else if (customBouquet) {
      const stems = customBouquet.flowers
        .map(f => {
          const matched = FLOWER_TYPES.find(item => item.id === f.flowerId);
          return matched ? `${matched.name} (${f.count} шт)` : '';
        })
        .filter(Boolean)
        .join(', ');
      
      const wrap = WRAPPING_STYLES.find(w => w.id === customBouquet.wrappingId)?.name || 'Без упаковки';
      itemsSummary = `Индивидуальный букет (${stems}). Упаковка: ${wrap}. Лента: ${customBouquet.ribbonColor}`;
    }

    // Build payment method name
    const paymentLabel = paymentMethod === 'cash'
      ? 'Наличными при получении / курьеру'
      : paymentMethod === 'card'
      ? 'Картой онлайн (М-Банк / Элкарт / О!Деньги)'
      : 'Элсом (Elsom)';

    const finalRecipientName = shippingMethod === 'pickup' ? (recipientName || senderName || 'Самовывоз') : recipientName;
    const finalRecipientPhone = shippingMethod === 'pickup' ? (recipientPhone || senderPhone) : recipientPhone;
    const finalDeliveryAddress = shippingMethod === 'pickup' ? 'Самовывоз из салона (ул. Аманбаева, 128)' : deliveryAddress;

    // Build the WhatsApp message
    const message = `🌸 *НОВЫЙ ЗАКАЗ В FLORA FLOWERS* 🌸\n` +
      `---------------------------------\n` +
      `*Номер заказа*: ${uniqueOrderId}\n` +
      `*Товар*: ${itemsSummary}\n` +
      `---------------------------------\n` +
      `*Способ получения*: ${shippingMethod === 'pickup' ? 'Самовывоз из салона (ул. Аманбаева, 128)' : 'Доставка курьером'}\n` +
      `*Отправитель*: ${senderName} (${senderPhone})\n` +
      (shippingMethod === 'delivery' ? `*Получатель*: ${finalRecipientName} (${finalRecipientPhone})\n` : '') +
      `---------------------------------\n` +
      `*Адрес*: ${shippingMethod === 'pickup' ? 'ул. Аманбаева, 128' : `${selectedLocation.name}, ${finalDeliveryAddress}`}\n` +
      `*Дата ${shippingMethod === 'pickup' ? 'забора' : 'доставки'}*: ${deliveryDate} (${deliveryTime})\n` +
      `*Текст открытки*: ${cardText ? `"${cardText}"` : 'Без открытки'}\n` +
      `*Оплата*: ${paymentLabel}\n` +
      `---------------------------------\n` +
      `*Сумма букета*: ${basePrice} сом\n` +
      (shippingMethod === 'delivery' ? `*Доставка*: ${deliveryPrice === 0 ? 'Бесплатно' : `${deliveryPrice} сом`}\n` : '') +
      `*ИТОГО К ОПЛАТЕ*: *${totalPrice} сом*`;

    // WhatsApp Click link
    const whatsappLink = `https://wa.me/996509151602?text=${encodeURIComponent(message)}`;

    // Set success screen, then allow them to open WhatsApp
    setIsOrdered(true);
    
    // Store in LocalStorage for persistence
    const localOrder: OrderDetails = {
      id: uniqueOrderId,
      itemsSummary,
      isCustom: !!customBouquet,
      basePrice,
      deliveryPrice,
      totalPrice,
      senderName,
      senderPhone,
      recipientName: finalRecipientName,
      recipientPhone: finalRecipientPhone,
      deliveryLocationId: shippingMethod === 'pickup' ? 'pickup' : deliveryLocationId,
      deliveryAddress: finalDeliveryAddress,
      deliveryDate,
      deliveryTime,
      cardText,
      paymentMethod
    };
    
    localStorage.setItem('flora_latest_order', JSON.stringify(localOrder));
    
    // Smooth scroll inside modal if needed, or simply let the layout handle it
    window.open(whatsappLink, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative bg-white rounded-3xl w-full max-w-2xl shadow-2xl border border-stone-100 overflow-hidden my-8"
        id="order-modal-container"
      >
        {/* Header bar */}
        <div className="bg-stone-900 text-white px-6 py-5 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Receipt className="w-5 h-5 text-amber-400" />
            <h3 className="font-serif text-lg font-bold tracking-wide">
              {isOrdered ? 'Заказ Успешно Сформирован!' : 'Оформление Премиум-Заказа'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-stone-400 hover:text-white p-1 rounded-full transition-colors cursor-pointer"
            id="close_modal_btn"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Success Screen */}
        {isOrdered ? (
          <div className="p-8 text-center space-y-6">
            <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-md">
              <CheckCircle className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <h4 className="font-serif text-2xl font-bold text-stone-900">Спасибо за ваш заказ!</h4>
              <p className="text-stone-500 font-sans text-xs">
                Заказ <span className="font-bold text-stone-800">{orderId}</span> зарегистрирован.
              </p>
            </div>

            <div className="bg-stone-50 p-6 rounded-2xl border border-stone-100 max-w-md mx-auto text-left space-y-3 font-sans text-xs text-stone-700">
              <p className="font-bold text-stone-900 text-sm border-b border-stone-200 pb-2 mb-1">
                Квитанция заказа
              </p>
              <div className="flex justify-between">
                <span>Букет:</span>
                <span className="font-semibold text-stone-900 text-right max-w-[200px] truncate">
                  {selectedBouquet ? selectedBouquet.name : 'Индивидуальный'}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Получатель:</span>
                <span className="font-semibold text-stone-900">{recipientName}</span>
              </div>
              <div className="flex justify-between">
                <span>Адрес доставки:</span>
                <span className="font-semibold text-stone-900">{selectedLocation.name}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-stone-200 text-sm font-extrabold text-stone-900">
                <span>Итого:</span>
                <span className="text-amber-800">{totalPrice} сом</span>
              </div>
            </div>

            <div className="space-y-4 max-w-md mx-auto">
              <div className="flex items-start gap-2.5 bg-amber-50 p-3.5 rounded-xl text-left text-amber-900 text-[11px] leading-relaxed border border-amber-200">
                <AlertCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                <p>
                  Мы автоматически открыли чат с нашим флористом в <strong className="font-semibold">WhatsApp</strong> для подтверждения оплаты и отправки фотоотчета. Если вкладка не открылась, нажмите на кнопку ниже.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  onClick={onClose}
                  className="flex-1 bg-stone-100 hover:bg-stone-200 text-stone-800 font-sans text-xs font-semibold py-3.5 rounded-full transition-all"
                >
                  Вернуться на сайт
                </button>
                <a
                  href={`https://wa.me/996509151602?text=${encodeURIComponent(
                    `Добрый день! Я оформил заказ ${orderId} на сайте. Итоговая сумма: ${totalPrice} сом.`
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-sans text-xs font-bold py-3.5 rounded-full flex items-center justify-center space-x-2 shadow-md hover:shadow-lg transition-all"
                >
                  <span>Написать в WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        ) : (
          /* Form Content */
          <form onSubmit={handlePlaceOrder} className="p-6 overflow-y-auto max-h-[75vh] space-y-6">
            
            {/* Delivery vs Pickup Selector */}
            <div className="bg-stone-50 p-1.5 rounded-2xl border border-stone-200/60 flex max-w-md mx-auto">
              <button
                type="button"
                onClick={() => setShippingMethod('delivery')}
                className={`flex-1 py-3 px-4 rounded-xl text-xs font-sans font-bold transition-all cursor-pointer ${
                  shippingMethod === 'delivery'
                    ? 'bg-stone-900 text-white shadow-md'
                    : 'text-stone-500 hover:text-stone-800'
                }`}
              >
                🚚 Доставка курьером
              </button>
              <button
                type="button"
                onClick={() => setShippingMethod('pickup')}
                className={`flex-1 py-3 px-4 rounded-xl text-xs font-sans font-bold transition-all cursor-pointer ${
                  shippingMethod === 'pickup'
                    ? 'bg-stone-900 text-white shadow-md'
                    : 'text-stone-500 hover:text-stone-800'
                }`}
              >
                🏪 Самовывоз из салона
              </button>
            </div>

            {/* Split Form Columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Left Column: Client Data */}
              <div className="space-y-4">
                <p className="text-xs font-sans font-bold uppercase tracking-widest text-amber-800 border-b border-stone-100 pb-1 flex items-center gap-1">
                  <User className="w-3.5 h-3.5" />
                  Контакты
                </p>

                <div>
                  <label className="block text-[10px] font-sans font-bold text-stone-500 uppercase tracking-wider mb-1">
                    Ваше имя (Отправитель) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    placeholder="Например: Алишер"
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-xs font-sans focus:outline-none focus:border-stone-400"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-sans font-bold text-stone-500 uppercase tracking-wider mb-1">
                    Ваш телефон <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={senderPhone}
                    onChange={(e) => setSenderPhone(e.target.value)}
                    placeholder="+996 (509) 151-602"
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-xs font-sans focus:outline-none focus:border-stone-400"
                  />
                </div>

                <div className="pt-2">
                  <label className="block text-[10px] font-sans font-bold text-stone-500 uppercase tracking-wider mb-1">
                    Имя получателя букета {shippingMethod === 'delivery' && <span className="text-red-500">*</span>}
                  </label>
                  <input
                    type="text"
                    required={shippingMethod === 'delivery'}
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                    placeholder="Например: Аида (или «Анонимно»)"
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-xs font-sans focus:outline-none focus:border-stone-400"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-sans font-bold text-stone-500 uppercase tracking-wider mb-1">
                    Телефон получателя {shippingMethod === 'delivery' && <span className="text-red-500">*</span>}
                  </label>
                  <input
                    type="tel"
                    required={shippingMethod === 'delivery'}
                    value={recipientPhone}
                    onChange={(e) => setRecipientPhone(e.target.value)}
                    placeholder="+996 (701) 999-999"
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-xs font-sans focus:outline-none focus:border-stone-400"
                  />
                </div>
              </div>

              {/* Right Column: Delivery/Pickup Details */}
              <div className="space-y-4">
                <p className="text-xs font-sans font-bold uppercase tracking-widest text-amber-800 border-b border-stone-100 pb-1 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  {shippingMethod === 'pickup' ? 'Адрес и Время Забора' : 'Адрес и Время Доставки'}
                </p>

                {shippingMethod === 'pickup' ? (
                  <div className="bg-amber-50/50 rounded-2xl border border-amber-100 p-5 space-y-3 text-xs font-sans text-stone-800">
                    <div className="space-y-0.5">
                      <p className="font-bold text-amber-900 uppercase tracking-wider text-[10px]">Адрес для самовывоза:</p>
                      <a
                        href="https://2gis.kg/search/%D0%91%D0%B0%D0%BB%D1%8B%D0%BA%D1%87%D1%8B%20%D0%B0%D0%BC%D0%B0%D0%BD%D0%B1%D0%B0%D0%B5%D0%B2%D0%B0%20128"
                        target="_blank"
                        rel="noreferrer"
                        className="font-bold text-stone-900 underline decoration-stone-300 hover:text-amber-800 hover:decoration-amber-800 transition-colors block cursor-pointer"
                        title="Показать на 2ГИС"
                      >
                        ул. Аманбаева, 128, г. Балыкчы (2ГИС)
                      </a>
                      <p className="text-[11px] text-stone-600">Премиум салон Flora Flowers.</p>
                    </div>
                    <div className="space-y-0.5">
                      <p className="font-bold text-stone-900">Часы работы:</p>
                      <p className="text-[11px] text-stone-600">Ежедневно с <strong className="font-semibold">10:00 до 23:00</strong> без выходных.</p>
                    </div>
                    <div className="pt-1 border-t border-amber-100/60">
                      <p className="text-[10px] text-amber-800 italic">Пожалуйста, укажите дату и время вашего прихода ниже, чтобы мы подготовили и охладили букет.</p>
                    </div>
                  </div>
                ) : (
                  <>
                    <div>
                      <label className="block text-[10px] font-sans font-bold text-stone-500 uppercase tracking-wider mb-1">
                        Область / Зона Доставки <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={deliveryLocationId}
                        onChange={(e) => setDeliveryLocationId(e.target.value)}
                        className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-xs font-sans font-medium text-stone-900 focus:outline-none focus:border-stone-400 cursor-pointer"
                      >
                        {DELIVERY_LOCATIONS.map((loc) => (
                          <option key={loc.id} value={loc.id}>
                            {loc.name} {loc.priceKGS === 0 ? '(Бесплатно)' : `(+ ${loc.priceKGS} сом)`}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] font-sans font-bold text-stone-500 uppercase tracking-wider mb-1">
                        Точный адрес доставки <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={deliveryAddress}
                        onChange={(e) => setDeliveryAddress(e.target.value)}
                        placeholder="Улица, дом, квартира / название отеля / номер причала"
                        className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-xs font-sans focus:outline-none focus:border-stone-400"
                      />
                    </div>
                  </>
                )}

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-sans font-bold text-stone-500 uppercase tracking-wider mb-1">
                      Дата {shippingMethod === 'pickup' ? 'визита' : 'доставки'} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      required
                      value={deliveryDate}
                      onChange={(e) => setDeliveryDate(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2.5 text-xs font-sans focus:outline-none focus:border-stone-400 cursor-pointer"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-sans font-bold text-stone-500 uppercase tracking-wider mb-1">
                      Время {shippingMethod === 'pickup' ? 'визита' : 'доставки'} <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={deliveryTime}
                      onChange={(e) => setDeliveryTime(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2.5 text-xs font-sans focus:outline-none focus:border-stone-400 cursor-pointer"
                    >
                      <option value="С 10:00 до 13:00 (Утро)">С 10:00 до 13:00 (Утро)</option>
                      <option value="С 13:00 до 16:00 (День)">С 13:00 до 16:00 (День)</option>
                      <option value="С 16:00 до 19:00 (Вечер)">С 16:00 до 19:00 (Вечер)</option>
                      <option value="С 19:00 до 23:00 (Поздний вечер)">С 19:00 до 23:00</option>
                      {shippingMethod === 'delivery' && (
                        <option value="По звонку (Флорист согласует с получателем)">По звонку получателю</option>
                      )}
                    </select>
                  </div>
                </div>
              </div>

            </div>

            {/* Middle: Gift Card (Editable for both curated and custom) */}
            <div className="space-y-3 pt-2">
              <p className="text-xs font-sans font-bold uppercase tracking-widest text-amber-800 border-b border-stone-100 pb-1 flex items-center gap-1">
                <MessageSquare className="w-3.5 h-3.5" />
                Текст поздравительной открытки
              </p>
              <textarea
                rows={2}
                value={cardText}
                onChange={(e) => setCardText(e.target.value)}
                placeholder="Если хотите прикрепить бесплатную открытку, напишите пожелание здесь (до 200 символов)..."
                className="w-full bg-stone-50 border border-stone-200 rounded-xl p-4 text-xs font-sans focus:outline-none focus:border-stone-400 resize-none"
                maxLength={200}
              />
            </div>

            {/* Payment Methods */}
            <div className="space-y-3">
              <p className="text-xs font-sans font-bold uppercase tracking-widest text-amber-800 border-b border-stone-100 pb-1">
                Способ Оплаты
              </p>
              <div className="grid grid-cols-3 gap-2.5">
                <label
                  onClick={() => setPaymentMethod('cash')}
                  className={`p-3.5 rounded-xl border text-center cursor-pointer transition-all flex flex-col items-center justify-center space-y-1 ${
                    paymentMethod === 'cash'
                      ? 'bg-stone-900 border-stone-900 text-white'
                      : 'bg-stone-50 border-stone-100 hover:bg-stone-100'
                  }`}
                >
                  <span className="font-sans text-xs font-bold">Наличными</span>
                  <span className={`text-[9px] ${paymentMethod === 'cash' ? 'text-stone-300' : 'text-stone-500'}`}>
                    При получении
                  </span>
                </label>

                <label
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3.5 rounded-xl border text-center cursor-pointer transition-all flex flex-col items-center justify-center space-y-1 ${
                    paymentMethod === 'card'
                      ? 'bg-stone-900 border-stone-900 text-white'
                      : 'bg-stone-50 border-stone-100 hover:bg-stone-100'
                  }`}
                >
                  <span className="font-sans text-xs font-bold">M-Bank / Элкарт</span>
                  <span className={`text-[9px] ${paymentMethod === 'card' ? 'text-stone-300' : 'text-stone-500'}`}>
                    Онлайн перевод
                  </span>
                </label>

                <label
                  onClick={() => setPaymentMethod('elsom')}
                  className={`p-3.5 rounded-xl border text-center cursor-pointer transition-all flex flex-col items-center justify-center space-y-1 ${
                    paymentMethod === 'elsom'
                      ? 'bg-stone-900 border-stone-900 text-white'
                      : 'bg-stone-50 border-stone-100 hover:bg-stone-100'
                  }`}
                >
                  <span className="font-sans text-xs font-bold">Элсом (Elsom)</span>
                  <span className={`text-[9px] ${paymentMethod === 'elsom' ? 'text-stone-300' : 'text-stone-500'}`}>
                    Эл. кошелек
                  </span>
                </label>
              </div>
            </div>

            {/* Bottom calculation display */}
            <div className="pt-6 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-center sm:text-left font-sans">
                <div className="flex justify-center sm:justify-start items-baseline gap-2 text-stone-500 text-xs font-medium">
                  <span>Букет: {basePrice} сом</span>
                  <span>+</span>
                  <span>Доставка ({selectedLocation.name}): {deliveryPrice === 0 ? 'Бесплатно' : `${deliveryPrice} сом`}</span>
                </div>
                <p className="font-serif text-2xl font-black text-stone-900 mt-1">
                  Итого: <span className="text-amber-800">{totalPrice.toLocaleString('ru-RU')} сом</span>
                </p>
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto bg-stone-900 hover:bg-stone-800 text-white font-sans text-xs font-bold px-8 py-4 rounded-full shadow-lg shadow-stone-950/15 flex items-center justify-center gap-2"
                id="submit_modal_btn"
              >
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Заказать в WhatsApp</span>
              </button>
            </div>

          </form>
        )}
      </motion.div>
    </div>
  );
}

'use client';

import { Suspense, useEffect, useState } from 'react';

import { createOrderAction } from '@/server/actions/order.actions';
import { type CreateOrderInput } from '@/types';
import { useRouter, useSearchParams } from 'next/navigation';

interface OrderData {
  name: string;
  phone: string;
  email: string;
  payment: string;
  comment: string;
  userId: string;
  selectedLocation: {id: string, type: "delivery" | "selfPickup"};
  items: OrderItem[];
  useBonuses: boolean;
  bonuses: number;
  totalPrice: number;
}

interface OrderItem {
  productId: string;
  quantity: number;
  price: number;
}

const PaymentForm = () => {
  const searchParams = useSearchParams();
  const [orderData, setOrderData] = useState<null | OrderData>(null);
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();

  console.log(orderData)
  useEffect(() => {
    const data = searchParams.get('data');

    if (data) {
      try {
        const decodedData = JSON.parse(decodeURIComponent(data)) as OrderData;

        // Validate the data structure
        if (
          typeof decodedData === 'object' &&
          decodedData !== null &&
          'name' in decodedData &&
          'phone' in decodedData &&
          'email' in decodedData &&
          'payment' in decodedData &&
          'comment' in decodedData &&
          'userId' in decodedData &&
          'selectedLocation' in decodedData &&
          'useBonuses' in decodedData &&
          'bonuses' in decodedData &&
          'totalPrice' in decodedData &&
          Array.isArray(decodedData.items)
        ) {
          setOrderData(decodedData);
        } else {
          console.error('Invalid order data structure');
        }
      } catch (error) {
        console.error('Error parsing order data:', error);
      }
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    // Здесь будет логика создания заказа после успешной оплаты
    if (!orderData) {
      alert('Ошибка при создании заказа');
      return;
    }
    const order:CreateOrderInput = {
      name: orderData.name,
      phone: orderData.phone,
      email: orderData.email,
      payment: orderData.payment,
      comment: orderData.comment,
      userId: orderData.userId,
      useBonuses: orderData.useBonuses,
      bonuses: orderData.bonuses,
      totalPrice: orderData.totalPrice,
      locationId: orderData.selectedLocation.type === "delivery" ? orderData.selectedLocation.id : null,
      restaurantId: orderData.selectedLocation.type === "selfPickup" ? orderData.selectedLocation.id : null,
      items: orderData.items.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
        price: item.price,
      })),
    }
    const response = await createOrderAction(order)

    if (response.success) {
      router.push('/profile');
    } else {
      alert('Ошибка при создании заказа');
    }
    setIsProcessing(false);
  };

  const formatCardNumber = (value: string) => {
    // Remove all non-digit characters
    const v = value.replace(/\D/g, '');
    
    // If empty, return empty string
    if (!v) {
      return '';
    }
    
    // Format the number with spaces every 4 digits
    const parts = [];

    for (let i = 0; i < v.length; i += 4) {
      parts.push(v.substring(i, i + 4));
    }
    
    return parts.join(' ');
  };
  const formatDate = (value: string) => {
    // Remove all non-digit characters
    const v = value.replace(/\D/g, '');
    
    // If empty, return empty string
    if (!v) {
      return '';
    }
    
    // If length is 1, return as is
    if (v.length === 1) {
      return v;
    }
    
    // If length is 2, return with slash
    if (v.length === 2) {
      return `${v.substring(0, 2)}/`;
    }
    
    // If length is 3 or 4, format as MM/YY
    return `${v.substring(0, 2)}/${v.substring(2, 4)}`;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Безопасная оплата</h1>
          <p className="mt-2 text-gray-600">Завершите покупку безопасно</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Payment Form */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <form className="space-y-6"
              onSubmit={handleSubmit}
            >
              <div>
                <label className="block text-sm font-medium text-gray-700"
                  htmlFor="card-name"
                >
                  Имя владельца карты
                </label>
                <input
                  className="mt-1 block w-full rounded-md border-gray-300 text-black shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  id="card-name"
                  onChange={(e) => setCardName(e.target.value)}
                  placeholder="Иван Иванов"
                  required
                  type="text"
                  value={cardName}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700"
                  htmlFor="card-number"
                >
                  Номер карты
                </label>
                <input
                  className="mt-1 block w-full rounded-md border-gray-300 text-black shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  id="card-number"
                  maxLength={19}
                  onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                  placeholder="1234 5678 9012 3456"
                  required
                  type="text"
                  value={cardNumber}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700"
                    htmlFor="expiry-date"
                  >
                    Срок действия
                  </label>
                  <input
                    className="mt-1 block w-full rounded-md border-gray-300 text-black shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    id="expiry-date"
                    maxLength={5}
                    onChange={(e) => setExpiryDate(formatDate(e.target.value))}
                    placeholder="ММ/ГГ"
                    required
                    type="text"
                    value={expiryDate}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700"
                    htmlFor="cvv"
                  >
                    CVV
                  </label>
                  <input
                    className="mt-1 block w-full rounded-md border-gray-300 text-black shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    id="cvv"
                    maxLength={3}
                    onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').slice(0, 3))}
                    placeholder="123"
                    required
                    type="text"
                    value={cvv}
                  />
                </div>
              </div>

              <button
                className="w-full bg-indigo-600 text-white py-3 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isProcessing}
                type="submit"
              >
                {isProcessing ? 'Обработка...' : 'Оплатить'}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Сводка заказа</h2>
            
            {orderData && (
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-900">Информация о заказе</h3>
                  <p className="text-sm text-gray-600">Имя: {orderData.name}</p>
                  <p className="text-sm text-gray-600">Телефон: {orderData.phone}</p>
                  <p className="text-sm text-gray-600">Email: {orderData.email}</p>
                  {orderData.comment && (
                    <p className="text-sm text-gray-600">Комментарий: {orderData.comment}</p>
                  )}
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between">
                    <span className="text-lg font-semibold text-gray-900">Итого</span>
                    <span className="text-lg font-semibold text-gray-900">₽{orderData.items.reduce((acc, item) => acc + item.quantity * item.price, 0)}</span>
                  </div>
                </div>
              </div>
            )}
            <div className="mt-6 text-sm text-gray-500">
              <p>Данная страница является демонстрацией оплаты</p>
              <p className="mt-1">Пожалуйста не вводите реальные данные</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const MockPaymentPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PaymentForm />
    </Suspense>
  );
};

export default MockPaymentPage;

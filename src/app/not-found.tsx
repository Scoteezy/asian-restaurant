'use client';

import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#181818] flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center">
        <h1 className="text-9xl font-bold text-[#FF2C2C] font-audiowide">404</h1>
        <h2 className="mt-4 text-3xl font-bold text-white">Страница не найдена</h2>
        <p className="mt-2 text-lg text-[#B0B0B0]">
          Извините, мы не можем найти страницу, которую вы ищете.
        </p>
        <div className="mt-6">
          <Link
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-[#FF2C2C] hover:bg-[#FF2C2C]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF2C2C]"
            href="/"
          >
            Вернуться на главную
          </Link>
        </div>
      </div>
    </div>
  );
} 

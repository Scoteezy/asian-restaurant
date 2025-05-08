"use client"
import { Loader2, UserIcon } from "lucide-react";
import React, { useEffect, useState } from "react";

import { getUserAction } from "@/server/actions/user.actions";
import { auth } from "@/server/auth";
import { type User } from "@prisma/client";

import { AuthModal } from "@/components/features/auth";
import { Button } from "@/components/ui/button";

const bonuses = [
  {
    icon: (
      <svg fill="none"
        height="48"
        stroke="#FF2C2C"
        viewBox="0 0 48 48"
        width="48"
      >
        <path d="M24 6v6M24 36v6M6 24h6M36 24h6M12.22 12.22l4.24 4.24M31.54 31.54l4.24 4.24M12.22 35.78l4.24-4.24M31.54 16.46l4.24-4.24"
          strokeLinecap="round"
          strokeWidth="2"
        />
        <circle cx="24"
          cy="24"
          r="8"
          strokeWidth="2"
        />
      </svg>
    ),
    title: "Накопленные бонусы легко использовать",
    desc: "Покажите штрих-код официанту"
  },
  {
    icon: (
      <svg fill="none"
        height="48"
        stroke="#FF2C2C"
        viewBox="0 0 48 48"
        width="48"
      >
        <rect height="24"
          rx="2"
          strokeWidth="2"
          width="32"
          x="8"
          y="12"
        />
        <path d="M16 20h16M16 28h10"
          strokeLinecap="round"
          strokeWidth="2"
        />
      </svg>
    ),
    title: "Бонусы начисляются за все заказы",
    desc: "в ресторане, на доставку и самовывоз в течение 5 дней после оплаты."
  },
  {
    icon: (
      <svg fill="none"
        height="48"
        stroke="#FF2C2C"
        viewBox="0 0 48 48"
        width="48"
      >
        <circle cx="24"
          cy="24"
          r="16"
          strokeWidth="2"
        /><path d="M24 16v8h8"
          strokeLinecap="round"
          strokeWidth="2"
        />
      </svg>
    ),
    title: "Оплата бонусами:",
    desc: "до 50% в ресторане"
  },
  {
    icon: (
      <svg fill="none"
        height="48"
        stroke="#FF2C2C"
        viewBox="0 0 48 48"
        width="48"
      >
        <rect height="24"
          rx="4"
          strokeWidth="2"
          width="24"
          x="12"
          y="12"
        /><path d="M16 32V20a4 4 0 018 0v12"
          strokeWidth="2"
        />
      </svg>
    ),
    title: "Накопленные бонусы с каждого заказа сохраняются 60 дней",
    desc: "Для вашего удобства, мы отправим напоминание о скором окончании их действия."
  },
  {
    icon: (
      <svg fill="none"
        height="48"
        stroke="#FF2C2C"
        viewBox="0 0 48 48"
        width="48"
      >
        <rect height="16"
          rx="2"
          strokeWidth="2"
          width="32"
          x="8"
          y="16"
        />
        <path d="M16 24h16"
          strokeLinecap="round"
          strokeWidth="2"
        />
      </svg>
    ),
    title: "Дополнительные бонусы или скидки",
    desc: "Вы будете получать уведомления о специальных акциях и предложениях"
  }
];

export default function BonusPage() {
  const [user, setUser] = useState<null | User>(null);
  const [loading, setLoading] = useState(true);
  const isAuthenticated = !!user;

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true)
      const user = await getUserAction()

      if (user.success) {
        setUser(user.data);
      }
      setLoading(false)
    };

    void fetchUser();
  }, []);
  return (
    <div className="min-h-screen bg-[#181818] text-white py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-4">Бонусная программа</h1>
          <p className="text-[#B0B0B0] mb-8 max-w-2xl mx-auto">
            Участвуйте в нашей бонусной программе и получайте дополнительные преимущества при каждом заказе
          </p>
          <div className="flex justify-center">
            {loading ? 
              <Button 
                className="bg-[#FF2C2C] hover:bg-[#FF2C2C]/90 text-white px-8"
                size="lg"
              >
                <Loader2 className="animate-spin" />
              </Button> 
              : isAuthenticated ? (
                <Button 
                  className="bg-[#FF2C2C] hover:bg-[#FF2C2C]/90 text-white px-8"
                  onClick={() => {
                    ("/bonus/create");
                  }}
                  size="lg"
                >
                  Копить бонусы
                </Button>
              ) : (
                <AuthModal button={ 
                  <Button 
                    className="bg-[#FF2C2C] hover:bg-[#FF2C2C]/90 text-white px-8"
                
                    size="lg"
                  >
                    Получить бонусную карту
                  </Button>
                }
                />
              )}
          </div>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {bonuses.map((item, idx) => (
            <div className="flex flex-col gap-4 bg-[#181818] rounded-lg p-4 min-h-[160px]"
              key={idx}
            >
              <div className="w-12 h-12">{item.icon}</div>
              <div className="font-semibold text-lg leading-tight">{item.title}</div>
              <div className="text-[#B0B0B0] text-base">{item.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

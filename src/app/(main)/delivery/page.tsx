import React from "react";

const icons = {
  clock: (
    <svg fill="none"
      height="36"
      stroke="#FF2C2C"
      strokeWidth="2"
      viewBox="0 0 36 36"
      width="36"
    ><circle cx="18"
      cy="18"
      r="16"
      /><path d="M18 10v8h6"
      strokeLinecap="round"
    />
    </svg>
  ),
  box: (
    <svg fill="none"
      height="36"
      stroke="#FF2C2C"
      strokeWidth="2"
      viewBox="0 0 36 36"
      width="36"
    ><rect height="16"
        rx="2"
        width="24"
        x="6"
        y="10"
      /><path d="M6 16h24"/>
    </svg>
  ),
  bell: (
    <svg fill="none"
      height="36"
      stroke="#FF2C2C"
      strokeWidth="2"
      viewBox="0 0 36 36"
      width="36"
    ><path d="M18 30a3 3 0 0 0 3-3H15a3 3 0 0 0 3 3zm9-6V15a9 9 0 1 0-18 0v9l-3 3v1h24v-1l-3-3z"/>
    </svg>
  ),
  phone: (
    <svg fill="none"
      height="36"
      stroke="#FF2C2C"
      strokeWidth="2"
      viewBox="0 0 36 36"
      width="36"
    ><path d="M6 9a24 24 0 0 0 21 21l3-3a2 2 0 0 0 0-3l-5-5a2 2 0 0 0-3 0l-2 2a16 16 0 0 1-7-7l2-2a2 2 0 0 0 0-3l-5-5a2 2 0 0 0-3 0l-3 3z"/>
    </svg>
  ),
  location: (
    <svg fill="none"
      height="36"
      stroke="#FF2C2C"
      strokeWidth="2"
      viewBox="0 0 36 36"
      width="36"
    ><circle cx="18"
      cy="15"
      r="7"
      /><path d="M18 28c-6-6-10-10-10-15a10 10 0 1 1 20 0c0 5-4 9-10 15z"/>
    </svg>
  ),
  money: (
    <svg fill="none"
      height="36"
      stroke="#FF2C2C"
      strokeWidth="2"
      viewBox="0 0 36 36"
      width="36"
    ><circle cx="18"
      cy="18"
      r="16"
      /><path d="M18 12v12M12 18h12"/>
    </svg>
  ),
};

export default function DeliveryPage() {
  return (
    <div className="wrapper min-h-[60vh] bg-background text-foreground py-10">
      <h2 className="text-2xl md:text-3xl font-bold mb-8">Доставка и оплата</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="rounded-xl bg-card p-6 flex flex-col items-center text-center">
          <span className="text-lg text-muted-foreground mb-2">Время приготовления</span>
          <span className="text-2xl font-bold">от 30 мин</span>
        </div>
        <div className="rounded-xl bg-card p-6 flex flex-col items-center text-center">
          <span className="text-lg text-muted-foreground mb-2">Бесплатная доставка</span>
          <span className="text-2xl font-bold">от 1200 ₽</span>
        </div>
        <div className="rounded-xl bg-card p-6 flex flex-col items-center text-center">
          <span className="text-lg text-muted-foreground mb-2">Время доставки</span>
          <span className="text-2xl font-bold">от 45 мин</span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <div className="mb-2">{icons.clock}</div>
          <div className="font-bold mb-1">Доставка 45-120 мин</div>
          <div className="text-muted-foreground text-sm">
            Время доставки зависит от вашего адреса. Курьеру предоставляется +-15 минут от крайнего времени. В выходные и праздничные дни ожидание может быть увеличено.
          </div>
        </div>
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <div className="mb-2">{icons.box}</div>
          <div className="font-bold mb-1">Самовывоз от 30 мин.</div>
          <div className="text-muted-foreground text-sm">
            Долго ждать доставку? Вы можете оформить самовывоз и забрать ваш заказ из любого удобного ресторана. На самовывоз скидка 20%
          </div>
        </div>
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <div className="mb-2">{icons.bell}</div>
          <div className="font-bold mb-1">Подтверждение заказа</div>
          <div className="text-muted-foreground text-sm">
            После оформления заказа, с Вами свяжется менеджер в течение 5 минут! Спасибо, что выбираете нас!
          </div>
        </div>
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <div className="mb-2">{icons.phone}</div>
          <div className="font-bold mb-1">+7 (988) 566-03-33</div>
          <div className="text-muted-foreground text-sm">
            Позвоните нам, если нужно изменить заказ, время доставки, узнать статус заказа или отказаться.
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl">
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <div className="mb-2">{icons.clock}</div>
          <div className="font-bold mb-1">Прием заказов</div>
          <div className="text-muted-foreground text-sm">
            Ежедневно: 11:00 - 23:30<br />
            Зорге 66 +7 (988) 566-03-33<br />
            Социалистическая 58 +7 (988) 944-03-33
          </div>
        </div>
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <div className="mb-2">{icons.location}</div>
          <div className="font-bold mb-1">Стоимость</div>
          <div className="text-muted-foreground text-sm">
            Бесплатная от 1200 руб и выше. Для доставки в зоны, которые не указаны звоните по номеру +7 (988) 944-03-33. См. карту &quot;Зоны доставки&quot;.
          </div>
        </div>
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <div className="mb-2">{icons.money}</div>
          <div className="font-bold mb-1">Оплата</div>
          <div className="text-muted-foreground text-sm">
            QR- оплата
          </div>
        </div>
      </div>
    </div>
  );
}

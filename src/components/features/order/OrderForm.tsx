import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const paymentOptions = [
  { value: "card", label: "Картой" },
  { value: "cash", label: "Наличными при получении" },
];

interface OrderFormProps {
  values: {
    name: string;
    phone: string;
    email: string;
    payment: string;
    comment: string;
    useBonuses: boolean;
  };
  onChange: (field: string, value: boolean | string) => void;
  onSubmit: (e: React.FormEvent) => void;
  bonuses: null | number;
}

export const OrderForm = ({ values, onChange, onSubmit, bonuses }: OrderFormProps) => {
  return (
    <form className="flex flex-col gap-3 w-full mt-4"
      onSubmit={onSubmit}
    >
      <div>
        <Label className="text-muted-foreground text-xs mb-1 block"
          htmlFor="name"
        >Имя
        </Label>
        <Input
          className="bg-[#181818] text-white border-none"
          id="name"
          onChange={e => onChange("name", e.target.value)}
          placeholder="Денис Бондаренко"
          value={values.name}
        />
      </div>
      <div className="flex gap-2">
        <div className="flex-1">
          <Label className="text-muted-foreground text-xs mb-1 block"
            htmlFor="phone"
          >Номер телефона
          </Label>
          <Input
            className="bg-[#181818] text-white border-none"
            id="phone"
            onChange={e => onChange("phone", e.target.value)}
            placeholder="+7 (919) 876-88-51"
            value={values.phone}
          />
        </div>
        <div className="flex-1">
          <Label className="text-muted-foreground text-xs mb-1 block"
            htmlFor="email"
          >Электронная почта
          </Label>
          <Input
            className="bg-[#181818] text-white border-none"
            id="email"
            onChange={e => onChange("email", e.target.value)}
            placeholder="scoteeezy@gmail.com"
            value={values.email}
          />
        </div>
      </div>
      <div>
        <Label className="text-muted-foreground text-xs mb-1 block"
          htmlFor="payment"
        >Способ оплаты
        </Label>
        <select
          className="bg-[#181818] text-white border-none rounded-md h-12 px-3 w-full focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          id="payment"
          onChange={e => onChange("payment", e.target.value)}
          value={values.payment}
        >
          <option disabled
            value=""
          >Способ оплаты
          </option>
          {paymentOptions.map(opt => (
            <option key={opt.value}
              value={opt.value}
            >{opt.label}
            </option>
          ))}
        </select>
      </div>
      <div>
        <Label className="text-muted-foreground text-xs mb-1 block"
          htmlFor="comment"
        >Комментарий
        </Label>
        <Textarea
          className="bg-[#181818] text-white border-none"
          id="comment"
          onChange={e => onChange("comment", e.target.value)}
          placeholder="Комментарий"
          value={values.comment}
        />
        
      </div>
      {  bonuses && bonuses > 0 ? (
        <div className="flex items-center space-x-2">
          <input
            checked={values.useBonuses}
            className="w-4 h-4 rounded border-gray-600 bg-[#181818] text-white focus:ring-0 focus:ring-offset-0"
            id="useBonuses"
            onChange={(e) => onChange("useBonuses", e.target.checked)}
            type="checkbox"
          />
          <Label 
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            htmlFor="useBonuses"
          >
            Доступно {bonuses} бонусов, списать все?
          </Label>
        </div>
      ) : <></>}
    </form>
  );
}

import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function LegalPage() {
  return (
    <div className="min-h-[60vh] wrapper bg-background text-foreground ">
      <h2 className="text-2xl md:text-3xl font-bold mb-8">Правовая информация</h2>
      <div className="flex flex-col gap-8 max-w-2xl">
        <Card className="flex items-start gap-4 bg-card p-6">
          <Image alt="doc"
            className="mt-1"
            height={32}
            src="/file.svg"
            width={32}
          />
          <div>
            <div className="text-lg font-semibold mb-1">
              Политика конфиденциальности и обработки персональных данных
            </div>
            <Button asChild
              className="text-red-500 p-0 h-auto text-base"
              variant="link"
            >
              <a href="#"
                rel="noopener noreferrer"
                target="_blank"
              >Просмотр
              </a>
            </Button>
          </div>
        </Card>
        <Card className="flex items-start gap-4 bg-card p-6">
          <Image alt="doc"
            className="mt-1"
            height={32}
            src="/file.svg"
            width={32}
          />
          <div>
            <div className="text-lg font-semibold mb-1">
              Пользовательское соглашение
            </div>
            <Button asChild
              className="text-red-500 p-0 h-auto text-base"
              variant="link"
            >
              <a href="#"
                rel="noopener noreferrer"
                target="_blank"
              >Просмотр
              </a>
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}

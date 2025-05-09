'use client'

import { useEffect, useState } from "react";

import { toast } from "@/hooks/use-toast";
import { getAllCategoriesAction } from "@/server/actions/category.actions";
import { type Category } from "@/types";
import { type User } from "@prisma/client";

import BasketModal from "@/components/features/basket/BasketModal";
import { Input } from "@/components/ui/input";
const links = [
  {
    name: 'Вок',
  },
  {
    name: 'Супы',
  },
  {
    name: 'Салаты',
  },
  {
    name: 'Закуски',
  },
  {
    name: 'Роллы и суши',
  },
  {
    name: 'Десерты',
  },
  {
    name: 'Напитки',
  }
]
const SubHeader = ({user}: {user: null | User}) => {
  const [isTransparent, setIsTransparent] = useState(false);
  const [activeCategory, setActiveCategory] = useState('');

  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await getAllCategoriesAction();

      if (response.success && response.data) {
        setCategories(response.data);
      } else {
        toast({
          title: "Ошибка при получении данных категорий",
          description: "Попробуйте позже",
        })
      }
    }

    void fetchCategories();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveCategory(entry.target.id);
        }
      });
    }, { threshold: 0.5 }); // Элемент считается видимым, когда показано 50% его высоты

    // Наблюдаем за всеми категориями
    links.forEach((link) => {
      const element = document.getElementById(link.name);

      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, []);
  const controlNavbar = () => {
    if (typeof window !== 'undefined') {
      // Если прокрутили больше 70px (высота основного хедера)
      if (window.scrollY > 130) {
        setIsTransparent(true);
      } else {
        setIsTransparent(false);
      }
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', controlNavbar);
      return () => {
        window.removeEventListener('scroll', controlNavbar);
      };
    }
  }, []);
  const scrollToCategory = (id: string) => {
    const element = document.getElementById(id);

    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={`hidden lg:block w-full sticky top-0 z-50 font-sans
      transition-all duration-300
      ${isTransparent ? 'backdrop-blur-md bg-background/60 supports-[backdrop-filter]:bg-background/60 border-b border-border/40' : 'bg-background'}
      `}
    >
      <div className="wrapper flex-between">
        <div className="flex-center text-2xl font-bold text-primary gap-5">
          { categories.map((link) => (
            <button
              className={` hover:text-main transition-all duration-300 text-sm ${activeCategory === link.name ? 'text-main' : 'text-primary'}`}
              key={link.name}
              onClick={() => scrollToCategory(link.name)}
            >
              {link.name}
            </button>
          ))}
        </div>
        {user?.id && (
          <BasketModal />
        )}
      </div>
    </div>
  );
};

export { SubHeader };

import Link from "next/link";

const Footer = () => {
  return (
    <div className="bg-primary mt-auto">
      <div className="wrapper flex flex-col md:flex-row justify-between items-start  w-full">
        <div className="mb-6 md:mb-0 w-full flex items-center self-center h-full">
          <h2 className="text-white  text-6xl font-bold font-logo text-center md:text-left border-b border-white pb-4 md:pb-0 md:border-none font-audiowide">
            <Link className="hover:text-main transition-all duration-300"
              href="/"
            >Nami
              <span >🍜</span>
            </Link>
          </h2>
        </div>
        <div className="w-full md:w-auto flex flex-col md:items-end">
          <p className="text-white text-lg font-bold mb-4 self-start">Навигация</p>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-2 text-gray-200 w-full">
            <li className="hover:text-main transition-all duration-300"><Link href="/bonus">Бонусная программа</Link></li>
            <li className="hover:text-main transition-all duration-300"><Link href="/events">Акции и мероприятия</Link></li>
            <li className="hover:text-main transition-all duration-300"><Link href="/legal">Правовая информация</Link></li>
            <li className="hover:text-main transition-all duration-300"><Link href="/delivery">Доставка и оплата</Link></li>
          </ul>
        </div>
      </div>
    </div>
  )
};

export { Footer };

import Link from "next/link";

const MENU = [
    {
        title: 'Управление',
        url: '/'
    },
    {
        title: 'Удаление',
        url: '/delete'
    },
    {
        title: 'Статистика',
        url: '/stats'
    }
]

export default function Menu() {

  return (
    <div className="flex flex-row gap-[20px] pb-[20px]">
      {MENU.map(menu => (
        <Link key={menu.title} href={menu.url} className="text-blue-600 underline">{menu.title}</Link>
      ))}
    </div>
  );
}

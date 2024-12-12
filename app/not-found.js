import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex justify-center py-40 align-middle sm:px-6 lg:px-8">
      <div className="space-y-4 text-center">
        <div className="text-4xl font-bold text-red-400">Не знайдено</div>
        <p>Такої сторінки не існує</p>
        <Link href="/">Повернутись на головну сторінку</Link>
      </div>
    </div>
  );
}

import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className='flex justify-center align-middle py-40 sm:px-6 lg:px-8'>
        <div className='text-center space-y-4'>
            <div className='text-4xl font-bold text-red-400'>Не знайдено</div>
            <p>Такої сторінки не існує</p>
            <Link href="/">Повернутись на головну сторінку</Link>
        </div>
    </div>
  )
}
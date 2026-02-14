import { createFileRoute } from '@tanstack/react-router'
import { Icon } from '../components/icons'

export const Route = createFileRoute('/drivers')({
  component: RouteComponent,
})

const drivers = Array.from({ length: 15 }, (_, i) => ({ id: i, name: `Водитель ${i + 1}`, trips: i == 0 ? [] : i % 2 === 0 ? [1, 2] : [1] }))

function RouteComponent() {
  const days = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье']
  // Mock drivers for structure visualization


  return (
    <main className="flex-1 flex flex-col bg-gray-100 min-w-0 overflow-hidden relative">
      <div className="flex-1 overflow-auto p-6 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
        <div className=" overflow-hidden flex flex-col h-full">
          <div className="overflow-auto flex-1">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="p-4 text-left text-sm font-normal text-gray-600 w-64 min-w-64 sticky left-0 bg-gray-50 z-20 border-r border-gray-200">
                    Водитель
                  </th>
                  {days.map((day) => (
                    <th
                      key={day}
                      className="p-4 text-center text-sm font-normal text-gray-600 w-[184px] min-w-[184px] border-r border-gray-200 last:border-r-0"
                    >
                      {day}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {drivers.map((driver) => (
                  <tr key={driver.id} className="">
                    <td className="p-4 text-sm font-medium text-gray-900 sticky left-0  z-10 border-r border-gray-200">
                      {driver.name}
                    </td>
                    {days.map((day) => (
                      <td
                        key={day}
                        className="border-r border-gray-200 last:border-r-0 w-[184px] min-w-[184px] h-24 align-top"
                      >
                        <div className="flex flex-col gap-4 px-3 pt-2 pb-6">
                          <span className="text-xs text-gray-600 text-center">6:00 ~ 14:00</span>
                          {driver.trips.length === 2 ? <FullTrip /> : driver.trips.length === 1 ? <ShortTrip /> : <EmptyTrip />}
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  )
}



const FullTrip = () => {
  return (
    <div className='flex flex-col gap-2'>
      <div className='bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow  cursor-pointer'>
        <div className='flex flex-col gap-1 px-3 pt-3 pb-2 border-b border-dashed border-gray-400'>
          <div className='flex gap-1 items-center'>
            <span className='text-base font-medium text-gray-900'>06:00</span>
            <div className='p-0.5 bg-direction-forward-light text-direction-forward'>
              <span className='text-base font-medium'> ➔ СПБ</span>
            </div>
          </div>
          <span className='text-xs text-gray-600'>Форд Кастом о225мс</span>
          <span className='text-base font-medium text-green-600 ml-auto'>6/8</span>
        </div>

        <div className='flex flex-col gap-1 px-3 pt-3 pb-2'>
          <div className='flex gap-1 items-center'>
            <span className='text-base font-medium text-gray-900'>06:00</span>
            <div className='p-0.5 bg-direction-forward-light text-direction-forward'>
              <span className='text-base font-medium'> ➔ СПБ</span>
            </div>
          </div>
          <span className='text-xs text-gray-600'>Форд Кастом о225мс</span>
          <span className='text-base font-medium text-green-600 ml-auto'>6/8</span>
        </div>

      </div>
      <button className='hover:bg-gray-200/50 hover:text-gray-400 transition-colors flex justify-center items-center bg-gray-200/25 rounded-2xl py-2 text-sm font-medium text-gray-300 cursor-pointer'>
        <Icon name="add-circle" className='w-6 h-6' />

      </button>
    </div>
  )
}

const ShortTrip = () => {
  return (
    <div className='flex flex-col gap-2'>
      <div className='bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow  cursor-pointer'>
        <div className='flex flex-col gap-1 px-3 pt-3 pb-2'>
          <div className='flex gap-1 items-center'>
            <span className='text-base font-medium text-gray-900'>06:00</span>
            <div className='p-0.5 bg-direction-forward-light text-direction-forward'>
              <span className='text-base font-medium'> ➔ СПБ</span>
            </div>
          </div>
          <span className='text-xs text-gray-600'>Форд Кастом о225мс</span>
          <span className='text-base font-medium text-green-600 ml-auto'>6/8</span>
        </div>
      </div>

      <div className='w-full rounded-full border border-gray-300 border-dashed py-2 text-sm text-center text-gray-300 cursor-pointer hover:border-gray-400 hover:text-gray-400 transition-colors'>
        <span className=''>10:00 ➔ БОР</span>
      </div>

      <div className='w-full rounded-full border border-gray-300 border-dashed py-2 text-sm text-center text-gray-300 cursor-pointer hover:border-gray-400 hover:text-gray-400 transition-colors'>
        <span className=''>10:00 ➔ БОР</span>
      </div>
      <div className='w-full rounded-full border border-gray-300 border-dashed py-2 text-sm text-center text-gray-300 cursor-pointer hover:border-gray-400 hover:text-gray-400 transition-colors'>
        <span className=''>10:00 ➔ БОР</span>
      </div>
    </div>
  )
}


const EmptyTrip = () => {
  return (
    <div className='flex flex-col gap-2'>
      <div className='w-full rounded-full border border-gray-300 border-dashed py-2 text-sm text-center text-gray-300 cursor-pointer hover:border-gray-400 hover:text-gray-400 transition-colors'>
        <span className=''>10:00 ➔ БОР</span>
      </div>

      <div className='w-full rounded-full border border-gray-300 border-dashed py-2 text-sm text-center text-gray-300 cursor-pointer hover:border-gray-400 hover:text-gray-400 transition-colors'>
        <span className=''>12:00 ➔ БОР</span>
      </div>

      <div className='w-full rounded-full border border-gray-300 border-dashed py-2 text-sm text-center text-gray-300 cursor-pointer hover:border-gray-400 hover:text-gray-400 transition-colors'>
        <span className=''>14:00 ➔ БОР</span>
      </div>

      <div className='w-full rounded-full border border-gray-300 border-dashed py-2 text-sm text-center text-gray-300 cursor-pointer hover:border-gray-400 hover:text-gray-400 transition-colors'>
        <span className=''>16:00 ➔ БОР</span>
      </div>
    </div>
  )
}   

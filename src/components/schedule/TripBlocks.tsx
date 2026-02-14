import { Icon } from '../icons';

export const FullTrip = () => {
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

export const ShortTrip = () => {
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

export const EmptyTrip = () => {
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

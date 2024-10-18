'use client'

import { Fragment, useState } from 'react'
import Clock from 'react-live-clock'
import classNames from 'classnames'
import { useAdminStore } from '@/store/adminStore'
import CreateLesson from './Modals/CreateLesson'

const Planby = () => {
    const { lessons } = useAdminStore()

    const hours = Array.from({ length: 14 }, (_, i) => i + 9)
    const daysOfWeek = ['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi', 'Pazar']

    const [date, setDate] = useState({
        day: daysOfWeek[new Date().getDay() - 1],
        hour: new Date().getHours(),
        minute: new Date().getMinutes()
    })

    const onChangeDate = (value) => {
        const _date = new Date(value)
        setDate({
            day: daysOfWeek[_date.getDay() - 1],
            hour: _date.getHours(),
            minute: _date.getMinutes()
        })
    }

    return (
        <div className='h-[78vh] w-full bg-[#171923] shadow-2xl rounded-[8px] text-center'>
            <div className='p-[5px] h-full w-full'>
                <div
                    id='wrapper'
                    className='h-full w-full flex flex-col relative rounded-[8px] overflow-hidden'
                >
                    <div
                        id='corder-box'
                        className='w-20 h-[100px] absolute top-0 bg-[#171923] z-10 left-0'
                    />
                    <div
                        id='layout'
                        className='relative h-full w-full overflow-auto scroll-smooth bg-[#171923] [scrollbar-width:_thin] [scrollbar-color:_rgb(44,122,123)_rgb(23,25,35)]'
                    >
                        <div
                            id='line'
                            className='absolute bg-[rgb(44,122,123)] pointer-events-none z-[9] left-20 h-1'
                            style={{
                                top: `${hours.findIndex((hour) => hour === date.hour) * 200 + (date.minute / 60) * 200 + 107}px`,
                                width: `${daysOfWeek.length * 200}px`,
                                visibility: hours.includes(date.hour) ? 'visible' : 'hidden'
                            }}
                        />
                        <div
                            id='timeline-wrapper'
                            className='sticky bg-[rgb(23,25,35)] z-[9] left-0 bottom-0 float-left w-20 mt-[100px]'
                        >
                            <div
                                id='current-time'
                                className='absolute left-0 w-20 h-5 bg-[rgb(23,25,35)] z-[2]'
                                style={{
                                    top: `${hours.findIndex((hour) => hour === date.hour) * 200 + (date.minute / 60) * 200}px`,
                                    visibility: hours.includes(date.hour) ? 'visible' : 'hidden'
                                }}
                            >
                                <span
                                    id='current-content'
                                    className='absolute text-[13px] font-medium text-[rgb(53,148,147)] bg-[rgb(23,25,35)] left-1/2 -translate-x-1/2'
                                >
                                    <Clock
                                        locale='Europe/Istanbul'
                                        ticking
                                        onChange={onChangeDate}
                                    />
                                </span>
                            </div>
                            {hours.map((hour, hourIndex) => (
                                <div
                                    key={hour}
                                    className='absolute text-sm bg-[rgb(23,25,35)] h-[200px] w-20'
                                    style={{ top: `${hourIndex * 200}px` }}
                                >
                                    <span className='top-0 absolute text-[#a8aec0] left-1/2 -translate-x-1/2'>{hour}:00</span>
                                    <div className='relative h-full w-full pb-1.5 items-start'>
                                        {Array(4)
                                            .fill(0)
                                            .map((_, dividerIndex) => (
                                                <div
                                                    key={dividerIndex}
                                                    className={classNames('absolute bottom-1.5 bg-[#718096] left-1/2 h-px w-4 -translate-x-1/2', {
                                                        'opacity-0 invisible': dividerIndex === 0
                                                    })}
                                                    style={{ top: `${dividerIndex * 50}px` }}
                                                />
                                            ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div
                            id='channels'
                            className='sticky bg-[rgb-(23,25,35)] top-0 left-20 h-[100px] z-[9]'
                            style={{
                                width: `${daysOfWeek.length * 200}px`
                            }}
                        >
                            {daysOfWeek.map((day, dayIndex) => (
                                <div
                                    key={dayIndex}
                                    className='absolute flex justify-center items-center bg-[rgb(23,25,35)] cursor-default top-0 w-[200px] h-full'
                                    style={{
                                        left: `${dayIndex * 200}px`
                                    }}
                                >
                                    <span className='font-semibold text-lg'>{day}</span>
                                </div>
                            ))}
                        </div>
                        <div
                            id='content'
                            className='relative bg-[rgb(23,25,35)] left-20'
                            style={{
                                width: `${daysOfWeek.length * 200}px`,
                                height: `${hours.length * 200}px`
                            }}
                        >
                            {daysOfWeek.map((day, itemXIndex) => (
                                <Fragment key={itemXIndex}>
                                    {hours.map((hour, itemYIndex) => {
                                        const lesson = lessons.find((lesson) => lesson?.day === day && lesson?.hour === hour)
                                        return (
                                            <CreateLesson
                                                lesson={lesson}
                                                day={day}
                                                hour={hour}
                                                key={itemYIndex}
                                                trigger={
                                                    <div
                                                        className='w-[200px] h-[200px] opacity-1 absolute p-1 z-[1] overflow-hidden'
                                                        style={{
                                                            top: `${itemYIndex * 200}px`,
                                                            left: `${itemXIndex * 200}px`
                                                        }}
                                                    >
                                                        <div
                                                            className={classNames(
                                                                'border border-[rgb(23,25,35)] relative flex text-xs h-full rounded-[8px] py-2.5 px-5 overflow-hidden cursor-pointer transition-all duration-300 ease-in-out z-[1] bg-gradient-to-r',
                                                                {
                                                                    'from-[rgb(26,32,44)] to-[rgb(26,32,44)] hover:from-[rgb(5,25,55)] hover:to-[rgb(0,35,96)]':
                                                                        day !== date.day || hour !== date.hour,
                                                                    'from-[rgb(5,25,55)] to-[rgb(0,35,96)]': day === date.day && hour === date.hour
                                                                }
                                                            )}
                                                        >
                                                            <div className='w-full flex flex-col justify-start gap-2'>
                                                                <div className='overflow-hidden'>
                                                                    <p className='text-sm text-left font-medium text-[rgb(209,209,209)] whitespace-nowrap overflow-hidden text-ellipsis'>
                                                                        {day}
                                                                    </p>
                                                                    <span className='flex items-center text-xs text-[rgb(113,128,150)] text-left whitespace-nowrap overflow-hidden text-ellipsis'>
                                                                        {hour}:00 - {hours[itemYIndex + 1]}:00
                                                                    </span>
                                                                </div>
                                                                <hr />
                                                                {lesson && (
                                                                    <div className='overflow-hidden overflow-y-auto [scrollbar-color:_rgb(44,122,123)_rgb(23,25,35)]'>
                                                                        <p className='text-sm text-left font-medium text-[rgb(209,209,209)] whitespace-nowrap overflow-hidden text-ellipsis'>
                                                                            {lesson.courseType === 'personal' ? 'Özel' : 'Grup'}
                                                                        </p>
                                                                        <span className='flex flex-col items-center text-xs text-[rgb(113,128,150)] '>
                                                                            {lesson.members.map((member) => (
                                                                                <span
                                                                                    key={member._id}
                                                                                    className='text-left whitespace-nowrap overflow-hidden text-ellipsis w-full'
                                                                                >
                                                                                    {member.name}
                                                                                </span>
                                                                            ))}
                                                                        </span>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                }
                                            />
                                        )
                                    })}
                                </Fragment>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Planby

import React, { useEffect, useState } from 'react'

const addDay = (date, days) => {
    return new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate() + days
    )
}

const createMonth = (startDate) => {
    let firstMonthDayPointer = new Date(
        startDate.getFullYear(),
        startDate.getMonth(),
        1
    )

    if (firstMonthDayPointer.getDay() !== 1) {
        while (firstMonthDayPointer.getDay() !== 1) {
            firstMonthDayPointer = addDay(firstMonthDayPointer, -1)
        }
    }

    const month = []
    const endDate = +new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0)
    while (firstMonthDayPointer < endDate) {
        firstMonthDayPointer = addDay(firstMonthDayPointer, 1)
        month.push(firstMonthDayPointer)
    }
    return month
}

export const Calendar = () => {

    const [month, setMonth] = useState([])
    const [monthTable, setMonthTable] = useState([])

    useEffect(() => {
        const generatedMonth = createMonth(new Date(
            new Date().getFullYear(),
            new Date().getMonth() + 4,
            new Date().getDate()
        ))
        setMonth(generatedMonth)

        const _month = [...generatedMonth]
        const _monthTable = []
        for (let i = 0; i < 6; i++) {
            _monthTable.push([])
            for (let j = 0; j < 7; j++) {
                _monthTable[i].push(_month.shift())
            }
        }
        setMonthTable(_monthTable)
    }, [])

    return (
        <table >
            <thead>
                <tr>
                    <th>ПН</th>
                    <th>ВТ</th>
                    <th>СР</th>
                    <th>ЧТ</th>
                    <th>ПТ</th>
                    <th>СБ</th>
                    <th>ВС</th>
                </tr>
            </thead>
            <tbody>
                {!!monthTable.length && monthTable.map((row, idx1) => {
                    return (
                        <tr key={idx1}>
                            {row.map((cell, idx2) => {
                                return (
                                    <td key={idx2}>{cell?.getDate()}</td>
                                )
                            })}
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}

export default Calendar
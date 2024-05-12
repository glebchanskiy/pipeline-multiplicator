// Лабораторная работа 1 по дисциплине МРЗвИС
// Выполнена студентами группы 121703
// БГУИР Леквов Г.А., Кочурка В.В.
// Вариант 16 - алгоритм вычисление произвдения пары 8-разрядных чисел умножением со старших разрядов со сдвигом частичной суммы влево.

import { FunctionalComponent } from "preact"
import { QueueItem, ResultDeatailsItem, toDecimal, toStringBinary } from "../useMultiplicationHook"
import { Signal } from "@preact/signals"




const injectResultTatcCountToResult = (item: QueueItem, resultDetails: ResultDeatailsItem[][]): QueueItem & { tacts: number } => {

    let lastTact = 0
    let i = 0
    for (const tactOperations of resultDetails) {
        for (const operation of tactOperations) {
            if (toStringBinary(operation.sum) === toStringBinary(item.sum)) {
                lastTact = i
            }
        }
        i++
    }

    return {
        ...item,
        tacts: lastTact,
    }
}

export const ResultView: FunctionalComponent<{
    resultDetails: ResultDeatailsItem[][],
    result: QueueItem[]
    hoveredNums: Signal<string>
}> = ({ result, resultDetails, hoveredNums }) => {
    const resultWithTacts = result.map(item => injectResultTatcCountToResult(item, resultDetails))

    return (
        <div class='w-full flex gap-3'>
            <div class='w-full flex flex-col gap-2'>
                <div class='flex flex-col gap-3'>
                    <h2>Details</h2>
                    <div class='flex pr-2 gap-3 border border-1 border-white rounded-sm overflow-hidden font-mono'>
                        <div class={`border-r w-20 px-2 text-left border-r-1 bg-opacity-30`}>action</div>
                        <div class='w-full flex justify-between'>
                            <div class='flex'>
                                operands
                            </div>
                            <div>
                                partial sum
                            </div>
                            <div class='flex '>
                                operands in binary
                            </div>
                        </div>
                    </div>
                    <div class='flex flex-col gap-3'>
                        {resultDetails.filter(r => r.length).map((detailsItem, i) => <>
                            <h3>Tact {i + 1}</h3>
                            <div class='flex flex-col gap-2'>
                                {detailsItem.map(item => <div onMouseLeave={() => hoveredNums.value = ''} onMouseOver={() => hoveredNums.value = item.multipliableDecimal + 'x' + item.multiplierDecimal} class='relative flex pr-2 gap-3 border border-1 border-white rounded-md  font-mono'>
                                    <div style={{ opacity: item.multipliableDecimal + 'x' + item.multiplierDecimal === hoveredNums.value ? 1 : 0 }} class='opacity-0 absolute left-[-40px] transition-all duration-150 ease-in'>{`-->`}</div>
                                    <div class={`border-r w-20 px-2 text-left border-r-1  ${item.operation === 'shift' ? 'bg-orange-500' : 'bg-purple-500'} bg-opacity-30`}>{item.operation}</div>
                                    <div class='w-full flex justify-between'>
                                        <div class='flex'>
                                            <span>{item.multipliableDecimal}</span>
                                            <span>×</span>
                                            <span>{item.multiplierDecimal}</span>
                                        </div>
                                        <div class='flex gap-20'>
                                            <div>
                                                <span>sum:</span>
                                                <span>{toStringBinary(item.sum)}</span>
                                            </div>
                                            <div class='flex '>
                                                <span>{toStringBinary(item.multipliable)}</span>
                                                <span>×</span>
                                                <span>{toStringBinary(item.multiplier)}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>)}
                            </div>
                        </>)}
                    </div>
                </div>

                <div class='flex flex-col gap-3'>
                    <h2>Result:</h2>
                    <div class='flex pr-2 gap-3 border border-1 border-white rounded-sm overflow-hidden font-mono'>
                        <div class={`border-r px-2 text-left border-r-1 bg-opacity-30`}>#</div>
                        <div class='w-full flex justify-between'>
                            <div class='flex'>
                                decimal format
                            </div>
                            <div class='flex gap-44'>
                                <div>
                                    tacts
                                </div>
                                <div class='flex '>
                                    binary format
                                </div>
                            </div>

                        </div>
                    </div>
                    <div class='flex flex-col gap-3'>
                        {resultWithTacts.map((resultItem, i) => <div onMouseLeave={() => hoveredNums.value = ''} onMouseOver={() => hoveredNums.value = resultItem.multipliableDecimal + 'x' + resultItem.multiplierDecimal} class='relative flex pr-2 gap-3 border border-1 border-white rounded-md font-mono'>
                            <div style={{ opacity: resultItem.multipliableDecimal + 'x' + resultItem.multiplierDecimal === hoveredNums.value ? 1 : 0 }} class='opacity-0 absolute left-[-40px] transition-all duration-150 ease-in'>{`-->`}</div>
                            <div class='border-r px-2 border-r-1 bg-primary bg-opacity-30'>{i}</div>
                            <div class='w-full flex justify-between'>
                                <div class='flex'>
                                    <span>{resultItem.multipliableDecimal}</span>
                                    <span>×</span>
                                    <span>{resultItem.multiplierDecimal}</span>
                                    <span>=</span>
                                    <span>{toDecimal(resultItem.sum)}</span>
                                </div>
                                <div class='flex gap-10'>
                                    <div class='flex'>
                                        <span>tacts:</span>
                                        <span>{resultItem.tacts}</span>
                                    </div>
                                    <div class='flex '>
                                        <span>{toStringBinary(resultItem.multipliable)}</span>
                                        <span>×</span>
                                        <span>{toStringBinary(resultItem.multiplier)}</span>
                                        <span>=</span>
                                        <span>{toStringBinary(resultItem.sum)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>)}
                    </div>
                </div>
            </div>
        </div >
    )
}




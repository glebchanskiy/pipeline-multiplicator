// Лабораторная работа 1 по дисциплине МРЗвИС
// Выполнена студентами группы 121703
// БГУИР Леквов Г.А., Кочурка В.В.
// Вариант 16 - алгоритм вычисление произвдения пары 8-разрядных чисел умножением со старших разрядов со сдвигом частичной суммы влево.

import { FunctionalComponent } from "preact"
import { MultiplicationPair, to8bitBinary, toStringBinary } from "../useMultiplicationHook"
import { Signal } from "@preact/signals"

export const InputVectorView: FunctionalComponent<{ numsVector: MultiplicationPair[], hoveredNums: Signal<string> }> = ({ numsVector, hoveredNums }) => {
    return (
        <div class='flex flex-col gap-2'>
            <h2>Input vector</h2>
            <div class='flex pr-2 gap-3 border border-1 border-white rounded-sm font-mono'>
                <div class={`border-r px-2 text-left border-r-1 bg-opacity-30`}>#</div>
                <div class='w-full flex justify-between'>
                    <div class='flex'>
                        operands
                    </div>

                    <div class='flex '>
                        operands in binary
                    </div>
                </div>
            </div>
            {numsVector.map((numPair, i) => <div onMouseLeave={() => hoveredNums.value = ''} onMouseOver={() => hoveredNums.value = numPair.multipliable + 'x' + numPair.multiplier} class='relative flex pr-2 gap-3 border border-1 border-white rounded-md font-mono'>
                <div style={{ opacity: numPair.multipliable + 'x' + numPair.multiplier === hoveredNums.value ? 1 : 0 }} class=' absolute left-[-40px] transition-all duration-150 ease-in'>{`-->`}</div>
                <div class='border-r px-2 border-r-1 bg-primary rounded-l-md bg-opacity-30'>{i}</div>
                <div class='w-full flex justify-between'>
                    <div class='flex'>
                        <span>{numPair.multipliable}</span>
                        <span>×</span>
                        <span>{numPair.multiplier}</span>
                    </div>
                    <div class='flex '>
                        <span>{toStringBinary(to8bitBinary(numPair.multipliable))}</span>
                        <span>×</span>
                        <span>{toStringBinary(to8bitBinary(numPair.multiplier))}</span>
                    </div>
                </div>
            </div>)}
        </div>
    )
}

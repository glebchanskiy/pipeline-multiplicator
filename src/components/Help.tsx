import { FunctionalComponent } from "preact"

export const Help: FunctionalComponent = () => {
    return (
        <div class={'absolute left-0 max-w-[400px] p-2'}>
            <h2 class='text-[22px]'>МРЗвИС. Лабораторная работа №1</h2>
            <span>Вычисление целочисленного произвдения пары 8-разрядных чисел.</span>
        </div>
    )
}
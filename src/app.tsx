// Лабораторная работа 1 по дисциплине МРЗвИС
// Выполнена студентами группы 121703
// БГУИР Леквов Г.А., Кочурка В.В.
// Вариант 16 - алгоритм вычисление произвдения пары 8-разрядных чисел умножением со старших разрядов со сдвигом частичной суммы влево.


import { Help } from './components/Help'
import { InputControls } from './components/InputControls'
import { InputVectorView } from './components/InputVectorView'
import { ResultView } from './components/ResultView'
import { useMultiplication } from './useMultiplicationHook'

export function App() {


  const { addPair, clear, numsVector, start, result, resultDetails } = useMultiplication()


  return (
    <div class='w-[600px] flex flex-col gap-5 my-5 mx-auto text-white'>
      <Help />

      <InputControls addPair={addPair} clear={clear} start={start} numsVector={numsVector} />

      {numsVector.length > 0 &&
        <>
          <hr />
          <InputVectorView numsVector={numsVector} />
        </>}

      {result.length > 0 && <>
        <hr />
        <ResultView result={result} resultDetails={resultDetails} />
      </>}

    </div>
  )
}




import { FunctionalComponent } from "preact"
import { QueueItem, ResultDeatailsItem, toDecimal, toStringBinary } from "../useMultiplicationHook"

export const ResultView: FunctionalComponent<{
    resultDetails: ResultDeatailsItem[][],
    result: QueueItem[]
}> = ({ result, resultDetails }) => {
    return (
        <div class='w-full flex gap-3'>
            <div class='w-full flex flex-col gap-2'>
                <div class='flex flex-col gap-3'>
                    <h2>Details</h2>
                    <div class='flex flex-col gap-3'>
                        {resultDetails.filter(r => r.length).map((detailsItem, i) => <>
                            <h3>Tact {i + 1}</h3>
                            <div class='flex flex-col gap-2'>
                                {detailsItem.map(item => <div class='flex pr-2 gap-3 border border-1 border-white rounded-md overflow-hidden font-mono'>
                                    <div class={`border-r w-20 px-2 text-left border-r-1  ${item.operation === 'shift' ? 'bg-orange-500' : 'bg-purple-500'} bg-opacity-30`}>{item.operation}</div>
                                    <div class='w-full flex justify-between'>
                                        <div class='flex'>
                                            <span>{item.multipliableDecimal}</span>
                                            <span>×</span>
                                            <span>{item.multiplierDecimal}</span>
                                        </div>
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
                                </div>)}
                            </div>
                        </>)}
                    </div>
                </div>


                <div class='flex flex-col gap-3'>
                    <h2>Result:</h2>
                    <div class='flex flex-col gap-3'>
                        {result.map((resultItem, i) => <div class='flex pr-2 gap-3 border border-1 border-white rounded-md overflow-hidden font-mono'>
                            <div class='border-r px-2 border-r-1 bg-primary bg-opacity-30'>{i}</div>
                            <div class='w-full flex justify-between'>
                                <div class='flex'>
                                    <span>{resultItem.multipliableDecimal}</span>
                                    <span>×</span>
                                    <span>{resultItem.multiplierDecimal}</span>
                                    <span>=</span>
                                    <span>{toDecimal(resultItem.sum)}</span>
                                </div>
                                <div class='flex '>
                                    <span>{toStringBinary(resultItem.multipliable)}</span>
                                    <span>×</span>
                                    <span>{toStringBinary(resultItem.multiplier)}</span>
                                    <span>=</span>
                                    <span>{toStringBinary(resultItem.sum)}</span>
                                </div>
                            </div>
                        </div>)}
                    </div>
                </div>
            </div>
        </div>
    )
}




import { FunctionalComponent } from "preact"
import { MultiplicationPair, to8bitBinary, toStringBinary } from "../useMultiplicationHook"

export const InputVectorView: FunctionalComponent<{ numsVector: MultiplicationPair[] }> = ({ numsVector }) => {
    return (
        <div class='flex flex-col gap-2'>
            <h2>Input vector</h2>
            {numsVector.map((numPair, i) => <div class='flex pr-2 gap-3 border border-1 border-white rounded-md overflow-hidden font-mono'>
                <div class='border-r px-2 border-r-1 bg-primary bg-opacity-30'>{i}</div>
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

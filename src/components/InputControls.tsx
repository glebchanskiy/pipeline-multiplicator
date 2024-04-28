import { FunctionalComponent } from "preact";
import { MultiplicationPair } from "../useMultiplicationHook";
import { useRef } from "preact/hooks";

export const InputControls: FunctionalComponent<{
    numsVector: MultiplicationPair[],
    clear: () => void,
    start: () => void,
    addPair: (args: { multipliable: number; multiplier: number }) => void
}> = ({ addPair, clear, start }) => {

    const inputRef = useRef<HTMLInputElement>(null)

    const addNumberToVector = () => {
        if (!inputRef.current) return

        const pair = inputRef.current.value

        try {
            const [first, second] = pair.split(' ')
            addPair({ multipliable: parseInt(first), multiplier: parseInt(second) })
            inputRef.current.value = ''
        } catch { }
    }

    return (
        <div class='flex gap-3 text-dark'>
            <input ref={inputRef} type="text" placeholder={'num1 num2'} class='h-6 pl-1 bg-white rounded-md focus:!outline-none' />
            <button onClick={addNumberToVector} class='opacity-70 hover:opacity-100 h-6 w-6 flex justify-center items-center border border-1 border-white rounded-md' ><IconPlus class='text-white fill-white' /></button>
            <button onClick={clear} class='opacity-70 hover:opacity-100 h-6 w-12 flex justify-center items-center border border-1 border-white rounded-md' ><span class='text-white'>clear</span></button>
            <button onClick={start} class='opacity-70 hover:opacity-100 h-6 w-12 flex justify-center items-center border border-1 border-white rounded-md' ><span class='text-white'>start</span></button>
        </div>
    )
}

function IconPlus(props: preact.JSX.HTMLAttributes<SVGSVGElement>) {
    return (
        <svg
            viewBox="0 0 16 16"
            height="1em"
            width="1em"
            {...props}
        >
            <path d="M8 4a.5.5 0 01.5.5v3h3a.5.5 0 010 1h-3v3a.5.5 0 01-1 0v-3h-3a.5.5 0 010-1h3v-3A.5.5 0 018 4z" />
        </svg>
    );
}
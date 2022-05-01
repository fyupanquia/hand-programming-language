function translate(string) {
    const memory = [0]
    const arrayOfInstructions = Array.from(string)
    const MIN_CELLS = 0
    const MAX_CELLS = 255
    let pointer = 0
    let index = 0
    let output = "";

    const clampMaxMinCells = value => {
        if (value > MAX_CELLS) return MIN_CELLS
        if (value < MIN_CELLS) return MAX_CELLS
        return value
    }

    const getCorrespondingCloseFistIndex = (index) => {
        let fists = 1
        for (let i = index + 1; i < arrayOfInstructions.length; i++) {
            if (arrayOfInstructions[i] === "🤜") fists++
            if (arrayOfInstructions[i] === "🤛") fists--

            if (fists === 0) return i
        }
    }
    const getCorrespondingOpenFistIndex = (index) => {
        let fists = 1
        for (let i = index - 1; i >= 0; i--) {
            if (arrayOfInstructions[i] === "🤛") fists++
            if (arrayOfInstructions[i] === "🤜") fists--

            if (fists === 0) return i
        }
    }

    const actions = {
        "👉": () => {
            pointer++
            memory[pointer] ??= 0
        },
        "👈": () => {
            pointer--
            memory[pointer] ??= 0
        },
        "👆": () => {
            memory[pointer] = clampMaxMinCells(++memory[pointer])
        },
        "👇": () => {
            memory[pointer] = clampMaxMinCells(--memory[pointer])
        },
        "🤜": () => {
            if (memory[pointer] === 0) {
                index = getCorrespondingCloseFistIndex(index)
            }
        },
        "🤛": () => {
            if (memory[pointer] !== 0) {
                index = getCorrespondingOpenFistIndex(index)
            }
        },
        "👊": () => {
            output += String.fromCharCode(memory[pointer])
        },

    }

    while (index < arrayOfInstructions.length) {
        const action = arrayOfInstructions[index]
        actions[action]()
        index++
    }

    return output
}
module.exports = translate
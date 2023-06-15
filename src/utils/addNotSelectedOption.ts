export const addNotSelectedOption = (options?: any[]) => {

    if (!options?.length) {
        return [{
            value: 0,
            content: "Не выбрано"
        }]
    }
    return [{
        value: 0,
        content: "Не выбрано"
    },...options ]
} 
export type Call = {
    type: "Call"
    short: boolean,
    qty: number
    strike: number
    price: number
    maturity: number
}

export type Put = {
    type: "Put"
    short: boolean,
    qty: number
    strike: number
    price: number
    maturity: number
}

export type Stock = {
    type: "Stock"
    short: boolean,
    qty: number,
    strike: number
}

export type Option = Call | Put | Stock

export const index = (option: Option) => {
    switch (option.type) {
        case "Stock": return "S." + (option.short ? "S" : "") + option.qty + "@" + option.strike
        case "Call": return "C." + (option.short ? "S" : "") + option.qty + "@" + option.strike + "." + option.price + "/" + option.maturity
        case "Put": return "P." + (option.short ? "S" : "") + option.qty + "@" + option.strike + "." + option.price + "/" + option.maturity
    }
}
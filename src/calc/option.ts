export type Call = {
    type: "Call"
    qty: number
    strike: number
    price: number
    maturity: number
}

export type Put = {
    type: "Put"
    qty: number
    strike: number
    price: number
    maturity: number
}

export type Stock = {
    type: "Stock"
    qty: number
}

export type Option = Call | Put | Stock

export const index = (option: Option) => {
    switch (option.type) {
        case "Stock": return "S." + option.qty
        case "Call": return "C." + option.qty + "@" + option.strike + "." + option.price + "/" + option.maturity
        case "Put": return "P." + option.qty + "@" + option.strike + "." + option.price + "/" + option.maturity
    }
}
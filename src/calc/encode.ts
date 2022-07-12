import { Option } from "./option"
import { base64ToBigint, bigintToBase64 } from "bigint-conversion"

class Decoder {
    data: bigint

    constructor(code: string) {
        this.data = base64ToBigint(code);
    }

    zero(): boolean {
        return this.data === BigInt(0)
    }

    read(n: number): number {
        const nn = BigInt(n)
        const mod = this.data % nn;
        this.data /= nn;

        return Number(mod)
    }

    readFloat(): number {
        const n = this.read(8);
        const m = this.read(3);

        let res = 0
        let ptr = 10 ** -m

        for (let i = 0; i < n + m; i++) {
            res += this.read(10) * ptr
            ptr *= 10
        }

        return res
    }
}

class Encoder {
    data: bigint

    constructor() {
        this.data = BigInt(0)
    }

    zero(): boolean {
        return this.data === BigInt(0)
    }

    code(): string {
        return bigintToBase64(this.data)
    }

    write(value: number, n: number) {
        console.log(name, value, n)

        if (value >= n) throw new Error("arith encoding overflow")

        this.data *= BigInt(n)
        this.data += BigInt(value)
    }

    writeFloat(value: number) {
        const str = Math.abs(value).toFixed(2).replace(/\.0+$/, "")
        const idx = str.indexOf(".")

        const pre = idx >= 0 ? str.substring(Math.max(0, idx - 8), idx) : str
        const post = idx >= 0 ? str.substring(idx + 1) : ""

        for (let i = 0; i < pre.length; i++) {
            this.write(Number(pre[i]), 10)
        }

        for (let i = 0; i < post.length; i++) {
            this.write(Number(post[i]), 10)
        }

        this.write(post.length, 3)
        this.write(pre.length, 8)
    }
}

export const encode = (options: Option[]): string | null => {
    try {
        const encoder = new Encoder();

        encoder.write(3, 4);

        for (const option of options) {
            switch (option.type) {
                case "Stock":
                    encoder.writeFloat(option.strike);
                    encoder.writeFloat(option.qty);
                    encoder.write(option.short ? 1 : 0, 2);
                    encoder.write(0, 4);
                    break;
                case "Call":
                    encoder.writeFloat(option.price);
                    encoder.writeFloat(option.strike);
                    encoder.writeFloat(option.maturity);
                    encoder.writeFloat(option.qty);
                    encoder.write(option.short ? 1 : 0, 2);
                    encoder.write(1, 4);
                    break;
                case "Put":
                    encoder.writeFloat(option.price);
                    encoder.writeFloat(option.strike);
                    encoder.writeFloat(option.maturity);
                    encoder.writeFloat(option.qty);
                    encoder.write(option.short ? 1 : 0, 2);
                    encoder.write(2, 4);
                    break;
            }
        }

        if (encoder.zero()) {
            return "";
        }

        return encoder.code();
    } catch (e) {
        console.log(e)
        return null;
    }
}

export const decode = (code: string): Option[] | null => {
    try {
        const decoder = new Decoder(code);
        const result = [] as Option[]
        let run = true;

        while (run) {
            let qty;
            let short;
            let maturity;
            let strike;
            let price;

            if (decoder.zero()) {
                return null;
            }

            switch (decoder.read(4)) {
                case 0:
                    short = decoder.read(2) === 1;
                    qty = decoder.readFloat();
                    strike = decoder.readFloat();

                    result.push({ type: "Stock", qty, short, strike, price: 100, maturity: 90 } as unknown as Option); //asdasd
                    break;

                case 1:
                    short = decoder.read(2) === 1;
                    qty = decoder.readFloat();
                    maturity = decoder.readFloat();
                    strike = decoder.readFloat();
                    price = decoder.readFloat();

                    result.push({ type: "Call", qty, short, price, strike, maturity });
                    break;

                case 2:
                    short = decoder.read(2) === 1;
                    qty = decoder.readFloat();
                    maturity = decoder.readFloat();
                    strike = decoder.readFloat();
                    price = decoder.readFloat();

                    result.push({ type: "Put", qty, short, price, strike, maturity })
                    break;

                case 3:
                    if (!decoder.zero()) {
                        return null
                    }

                    run = false;
                    break;
            }
        }

        return result.reverse();
    } catch (e) {
        return null;
    }
}
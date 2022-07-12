import { BitStream } from "bit-buffer"
import { Option } from "./option"
import { base64ToBigint, bigintToBase64 } from "bigint-conversion"

class Decoder {
    data: bigint

    constructor(code: string) {
        this.data = base64ToBigint(code);
    }

    // its actually ok because no option can be encoded as zeros only (quantity must be nonzero)
    zero(): boolean {
        return this.data === BigInt(0)
    }

    read(n: number): number {
        const nn = BigInt(n)
        const mod = this.data % nn;
        this.data /= nn;

        return Number(mod)
    }

    readUFloat(): number {
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

    readSFloat(): number {
        const sign = this.read(2)

        if (sign === 0) {
            return this.readUFloat()
        } else {
            return -this.readUFloat()
        }
    }
}

class Encoder {
    data: bigint

    constructor() {
        this.data = BigInt(0)
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

    writeUFloat(value: number) {
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

    writeSFloat(value: number) {
        this.writeUFloat(Math.abs(value))
        this.write(value > 0 ? 0 : 1, 2)
    }
}

export const encode = (options: Option[]): string | null => {
    try {
        const encoder = new Encoder();

        for (const option of options) {
            switch (option.type) {
                case "Stock":
                    encoder.writeSFloat(option.qty);
                    encoder.write(0, 3);
                    break;
                case "Call":
                    encoder.writeUFloat(option.price);
                    encoder.writeUFloat(option.strike);
                    encoder.writeUFloat(option.maturity);
                    encoder.writeSFloat(option.qty);
                    encoder.write(1, 3);
                    break;
                case "Put":
                    encoder.writeUFloat(option.price);
                    encoder.writeUFloat(option.strike);
                    encoder.writeUFloat(option.maturity);
                    encoder.writeSFloat(option.qty);
                    encoder.write(2, 3);
                    break;
            }
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

        while (!decoder.zero()) {
            let qty;
            let maturity;
            let strike;
            let price;

            switch (decoder.read(3)) {
                case 0:
                    qty = decoder.readSFloat();

                    result.push({ type: "Stock", qty, price: 1, strike: 1, maturity: 1 } as unknown as Option); //asdasd
                    break;

                case 1:
                    qty = decoder.readSFloat();
                    maturity = decoder.readUFloat();
                    strike = decoder.readUFloat();
                    price = decoder.readUFloat();

                    result.push({ type: "Call", qty, price, strike, maturity });
                    break;

                case 2:
                    qty = decoder.readSFloat();
                    maturity = decoder.readUFloat();
                    strike = decoder.readUFloat();
                    price = decoder.readUFloat();

                    result.push({ type: "Put", qty, price, strike, maturity })
                    break;
            }
        }

        return result.reverse();
    } catch (e) {
        return null;
    }
}
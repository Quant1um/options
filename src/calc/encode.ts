import { BitStream } from "bit-buffer"
import { Option } from "./option"
import { decode as b64decode, encode as b64encode } from "base64-arraybuffer"

export const encode = (options: Option[]): string | null => {
    try {
        const array = new Uint8Array(128)
        const buffer = new BitStream(array.buffer)

        for (const option of options) {
            switch (option.type) {
                case "Stock":
                    buffer.writeBits(0, 2);
                    buffer.writeInt32(option.qty * 100);
                    break;
                case "Call":
                    buffer.writeBits(1, 2);
                    buffer.writeInt32(option.qty * 100);
                    buffer.writeUint32(option.price * 100);
                    buffer.writeUint32(option.strike * 100);
                    buffer.writeUint32(option.maturity * 100);
                    break;
                case "Put":
                    buffer.writeBits(2, 2);
                    buffer.writeInt32(option.qty * 100);
                    buffer.writeUint32(option.price * 100);
                    buffer.writeUint32(option.strike * 100);
                    buffer.writeUint32(option.maturity * 100);
                    break;
            }
        }

        return b64encode(array.buffer.slice(0, buffer.byteIndex))
    } catch (e) {
        return null;
    }
}

export const decode = (code: string): Option[] | null => {
    try {
        const buffer = new BitStream(b64decode(code))
        const result = [] as Option[]

        while (buffer.bitsLeft >= 8) {
            let qty;
            let maturity;
            let strike;
            let price;

            switch (buffer.readBits(2)) {
                case 0:
                    qty = buffer.readInt32() / 100

                    result.push({ type: "Stock", qty, price: 1, strike: 1, maturity: 1 } as unknown as Option) //asdasd
                    break;

                case 1:
                    qty = buffer.readInt32() / 100
                    price = buffer.readUint32() / 100
                    strike = buffer.readUint32() / 100
                    maturity = buffer.readUint32() / 100

                    result.push({ type: "Call", qty, price, strike, maturity })
                    break;

                case 2:
                    qty = buffer.readInt32() / 100
                    price = buffer.readUint32() / 100
                    strike = buffer.readUint32() / 100
                    maturity = buffer.readUint32() / 100

                    result.push({ type: "Put", qty, price, strike, maturity })
                    break;
            }
        }

        return result
    } catch (e) {
        return null
    }
}
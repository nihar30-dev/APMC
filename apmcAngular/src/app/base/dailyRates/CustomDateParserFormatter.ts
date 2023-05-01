import {NgbDateParserFormatter, NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";
import {Injectable} from "@angular/core";

@Injectable()
export class CustomDateParserFormatter extends NgbDateParserFormatter {
    readonly DELIMITER = '/';

    format(date: NgbDateStruct | null): string {
        return date ? `${this.pad(date.day)}${this.DELIMITER}${this.pad(date.month)}${this.DELIMITER}${date.year}` : '';
    }

    parse(value: string): NgbDateStruct | null {
        if (value) {
            const dateParts = value.trim().split(this.DELIMITER);

            if (dateParts.length === 1 && Number(dateParts[0])) {
                return { year: Number(dateParts[0]), month: 0, day: 0 };
            } else if (dateParts.length === 2 && Number(dateParts[0]) && Number(dateParts[1])) {
                return { year: Number(dateParts[1]), month: Number(dateParts[0]), day: 0 };
            } else if (dateParts.length === 3 && Number(dateParts[0]) && Number(dateParts[1]) && Number(dateParts[2])) {
                return { year: Number(dateParts[2]), month: Number(dateParts[1]), day: Number(dateParts[0]) };
            }
        }

        return null;
    }

    pad(n: number): string {
        return n < 10 ? `0${n}` : `${n}`;
    }

}

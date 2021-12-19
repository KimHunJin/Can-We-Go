import {VaccineType} from "@/type/vaccineType";

export type CountryType = {
    key: string;
    country: string;
    continent: string;
    city: string;
    preparation: string[]
    vaccine: VaccineType[];
    image: string;
    updateDate: string;
}
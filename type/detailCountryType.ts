import {ExemptionType} from "@/type/exemptionType";
import {PreparationType} from "@/type/preparationType";
import {ReferenceType} from "@/type/referenceType";

export type DetailCountryType = {
    key: number;
    continent: string;
    country: string;
    exemptionList: ExemptionType[];
    preparationList: PreparationType[];
    referenceList: ReferenceType[];
    officeUrl: string;
    image: string;
    updateDate: string;
}
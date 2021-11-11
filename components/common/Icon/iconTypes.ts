import CLOSE_14 from "@/assets/icon/ic_close_14.svg";
import TEXT_26 from "@/assets/icon/ic_text_26.svg";

const IconTypes = {
    CLOSE_14: CLOSE_14,
    TEXT_26: TEXT_26

} as const;

type IconTypes = typeof IconTypes[keyof typeof IconTypes];

export {
    IconTypes
}

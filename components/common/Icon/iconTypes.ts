import CLOSE_14 from "@/assets/icon/ic_close_14.svg";
import TEXT_26 from "@/assets/icon/ic_text_26.svg";
import ARROW_DOWN_13 from "@/assets/icon/ic_arrow_down_13.svg";
import CLEAR_8 from "@/assets/icon/ic_clear_8.svg";
import FILTER_16 from "@/assets/icon/ic_filter_16.svg";
import FILTER_HOVER_16 from "@/assets/icon/ic_filter_hover_16.svg";

const IconTypes = {
    CLOSE_14: CLOSE_14,
    TEXT_26: TEXT_26,
    ARROW_DOWN_13: ARROW_DOWN_13,
    CLEAR_8: CLEAR_8,
    FILTER_16: FILTER_16,
    FILTER_HOVER_16
} as const;

type IconTypes = typeof IconTypes[keyof typeof IconTypes];

export {
    IconTypes
}

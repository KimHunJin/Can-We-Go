import CLOSE_14 from "@/assets/icon/ic_close_14.svg";
import TEXT_26 from "@/assets/icon/ic_text_26.svg";
import ARROW_DOWN_13 from "@/assets/icon/ic_arrow_down_13.svg";
import CLEAR_8 from "@/assets/icon/ic_clear_8.svg";
import FILTER_16 from "@/assets/icon/ic_filter_16.svg";
import FILTER_HOVER_16 from "@/assets/icon/ic_filter_hover_16.svg";
import INFO_24 from "@/assets/icon/ic_info_24_gray.svg";
import INFO_HOVER_24 from "@/assets/icon/ic_info_24_black.svg";
import LOCATION_24 from "@/assets/icon/ic_location_24_gray.svg";
import LOCATION_HOVER_24 from "@/assets/icon/ic_location_24_black.svg";
import EARTH_26 from '@/assets/icon/ic_earth_26.svg';

const IconTypes = {
    CLOSE_14: CLOSE_14,
    TEXT_26: TEXT_26,
    ARROW_DOWN_13: ARROW_DOWN_13,
    CLEAR_8: CLEAR_8,
    FILTER_16: FILTER_16,
    FILTER_HOVER_16: FILTER_HOVER_16,
    INFO_24: INFO_24,
    INFO_HOVER_24: INFO_HOVER_24,
    LOCATION_24: LOCATION_24,
    LOCATION_HOVER_24: LOCATION_HOVER_24,
    EARTH_26: EARTH_26
} as const;

type IconTypes = typeof IconTypes[keyof typeof IconTypes];

export {
    IconTypes
}

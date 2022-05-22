import s from "../../pages/home.module.scss";
import {TextView} from "@/components/main/TextView/TextView";
import {ReferenceBox} from "@/components/detail/ReferenceBox/ReferenceBox";
import React from "react";

export const InfoView = () => {
    return (
        <>
            <div className={s.topLabelArea}>
                갈 수 있나?
            </div>
            <div className={s.infoWrap}>
                <TextView className={s.infoTitle}>
                    여행가기전,<br/>
                    꼭 알아야 할 정보!
                </TextView>
                <div className={s.infoList}>
                    <ReferenceBox className={s.referenceBox} type="증명서/확인서" reference="PCR 음성확인서"/>
                    <ReferenceBox className={s.referenceBox} type="증명서/확인서" reference="ESTA 비자"/>
                </div>
            </div>
        </>
    );
}
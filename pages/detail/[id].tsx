import React, {createRef, useEffect, useState} from "react";
import Link from "next/link"
import s from "./detail.module.scss";
import {useRouter} from "next/router";
import Icon from "@/components/common/Icon/Icon";
import {IconTypes} from "@/components/common/Icon/iconTypes";
import {Dot} from "@/components/common/Dot/Dot";
import {TextView} from "@/components/main/TextView/TextView";
import {Line} from "@/components/common/Line/Line";
import {InfoBox} from "@/components/detail/InfoBox/InfoBox";
import {ReferenceBox} from "@/components/detail/ReferenceBox/ReferenceBox";
import {CloseButton} from "@/components/common/CloseButton/CloseButton";

const Detail: React.FC = () => {

    const router = useRouter();
    const {id} = router.query

    const [top, setTop] = useState(30);
    const [ticking, setTicking] = useState(false);

    const [containerRef] = useState(createRef<HTMLDivElement>());

    useEffect(() => {

        const listener = () => {
            const scrollTop = containerRef.current?.scrollTop;

            if (!ticking) {
                window.requestAnimationFrame(function () {
                    if (scrollTop) {
                        setTop(scrollTop + 30)
                    }
                    setTicking(false);
                });

                setTicking(true);
            }
        }

        containerRef.current?.addEventListener('scroll', listener);
        return window.removeEventListener('scroll', () => listener)
    }, [])

    return (
        <div className={s.container} ref={containerRef}>
            <button className={s.closeButton} style={{top: top}}>
                <Link href={'/'}>
                    <a>
                        <Icon iconType={IconTypes.CLOSE_14}/>
                    </a>
                </Link>
            </button>
            <div className={s.header}>
                <article className={s.metaWrap}>
                    <TextView className={s.name}>하와이</TextView>
                    <TextView className={s.continent}>미국<Dot className={s.dot} size={3}/>미주/캐나다</TextView>
                </article>
                <article className={s.buttonWrap}>
                    <button className={s.shareButton}>공유하기</button>
                </article>
            </div>
            <Line/>
            <div className={s.infos}>
                <InfoBox
                    className={s.info}
                    infoTitle='👤 자가격리 면제 대상은?'
                    descriptions={[
                        '출국 전 72시간 이내에 하와이 주정부 기관이 지정한 병원에서 실시한 PCR 음성 확인서를 \'온라인 여행 안전 시스템\'에 제출한 사람',
                        'ESTA 비자를 소지한 사람',
                        '얀센,아스트라제네카,모더나,화이자 백신을 접종한 사람'
                    ]}
                />
                <InfoBox
                    className={s.info}
                    infoTitle='🎒 뭘 준비해야 하나요?'
                    descriptions={[
                        'PCR 음성확인서\n' +
                        '하와이 주정부 기관이 지정한 병원에서 실시\n' +
                        '출국 전 72시간 내 검사',
                        'ESTA 비자',
                        '안전여행시스템 QR코드 및 인쇄물'
                    ]}
                />
                <InfoBox
                    className={s.info}
                    infoTitle='✅️ 참고하세요!'
                    descriptions={[
                        '실내 마스크 의무 착용 규제가 유지돼요. ',
                        '9월 13일부터 60일간 \'세이프 엑세스 오아후\' 프로그램 실시돼요.'
                    ]}
                />
                <div className={s.references}>
                    <TextView className={s.title}>참고할 수 있는 게시글</TextView>
                    <ReferenceBox className={s.referenceBox} type="증명서/확인서" reference="PCR 음성확인서"/>
                    <ReferenceBox className={s.referenceBox} type="증명서/확인서" reference="ESTA 비자"/>
                    <ReferenceBox className={s.referenceBox} type="증명서/확인서" reference="안전여행시스템 QR코드 및 인쇄물"/>
                    <ReferenceBox className={s.referenceBox} type="증명서/확인서" reference="세이프 엑세스 오아후 프로그램"/>
                </div>
            </div>
        </div>
    )
}


export default Detail

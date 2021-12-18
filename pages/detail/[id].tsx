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
import data from "../../content/index.json";
import {DetailCountryType} from "@/type/detailCountryType";

const Detail: React.FC = () => {

    const router = useRouter();
    const {id} = router.query

    const [top, setTop] = useState(30);
    const [ticking, setTicking] = useState(false);

    const [containerRef] = useState(createRef<HTMLDivElement>());

    const [content, setContent] = useState<DetailCountryType | null>(null)

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

    useEffect(() => {
        const d = data.vaccine.find(it => `${it.key}` === id);
        if (d) {
            setContent({
                key: d.key,
                continent: d.continent,
                country: d.country,
                exemptionList: d.exemptionList,
                preparationList: d.preparationList,
                referenceList: d.referenceList,
                image: d.image,
                officeUrl: d.officeUrl,
                updateDate: d.updateDate
            });
        }
    }, [id])

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
                    <TextView className={s.name}>{content?.country ?? ''}</TextView>
                    <TextView className={s.continent}>{content?.country ?? ''}
                        <Dot className={s.dot} size={3}/>
                        {content?.continent ?? ''}
                    </TextView>
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
                    descriptions={content?.exemptionList.map(it => it.content) ?? []}
                />
                <InfoBox
                    className={s.info}
                    infoTitle='🎒 뭘 준비해야 하나요?'
                    descriptions={content?.preparationList.map(it => it.content) ?? []}
                />
                <InfoBox
                    className={s.info}
                    infoTitle='✅️ 참고하세요!'
                    descriptions={content?.referenceList.map(it => it.content) ?? []}
                />
                <div className={s.references}>
                    <TextView className={s.title}>참고할 수 있는 게시글</TextView>
                    <div className={s.referenceBoxWrap}>
                        <ReferenceBox className={s.referenceBox} type="증명서/확인서" reference="PCR 음성확인서"/>
                        <ReferenceBox className={s.referenceBox} type="증명서/확인서" reference="ESTA 비자"/>
                    </div>
                </div>
                <div className={s.tourOfficeWrap}>
                    <TextView className={s.title}>관광청을 꼭 확인하세요!</TextView>
                    <TextView className={s.description}>
                        코로나 상황에 따라 관련 정책이나 지침이 변동될 수 있으니<br/>
                        해당 나라와 도시의 관광청의 정보를 꼭 확인해 주세요.
                    </TextView>
                    <ReferenceBox
                        className={s.referenceBox}
                        type="관광청"
                        reference={content?.country ?? ''}
                        referenceType="TOUR"
                        link={content?.officeUrl}
                    />
                </div>
                <div className={s.notice}>
                    <TextView className={s.noticeText}>
                        ‘갈 수 있나?’의 서비스에 표시된 정보는 정책과 지침의 변동 사항에<br/>
                        의해 정확하지 않을 수 있으며, 그로 인해 발생한<br/>
                        피해의 경우 ‘갈 수있나?’는 책임지지 않습니다.
                    </TextView>
                </div>
            </div>
        </div>
    )
}


export default Detail

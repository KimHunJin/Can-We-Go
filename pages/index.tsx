import type {NextPage} from 'next'
import Link from "next/link"
import {Circle} from "@/components/main/Circle/Circle";
import {SearchBar} from "@/components/main/SearchBar/SearchBar";
import {TextView} from "@/components/main/TextView/TextView";
import {BottomSlider} from "@/components/main/Slider/BottomSlider";
import {DropdownFilter} from "@/components/main/Filter/DropdownFilter";
import {TravelItem} from "@/components/main/Item/TravelItem";
import s from './home.module.scss'
import React, {useState} from "react";
import {FilterLayout} from "@/components/main/Filter/FilterLayout";
import {RoundFilter} from "@/components/main/Filter/RoundFilter";
import {RoundButton} from "@/components/common/RoundButton/RoundButton";
import Icon from "@/components/common/Icon/Icon";
import {IconTypes} from "@/components/common/Icon/iconTypes";
import {ContinentType} from "@/type/continentType";
import {VaccineType} from "@/type/vaccineType";
import classNames from "classnames";
import {FooterItem} from "@/components/main/Item/FooterItem";
import {ViewType} from "@/type/viewType";
import {ReferenceBox} from "@/components/detail/ReferenceBox/ReferenceBox";

const Home: NextPage = () => {

    const [isVisibleFilter, setIsVisibleFilter] = useState(false);
    const [viewType, setViewType] = useState<ViewType>('LOCATION');

    const [continents, setContinents] = useState<ContinentType[]>([
        {
            id: 1,
            name: '동북아시아',
            isSelect: false
        },
        {
            id: 2,
            name: '동남아시아',
            isSelect: false
        },
        {
            id: 3,
            name: '서남아시아',
            isSelect: false
        },
        {
            id: 4,
            name: '유럽',
            isSelect: false
        },
        {
            id: 5,
            name: '대양주',
            isSelect: false
        },
        {
            id: 6,
            name: '미주/캐나다',
            isSelect: false
        },
        {
            id: 7,
            name: '아프리카',
            isSelect: false
        }
    ]);

    const [vaccine, setVaccine] = useState<VaccineType[]>([
        {
            id: 1,
            name: '화이자',
            isSelect: false
        },
        {
            id: 2,
            name: '모더나',
            isSelect: false
        },
        {
            id: 3,
            name: '얀센',
            isSelect: false
        },
        {
            id: 4,
            name: '아스트라제네카',
            isSelect: false
        }
    ]);

    const [country, setCountry] = useState([
        {
            country: '싱가폴',
            continent: '싱가폴',
            city: '싱가폴',
            preparation: [
                'PCR 음성확인서\n하와이 주정부 기관이 지정한 병원에서 실시\n출국 전 72시간 내 검사',
                'ESTA 비자',
                '안전여행시스템 QR코드 및 인쇄물'
            ],
            vaccine: "아스트라제네카 백신 불가"
        },
        {
            country: '그라나다',
            continent: '유럽',
            city: '스페인',
            preparation: [
                'PCR 음성확인서\n하와이 주정부 기관이 지정한 병원에서 실시\n출국 전 72시간 내 검사',
                'ESTA 비자',
            ],
            vaccine: "아스트라제네카 백신 불가"
        },
        {
            country: '싱가폴',
            continent: '싱가폴',
            city: '싱가폴',
            preparation: [
                'PCR 음성확인서\n하와이 주정부 기관이 지정한 병원에서 실시\n출국 전 72시간 내 검사',
                'ESTA 비자',
                '안전여행시스템 QR코드 및 인쇄물'
            ],
            vaccine: "아스트라제네카 백신 불가"
        },
        {
            country: '그라나다',
            continent: '유럽',
            city: '스페인',
            preparation: [
                'PCR 음성확인서\n하와이 주정부 기관이 지정한 병원에서 실시\n출국 전 72시간 내 검사',
                'ESTA 비자',
            ],
            vaccine: "아스트라제네카 백신 불가"
        },
        {
            country: '싱가폴',
            continent: '싱가폴',
            city: '싱가폴',
            preparation: [
                'PCR 음성확인서\n하와이 주정부 기관이 지정한 병원에서 실시\n출국 전 72시간 내 검사',
                'ESTA 비자',
                '안전여행시스템 QR코드 및 인쇄물'
            ],
            vaccine: "아스트라제네카 백신 불가"
        },
        {
            country: '그라나다',
            continent: '유럽',
            city: '스페인',
            preparation: [
                'PCR 음성확인서\n하와이 주정부 기관이 지정한 병원에서 실시\n출국 전 72시간 내 검사',
                'ESTA 비자',
            ],
            vaccine: "아스트라제네카 백신 불가"
        },
    ])

    const handleContinentClick = () => {
        const c = continents.filter(it => it.isSelect);
        if (c.length > 0) {
            const _c = [...continents].map(it => ({...it, isSelect: false}))
            setContinents(_c);
        } else {
            setIsVisibleFilter(true);
        }
    }

    const handleVaccineClick = () => {
        const v = vaccine.filter(it => it.isSelect);
        if (v.length > 0) {
            const _v = [...vaccine].map(it => ({...it, isSelect: false}))
            setVaccine(_v);
        } else {
            setIsVisibleFilter(true);
        }
    }

    const handleCloseButtonClick = () => {
        setIsVisibleFilter(false);
    }

    const handleAdapt = (continents: ContinentType[], vaccines: VaccineType[]) => {
        setContinents(continents);
        setVaccine(vaccines)
    }

    const renderLocationViewType = () => {
        return (
            <div className={s.mainWrap}>
                <TextView className={s.mainText}>
                    싱가폴 <br/>
                    갈 수 있나?
                </TextView>
                <TextView className={s.subText}>
                    2021년 11월 1일부터 자가격리 없이 가능해요!
                </TextView>
                <div className={s.wrap}>
                    <Circle className={s.earth}/>
                    <BottomSlider className={s.bottomSlider}>
                        <nav className={s.topFilter}>
                            {
                                continents.some(it => it.isSelect) || vaccine.some(it => it.isSelect)
                                    ? (
                                        <RoundButton onClick={handleContinentClick}
                                                     className={classNames(s.filter, s.filterButton)}>
                                            <Icon iconType={IconTypes.FILTER_16}/>
                                        </RoundButton>
                                    )
                                    : (
                                        <RoundButton onClick={handleContinentClick}
                                                     className={classNames(s.filter, s.noneFilterButton)}>
                                            <Icon iconType={IconTypes.FILTER_HOVER_16}/>
                                        </RoundButton>
                                    )
                            }

                            <RoundFilter
                                className={s.filter}
                                name="대륙전체"
                                shortName="대륙"
                                items={continents}
                                onClick={handleContinentClick}
                            />
                            <RoundFilter
                                className={s.filter}
                                name="백신전체"
                                shortName="백신"
                                items={vaccine}
                                onClick={handleVaccineClick}
                            />
                        </nav>
                        <div className={s.infoArea}>
                            <span className={s.totalCount}>전체 {country.length}</span>
                            <DropdownFilter
                                className={s.dropdownFilter}
                                filterItems={[{name: "최근 추가 순", value: -1}]}
                                value={-1}
                            />
                        </div>
                        <div className={s.itemList}>
                            {country.map((c, index) => (
                                <Link key={index} href={`/detail/${index}`}>
                                    <a>
                                        <TravelItem
                                            className={s.item}
                                            country={c.country}
                                            continent={c.continent}
                                            city={c.city}
                                            preparationCount={c.preparation.length}
                                            vaccination={c.vaccine}
                                        />
                                    </a>
                                </Link>
                            ))}
                        </div>
                    </BottomSlider>
                </div>
            </div>
        );
    }

    const renderInfoViewType = () => {
        return (
            <div className={s.infoWrap}>
                <TextView className={s.infoTitle}>
                    여행가기전,<br/>
                    꼭 알아야 할 정보!
                </TextView>
                <div className={s.infoList}>
                    <ReferenceBox className={s.referenceBox} type="증명서/확인서" reference="PCR 음성확인서"/>
                    <ReferenceBox className={s.referenceBox} type="증명서/확인서" reference="ESTA 비자"/>
                    <ReferenceBox className={s.referenceBox} type="증명서/확인서" reference="안전여행시스템 QR코드 및 인쇄물"/>
                    <ReferenceBox className={s.referenceBox} type="증명서/확인서" reference="세이프 엑세스 오아후 프로그램"/>
                </div>
            </div>
        );
    }

    return (
        <div className={s.container}>
            <div className={s.inputWrap}>
                <SearchBar className={s.input}/>
            </div>
            {viewType === 'LOCATION' ? renderLocationViewType() : renderInfoViewType()}
            {isVisibleFilter && (
                <FilterLayout
                    continents={continents}
                    vaccine={vaccine}
                    onCloseButtonClick={handleCloseButtonClick}
                    onAdaptButtonClick={handleAdapt}
                />
            )}
            {!isVisibleFilter && (
                <div className={s.footer}>
                    <FooterItem
                        className={s.location}
                        text="도시찾기"
                        iconType={IconTypes.LOCATION_24}
                        iconHoverType={IconTypes.LOCATION_HOVER_24}
                        isSelect={viewType === 'LOCATION'}
                        onClick={() => setViewType('LOCATION')}
                    />
                    <FooterItem
                        text="여행정보"
                        iconType={IconTypes.INFO_24}
                        iconHoverType={IconTypes.INFO_HOVER_24}
                        isSelect={viewType === 'INFO'}
                        onClick={() => setViewType('INFO')}
                    />
                </div>
            )}
        </div>
    )
}

export default Home

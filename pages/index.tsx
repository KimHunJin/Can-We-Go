import type {NextPage} from 'next'
import Link from "next/link"
import {Circle} from "@/components/main/Circle/Circle";
import {SearchBar} from "@/components/main/SearchBar/SearchBar";
import {TextView} from "@/components/main/TextView/TextView";
import {BottomSlider} from "@/components/main/Slider/BottomSlider";
import {DropdownFilter} from "@/components/main/Filter/DropdownFilter";
import {TravelItem} from "@/components/main/Item/TravelItem";
import s from './home.module.scss'
import {useState} from "react";
import {FilterLayout} from "@/components/main/Filter/FilterLayout";
import {RoundFilter} from "@/components/main/Filter/RoundFilter";
import {RoundButton} from "@/components/common/RoundButton/RoundButton";
import Icon from "@/components/common/Icon/Icon";
import {IconTypes} from "@/components/common/Icon/iconTypes";
import {ContinentType} from "@/type/continentType";
import {VaccineType} from "@/type/vaccineType";
import classNames from "classnames";

const Home: NextPage = () => {

    const [isVisibleFilter, setIsVisibleFilter] = useState(false);

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

    const handleContinentClick = () => {
        setIsVisibleFilter(true);
    }

    const handleCloseButtonClick = () => {
        setIsVisibleFilter(false);
    }

    const handleAdapt = (continents: ContinentType[], vaccines: VaccineType[]) => {
        setContinents(continents);
        setVaccine(vaccines)
    }

    return (
        <div className={s.container}>
            <div className={s.inputWrap}>
                <SearchBar className={s.input}/>
            </div>
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
                                count={continents.filter(it => it.isSelect).length}
                                onClick={handleContinentClick}
                            />
                            <RoundFilter
                                className={s.filter}
                                name="백신전체"
                                shortName="백신"
                                count={vaccine.filter(it => it.isSelect).length}
                                onClick={handleContinentClick}
                            />
                        </nav>
                        <div className={s.infoArea}>
                            <span className={s.totalCount}>전체 100</span>
                            <DropdownFilter
                                className={s.dropdownFilter}
                                filterItems={[{name: "최근 추가 순", value: -1}]}
                                value={-1}
                            />
                        </div>
                        <div className={s.itemList}>
                            {Array.from({length: 5}).map((_, index) => (
                                <Link key={index} href={`/detail/${index}`}>
                                    <a>
                                        <TravelItem className={s.item}/>
                                    </a>
                                </Link>
                            ))}
                        </div>
                    </BottomSlider>
                </div>
            </div>
            {isVisibleFilter && (
                <FilterLayout
                    continents={continents}
                    vaccine={vaccine}
                    onCloseButtonClick={handleCloseButtonClick}
                    onAdaptButtonClick={handleAdapt}
                />
            )}
        </div>
    )
}

export default Home

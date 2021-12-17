import React, {useEffect, useState} from "react";
import type {NextPage} from 'next'
import Link from "next/link"
import Image from "next/image";
import {SearchBar} from "@/components/main/SearchBar/SearchBar";
import {TextView} from "@/components/main/TextView/TextView";
import {BottomSlider} from "@/components/main/Slider/BottomSlider";
import {DropdownFilter} from "@/components/main/Filter/DropdownFilter";
import {TravelItem} from "@/components/main/Item/TravelItem";
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
import pari from "@/assets/image/paris.svg";
import yellow from "@/assets/image/yello_image.svg";
import s from './home.module.scss'
import data from "../content/index.json";
import {CountryType} from "@/type/countryType";

const Home: NextPage = () => {

    const [isVisibleFilter, setIsVisibleFilter] = useState(false);
    const [viewType, setViewType] = useState<ViewType>('LOCATION');
    const [sortType, setSortType] = useState<'recently' | 'older' | 'less' | 'many'>('recently')

    const [continents, setContinents] = useState<ContinentType[]>([]);

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

    const [country, setCountry] = useState<CountryType[]>([]);

    const sortItems = [
        {
            name: '최근 추가 순',
            value: 'recently'
        },
        {
            name: '오래된 순',
            value: 'older'
        },
        {
            name: '준비 서류 적은 순',
            value: 'less'
        },
        {
            name: '준비 서류 많은 순',
            value: 'many'
        }
    ]


    useEffect(() => {
        const continentsSet = new Set<string>();
        data.vaccine.forEach(it => {
            continentsSet.add(it.continent);
        });
        const _continents = [...continentsSet.values()].map((it, index) => ({
            id: index,
            name: it,
            isSelect: false
        }))
        setContinents(_continents);
    }, [])

    useEffect(() => {
        let _country: CountryType[] = data.vaccine.map(it => ({
            key: it.key + "",
            country: it.country,
            continent: it.continent,
            city: it.country,
            preparation: it.preparationList.map(p => p.content),
            vaccine: it.referenceList[0]?.content ?? '',
            image: it.image,
            updateDate: it.updateDate
        }))

        if (continents.filter(it => it.isSelect).length > 0) {
            _country = _country.filter(it => continents.filter(c => c.isSelect).some(c => c.name === it.continent));
        }

        switch (sortType) {
            case "recently": {
                _country = _country.sort(
                    (a, b) => Date.parse(b.updateDate) - Date.parse(a.updateDate)
                )
                break;
            }
            case "older": {
                _country = _country.sort(
                    (a, b) => Date.parse(a.updateDate) - Date.parse(b.updateDate)
                )
                break;
            }
            case "less": {
                _country = _country.sort(
                    (a, b) => a.preparation.length - b.preparation.length
                )
                break;
            }
            case "many": {
                _country = _country.sort(
                    (a, b) => b.preparation.length - a.preparation.length
                )
                break;
            }
        }

        setCountry(_country);
    }, [continents, sortType])

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

    const handleFilterClick = () => {
        setIsVisibleFilter(true);
    }

    const handleCloseButtonClick = () => {
        setIsVisibleFilter(false);
    }

    const handleAdapt = (continents: ContinentType[], vaccines: VaccineType[]) => {
        setContinents(continents);
        setVaccine(vaccines)
    }

    const handleSortClick = (value: string | number) => {
        if (
            value !== 'recently' &&
            value !== 'older' &&
            value !== 'less' &&
            value !== 'many'
        ) {
            return;
        }

        setSortType(value);
    }

    const renderLocationViewType = () => {
        return (
            <div className={s.mainWrap}>
                <div className={s.mainImageArea}>
                    <TextView className={s.mainText}>
                        싱가폴 <br/>
                        갈 수 있나?
                    </TextView>
                    <button className={s.travelButton}>
                        <TextView className={s.text}>여행 지침 보기</TextView>
                        <Icon iconType={IconTypes.IC_ARROW_RIGHT_11}/>
                    </button>
                    <div className={s.symbol}>
                        <Image src={pari}/>
                    </div>
                    <div className={s.character}>
                        <Image src={yellow}/>
                    </div>

                </div>
                <div className={s.wrap}>
                    <BottomSlider className={s.bottomSlider}>
                        <nav className={s.topFilter}>
                            {
                                continents.some(it => it.isSelect) || vaccine.some(it => it.isSelect)
                                    ? (
                                        <RoundButton onClick={handleFilterClick}
                                                     className={classNames(s.filter, s.filterButton)}>
                                            <Icon iconType={IconTypes.FILTER_16}/>
                                        </RoundButton>
                                    )
                                    : (
                                        <RoundButton onClick={handleFilterClick}
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
                                filterItems={sortItems}
                                value={sortType}
                                onSortItemClick={handleSortClick}
                            />
                        </div>
                        <div className={s.itemList}>
                            {country.map((c) => (
                                <Link key={c.key} href={`/detail/${c.key}`}>
                                    <a>
                                        <TravelItem
                                            className={s.item}
                                            country={c.country}
                                            continent={c.continent}
                                            city={c.city}
                                            preparationCount={c.preparation.length}
                                            vaccination={c.vaccine}
                                            image={c.image}
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
                    className={s.filterLayout}
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

import s from "../../pages/home.module.scss";
import {TextView} from "@/components/main/TextView/TextView";
import Link from "next/link";
import Icon from "@/components/common/Icon/Icon";
import {IconTypes} from "@/components/common/Icon/iconTypes";
import Image from "next/image";
import foot from "@/assets/image/main-back-footer.svg";
import {BottomSlider} from "@/components/main/Slider/BottomSlider";
import {RoundButton} from "@/components/common/RoundButton/RoundButton";
import classNames from "classnames";
import {RoundFilter} from "@/components/main/Filter/RoundFilter";
import {DropdownFilter} from "@/components/main/Filter/DropdownFilter";
import {TravelItem} from "@/components/main/Item/TravelItem";
import React, {createRef, useEffect, useState} from "react";
import gal from "@/assets/image/gal.svg";
import soo from "@/assets/image/soo.svg";
import it from "@/assets/image/it.svg";
import na from "@/assets/image/na.svg";
import {ContinentType} from "@/type/continentType";
import {VaccineType} from "@/type/vaccineType";
import {CountryType} from "@/type/countryType";
import data from "../../content/index.json";

interface Props {
    isLabelVisible: boolean;
    setIsLabelVisible: (value: boolean) => void;
    setIsVisibleFilter: (value: boolean) => void;
}

export const LocationView = ({isLabelVisible, setIsLabelVisible, setIsVisibleFilter}: Props) => {
    const scrollRef = createRef<HTMLDivElement>()

    const [countryIndex, setCountryIndex] = useState(0);
    const [characterIndex, setCharacterIndex] = useState(0);
    const [continents, setContinents] = useState<ContinentType[]>([]);
    const [vaccine, setVaccine] = useState<VaccineType[]>([]);
    const [country, setCountry] = useState<CountryType[]>([]);
    const [sortType, setSortType] = useState<'recently' | 'older' | 'less' | 'many'>('recently')

    const [character] = useState([
        gal, soo, it, na
    ])

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
        let _country: CountryType[] = data.main.map(it => ({
            key: it.key + "",
            country: it.country,
            continent: it.continent,
            city: it.country,
            preparation: it.preparationList.map(p => p.content),
            vaccine: it.vaccineList.map(v => ({
                id: v.id,
                name: v.content,
                isSelect: false
            })),
            image: it.image,
            updateDate: it.updateDate
        }))

        if (continents.filter(it => it.isSelect).length > 0) {
            _country = _country.filter(it => continents.filter(c => c.isSelect).some(c => c.name === it.continent));
        }

        if (vaccine.filter(it => it.isSelect).length > 0) {
            _country = _country.filter(it => vaccine.filter(v => v.isSelect).some(v => it.vaccine.findIndex(iv => iv.id === v.id) >= 0));
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
    }, [continents, sortType, vaccine])


    useEffect(() => {
        const continentsSet = new Set<string>();
        data.main.forEach(it => {
            continentsSet.add(it.continent);
        });
        const _continents = [...continentsSet.values()].map((it, index) => ({
            id: index,
            name: it,
            isSelect: false
        }))

        const _vaccineList = [...Object.values(data.vaccine)].map(it => ({
            id: it.id,
            name: it.content,
            isSelect: false
        }));

        setContinents(_continents);
        setVaccine(_vaccineList);
    }, [])


    useEffect(() => {

        let index = 0;

        if (country) {
            const interval = setInterval(() => {
                index++;
                const _index = index % country.length;
                const _characterIndex = index % character.length;
                setCountryIndex(_index);
                setCharacterIndex(_characterIndex);
            }, 2000);

            return () => clearInterval(interval);
        }
    }, [country])

    useEffect(() => {

        const listener = () => {
            const scrollTop = scrollRef.current?.scrollTop ?? 0;

            window.requestAnimationFrame(() => {
                if (scrollTop > 450) {
                    setIsLabelVisible(true)
                } else {
                    setIsLabelVisible(false)
                }
            })
        }

        if (scrollRef) {
            scrollRef.current?.addEventListener('scroll', listener);
            return scrollRef.current?.removeEventListener('scroll', () => listener)
        }
    }, [scrollRef])

    const handleFilterClick = () => {
        setIsVisibleFilter(true);
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

    return (
        <>
            <div className={s.topLabelArea}>
                {isLabelVisible && "갈 수 있나?"}
            </div>
            <div className={s.mainWrap} ref={scrollRef}>
                <div className={s.mainImageArea}>
                    <div className={s.topAnimationWrap}>
                        <div className={s.textWrap}>
                            <TextView className={s.mainText}>
                                {country[countryIndex]?.country} <br/>
                                갈 수 있나?
                            </TextView>
                            <div className={s.travelButton}>
                                <Link href={`/detail/${country[countryIndex]?.key}`}>
                                    <a>
                                        <TextView className={s.text}>여행 지침 보기</TextView>
                                        <Icon iconType={IconTypes.IC_ARROW_RIGHT_11}/>
                                    </a>
                                </Link>
                            </div>
                        </div>
                        <div className={s.character}>
                            <Image src={character[characterIndex]}/>
                        </div>
                        <div className={s.characterFooter}>
                            <Image src={foot}/>
                        </div>
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
        </>
    );
}
import React, {useEffect, useState} from "react";
import s from "./filter-layout.module.scss";
import {DomProps} from "@/lib/DomProps";
import {CloseButton} from "@/components/common/CloseButton/CloseButton";
import {TextView} from "@/components/main/TextView/TextView";
import {RoundButton} from "@/components/common/RoundButton/RoundButton";
import classNames from "classnames";
import {ContinentType} from "@/type/continentType";
import {VaccineType} from "@/type/vaccineType";

interface Props extends DomProps {
    continents?: ContinentType[];
    vaccine?: VaccineType[]
    onCloseButtonClick?: () => void;
    onAdaptButtonClick?: (continents: ContinentType[], vaccine: VaccineType[]) => void;
}

export const FilterLayout: React.FC<Props> = (props) => {

    const [continents, setContinents] = useState(
        [
            {
                id: 'all',
                name: '전체',
                isSelect: props.continents?.every(it => !it.isSelect) ?? true
            },
            ...JSON.parse(JSON.stringify(props.continents ?? []))
        ]
    );

    const [selectContinentCount, setSelectContinentCount] = useState(0);

    const [vaccines, setVaccines] = useState([
        {
            id: 'all',
            name: '전체',
            isSelect: props.vaccine?.every(it => !it.isSelect) ?? true
        },
        ...JSON.parse(JSON.stringify(props.vaccine ?? []))
    ]);

    const [selectVaccineCount, setSelectVaccineCount] = useState(0);

    useEffect(() => {
        const k = continents.filter(it => it.id !== 'all').filter(it => it.isSelect).length;
        setSelectContinentCount(k);
    }, [continents])

    useEffect(() => {
        const k = vaccines.filter(it => it.id !== 'all').filter(it => it.isSelect).length;
        setSelectVaccineCount(k);
    }, [vaccines])

    const handleContinentClick = (id: string | number) => () => {
        const c = filterClick(continents, id);
        setContinents([...c]);
    }

    const handleVaccineClick = (id: string | number) => () => {
        const v = filterClick(vaccines, id);
        setVaccines([...v]);
    }

    const filterClick = (
        items: { id: string | number, name: string, isSelect: boolean }[],
        id: string | number
    ) => {
        const item = items.find(it => it.id === id);
        if (item) {
            if (item.id === 'all') {
                items.filter(it => it.id !== 'all').forEach(it => it.isSelect = false);
            } else {
                item.isSelect = !item.isSelect;
            }
        }

        const all = items.find(it => it.id === 'all');
        if (items.filter(it => it.id !== 'all').some(it => it.isSelect)) {
            if (all) {
                all.isSelect = false;
            }
        } else {
            if (all) {
                all.isSelect = true;
            }
        }

        return items;
    }

    const handleCloseButton = () => {
        props.onCloseButtonClick?.();
    }

    const handleClearClick = () => {
        const c = [
            {
                id: 'all',
                name: '전체',
                isSelect: props.continents?.every(it => !it.isSelect) ?? true
            },
            ...props.continents ?? []
        ];

        const v = [
            {
                id: 'all',
                name: '전체',
                isSelect: props.vaccine?.every(it => !it.isSelect) ?? true
            },
            ...props.vaccine ?? []
        ];

        setContinents(c);
        setVaccines(v);
        props.onCloseButtonClick?.();
    }

    const handleAdaptClick = () => {
        props.onAdaptButtonClick?.(
            continents.filter(it => it.id !== 'all'),
            vaccines.filter(it => it.id !== 'all')
        );
        props.onCloseButtonClick?.();
    }

    return (
        <div {...DomProps.extract(props, s.filterLayout)}>
            <CloseButton className={s.closeButton} onClick={handleCloseButton}/>
            <div className={s.wrap}>
                <div className={s.textWrap}>
                    <TextView className={s.title}>
                        자가격리 없이<br/>
                        여행갈 수 있는 도시를 찾아보세요!
                    </TextView>
                </div>
                <article className={s.continentWrap}>
                    <TextView className={s.label}>
                        대륙
                        {selectContinentCount > 0 && (
                            <TextView className={s.count}>{selectContinentCount}</TextView>
                        )}
                    </TextView>
                    <section className={s.continents}>
                        {continents.map(continent => (
                            <RoundButton
                                className={s.continentItem}
                                key={continent.id}
                                isSelect={continent.isSelect}
                                onClick={handleContinentClick(continent.id)}
                                clickable
                            >
                                {continent.name}
                            </RoundButton>
                        ))}
                    </section>
                </article>
                <article className={s.vaccineWrap}>
                    <TextView className={s.label}>
                        백신
                        {selectVaccineCount > 0 && (
                            <TextView className={s.count}>{selectVaccineCount}</TextView>
                        )}
                    </TextView>
                    <TextView className={s.guide}>
                        접종받은 백신을 선택해주세요.<br/>
                        해당 백신을 허용하는 도시만 찾아드려요.
                    </TextView>
                    <section className={s.vaccines}>
                        {vaccines.map(vaccine => (
                            <RoundButton
                                className={s.vaccine}
                                key={vaccine.id}
                                isSelect={vaccine.isSelect}
                                onClick={handleVaccineClick(vaccine.id)}
                                clickable
                            >
                                {vaccine.name}
                            </RoundButton>
                        ))}
                    </section>
                </article>
            </div>
            <div className={s.footerWrap}>
                <button className={classNames(s.clear, s.footerButton)} onClick={handleClearClick}>
                    초기화
                </button>
                <button className={classNames(s.adapt, s.footerButton)} onClick={handleAdaptClick}>
                    적용
                </button>
            </div>
        </div>
    )
}

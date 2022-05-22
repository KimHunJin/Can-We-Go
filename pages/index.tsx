import React, {useState} from "react";
import type {NextPage} from 'next'
import {FilterLayout} from "@/components/main/Filter/FilterLayout";
import {IconTypes} from "@/components/common/Icon/iconTypes";
import {ContinentType} from "@/type/continentType";
import {VaccineType} from "@/type/vaccineType";
import {FooterItem} from "@/components/main/Item/FooterItem";
import {ViewType} from "@/type/viewType";
import s from './home.module.scss'
import {InfoView} from "../fragment/main/InfoView";
import {LocationView} from "../fragment/main/LocationView";

const Home: NextPage = () => {

    const [isVisibleFilter, setIsVisibleFilter] = useState(false);
    const [viewType, setViewType] = useState<ViewType>('LOCATION');
    const [isLabelVisible, setIsLabelVisible] = useState(false);

    const [continents, setContinents] = useState<ContinentType[]>([]);

    const [vaccine, setVaccine] = useState<VaccineType[]>([]);


    const handleCloseButtonClick = () => {
        setIsVisibleFilter(false);
    }

    const handleAdapt = (continents: ContinentType[], vaccines: VaccineType[]) => {
        setContinents(continents);
        setVaccine(vaccines)
    }

    return (
        <div className={s.container}>
            {
                viewType === 'LOCATION'
                    ? <LocationView
                        isLabelVisible={isLabelVisible}
                        setIsLabelVisible={setIsLabelVisible}
                        setIsVisibleFilter={setIsVisibleFilter}/>
                    : <InfoView/>
            }
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
                        onClick={() => {
                            if (viewType === 'LOCATION') {
                                return;
                            }
                            setViewType('LOCATION');
                            setIsLabelVisible(false)
                        }}
                    />
                    <FooterItem
                        text="여행정보"
                        iconType={IconTypes.INFO_24}
                        iconHoverType={IconTypes.INFO_HOVER_24}
                        isSelect={viewType === 'INFO'}
                        onClick={() => {
                            if (viewType === 'INFO') {
                                return;
                            }
                            setViewType('INFO');
                            setIsLabelVisible(false)
                        }}
                    />
                </div>
            )}
        </div>
    )
}

export default Home

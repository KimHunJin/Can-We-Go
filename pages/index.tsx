import type {NextPage} from 'next'
import Link from "next/link"
import {Circle} from "@/components/main/Circle/Circle";
import {SearchBar} from "@/components/main/SearchBar/SearchBar";
import {TextView} from "@/components/main/TextView/TextView";
import {BottomSlider} from "@/components/main/Slider/BottomSlider";
import {RoundFilter} from "@/components/main/Filter/RoundFilter";
import {DropdownFilter} from "@/components/main/Filter/DropdownFilter";
import {TravelItem} from "@/components/main/Item/TravelItem";
import s from './home.module.scss'

const Home: NextPage = () => {
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
                            <RoundFilter
                                className={s.filter}
                                filterItems={[{name: "대륙전체", value: -1}]}
                                value={-1}
                            />
                            <RoundFilter
                                className={s.filter}
                                filterItems={[{name: "백신전체", value: -1}]}
                                value={-1}
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
                                <TravelItem key={index} className={s.item}/>
                            ))}
                        </div>
                    </BottomSlider>
                </div>
            </div>
        </div>
    )
}

export default Home

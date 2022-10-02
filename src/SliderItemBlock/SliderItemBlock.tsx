import React, { ChangeEvent, FocusEvent } from 'react'
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import styles from './SliderItemBlock.module.scss'

type PropsType = {
    title: string
    state: number
    setState: (value: number) => void
    min: number
    max: number
    item: string
    backgroundForItem?: boolean
}

export const SliderItemBlock: React.FC<PropsType> = ({ title, state, setState, min, max, item, backgroundForItem }) => {

    const handleChangeSlider = (e: any) => setState(e)

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.valueAsNumber
        setState(value)
    }

    const handleOnBlur = (e: FocusEvent<HTMLInputElement>) => {
        const value = e.target.valueAsNumber
        if (value > max) setState(max)
        if (value < min || !value) setState(min)
    }

    const orange = '#FF9514'

    const handleStyle = {
        backgroundColor: orange,
        marginTop: '-8px',
        opacity: '1',
        height: '17px',
        width: '17px',
        border: 'none',
        boxShadow: 'none'
    }

    return (
        <div className={styles.item}>
            <span className={styles.item__title}>{title}</span>
            <div>
                <div className={styles.item__price}>
                    <input
                        type={'number'}
                        className={styles.item__input}
                        value={state}
                        onChange={handleChange}
                        onBlur={handleOnBlur}
                    />
                    <span className={backgroundForItem ? styles.input__itemBack : styles.input__item}>
                        {item}
                    </span>
                </div>
                <div className={styles.slider}>
                    <Slider
                        min={min}
                        max={max}
                        value={state}
                        trackStyle={{ backgroundColor: orange, height: '2px' }}
                        handleStyle={handleStyle}
                        activeDotStyle={{ backgroundColor: orange }}
                        railStyle={{ height: '2px' }}
                        onChange={handleChangeSlider}
                    />
                </div>
            </div>
        </div>
    )
}


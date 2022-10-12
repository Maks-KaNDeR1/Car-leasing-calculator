import React, { ChangeEvent, FocusEvent } from 'react'
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import styles from './SliderItemBlock.module.scss'
import { numbFmt, strFmt } from '../utils/formatСonversion';

type PropsType = {
    title: string
    state: number
    setState: (value: string) => void
    min: number
    max: number
    item: string
    backgroundForItem?: boolean
    maxLengthInput?: number
}

export const SliderItemBlock: React.FC<PropsType> = (
    {
        title,
        state,
        setState,
        min,
        max,
        item,
        backgroundForItem,
        maxLengthInput
    }) => {

    const digit = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'Backspace']

    const handleChangeSlider = (e: any) => {
        setState(e)
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value

        const ev = value.length === 1 ? value : value.slice(-1)

        if (digit.includes(ev)) setState(value)
        else return
    }

    const handleOnBlur = (e: FocusEvent<HTMLInputElement>) => {
        const value = numbFmt(e.target.value)
        if (value > max) setState(strFmt(max))
        if (value < min || !value) setState(strFmt(min))
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
                        maxLength={maxLengthInput}
                        className={styles.item__input}
                        value={strFmt(state)}
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


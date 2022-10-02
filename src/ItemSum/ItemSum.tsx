import React from 'react'
import styles from './ItemSum.module.scss'

type PropsType = {
    title: string
    state: number
    setState: (value: number) => void
}

export const ItemSum: React.FC<PropsType> = ({ title, state, setState }) => {

    return (
        <div className={styles.item}>
            <span className={styles.item__title}>{title}</span>
            <div className={styles.item__price}>{state} <span> ₽ </span></div>
        </div>
    )
}

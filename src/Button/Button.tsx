import React from 'react'
import styles from './Button.module.scss'

type PropsType = {
    title: string
    loading: boolean
    request: () => void
}

export const Button: React.FC<PropsType> = ({ title, loading, request }) => {

    const handleClick = () => request()

    return (
        <div className={styles.button} >
            <button onClick={handleClick}>
                {
                    loading
                        ? <i className="fa fa-circle-o-notch fa-spin"></i>
                        : title
                }
            </button>
        </div>)

}

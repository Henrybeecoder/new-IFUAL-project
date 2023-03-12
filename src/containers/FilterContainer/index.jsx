import React from 'react'
import styles from "./style.module.css"

export default function FilterContainer (props) {
    return (
        <div className={styles.filterContainerBackground}>
        <div className={styles.filterContainer}>
            <div className={styles.filterHeader}>
        <p>Filter</p>
    </div>
 {props.children}
        </div>
        </div>
    )
}
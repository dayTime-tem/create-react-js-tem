import React from "react";
import style from './index.module.less'
import {CommitList} from "../../components";
const MinPage = (props) => {
    return (
        <div className={style.content}>
            <CommitList />
        </div>
    )
}
export default MinPage
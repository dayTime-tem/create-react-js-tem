import React from "react";
import classNames from "classnames";
import style from './index.module.less'
import { UserHandleCard } from '../widget'

const HeaderCustom = (props) => {
    return (
        <div className={classNames(style.topHeader)}>
            <div className={classNames(style.leftTitle)}>四川省网信企业数据库</div>
            <div className={classNames(style.rightUser)}>
                <UserHandleCard {...props} />
            </div>
        </div>
    )
}
export default HeaderCustom
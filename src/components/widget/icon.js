/**
 * @Author: dayTimeAffect
 * @Date: 2021/11/18
 */
import React from "react";
import Icon from '@ant-design/icons';
function CustomIcon({icon, size = 18}){
    return (
        <Icon style={{width: size, height: size, textAlign: 'center', display: 'inline-block'}} component={() => <img src={icon} width={size} height={size} alt="icon"/>} />
    )
}
export default CustomIcon
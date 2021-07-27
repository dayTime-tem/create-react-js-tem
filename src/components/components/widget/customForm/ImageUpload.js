/**
 * @Author: dayTimeAffect
 * @Date: 2021/7/23
 */
import React, {useEffect, useState} from "react";
import {Upload as ExternalUpload} from "../../external/upload";
import {Progress, Skeleton} from "antd";
import {getUploadToken} from "@/service";
import {errorTip} from "@/utils"
import { Img } from "@/components/widget"
const ImageUpload = (props) => {
    const {value, onChange} = props
    const [pro, setPro] = useState(0)
    const [uptoken, setUptoken] = useState('')
    useEffect(() => {
        getUploadToken().then(res => {
            if (!res.uptoken) return errorTip("token获取失败")
            setUptoken(res.uptoken || '')
        })
    }, [])
    const upload = ({progress, url, name}, params) => {
        setPro(progress / 1)
        if (url){
            const nextData = [...(params.value || []), { title: name, url: url }]
            onChange(nextData)
        }
    }
    const del = ({url}) => {
        onChange(value.filter(v => v.url !== url))
    }
    const beforeUpload = () => {
        setPro(1)
    }
    return (
        <div>
            {uptoken ?
            <ExternalUpload
                domain={window.CONFIG.qiniuDomain}
                uptoken={uptoken}
                fileTypes="jpg,jpeg,png,bmp"
                onChange={upload}
                fileSize={"2mb"}
                tips={"大小不超过2M(仅支持JPG、JPEG、BMP、PNG格式)"}
                beforeUpload={beforeUpload}
                value={value}
            >上传图片</ExternalUpload> :
                <div><Skeleton.Button active shape="default" /></div>}
            {pro >= 10 ? <Progress type="line" strokeColor={{'0%': '#108ee9', '100%': '#87d068',}} percent={pro}/> : ''}

            <div style={{marginTop: 6}}>
                <Img data={value || []} del={del} />
            </div>
        </div>
    )
}
export default React.memo(ImageUpload)
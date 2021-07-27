/**
 * @Author: dayTimeAffect
 * @Date: 2021/7/26
 */
import React, {useEffect, useState} from "react";
import {Upload as ExternalUpload} from "../../external/upload";
import {Progress, Skeleton } from "antd";
import { LinkOutlined, DeleteOutlined } from "@ant-design/icons"
import style from "./index.module.less"
import {getUploadToken} from "@/service";
import {errorTip} from "@/utils"
const VideoUpload = (props) => {
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
                fileTypes="MP4,mp4"
                onChange={upload}
                fileSize={"300mb"}
                tips={"请选择mp4格式，大小不超过300M"}
                beforeUpload={beforeUpload}
                value={value}
            >上传视频</ExternalUpload> :
                <div><Skeleton.Button active shape="default" /></div>
            }
            {pro >= 10 ? <Progress type="line" strokeColor={{'0%': '#108ee9', '100%': '#87d068',}} percent={pro}/> : ''}
            <div>
                {   (value || [])
                    .map(v => (
                        <div className={style.fileInfo} key={v.url}>
                            <LinkOutlined />
                            <a rel="noopener noreferrer" className={style.link} target="_blank" href={v.url}>{v.title}</a>
                            <DeleteOutlined className={style.del} onClick={() => del(v)} />
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
export default React.memo(VideoUpload)
/*
* 新建、编辑稿件上传组件。translate为true代表是视频。视频因为要转码而且涉及到token文件名的问题，所以不能多选
* */
import React from 'react';
import {Button, message} from 'antd';

class Upload extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            progressing: false
        }
        this.buttonId = "uploadBtn" + parseInt(Math.random() * 100000);
    }

    componentDidMount() {
		if (!window.QiniuJsSDK){
    		return message.warning("文件上传初始化失败")
		}
        const _this = this;
        const {domain, fileTypes, onChange, fileSize, translate = false, uptoken, beforeUpload} = this.props;
        const videoName = "video" + new Date().getTime() + Math.floor((Math.random() * 9 + 1) * 100000);
        const Qiniu = new window.QiniuJsSDK();
        const self = this
		this.uploader = Qiniu.uploader({
			runtimes: 'html5,flash,html4',
			browse_button: this.buttonId,
			uptoken: uptoken,
			// uptoken_url: translate ? (origin + "/common/makeVideoUptoken/" + videoName + "?iscoverajax=true") : (origin + "/common/uptoken?iscoverajax=true"),
			domain: domain,
			get_new_uptoken: false,
			multi_selection: !translate,
			flash_swf_url: '/plugin/plupload/Moxie.swf',  //引入flash,相对路径
			unique_names: false,
			save_key: false,
			max_retries: 0,
			dragdrop: false,
			chunk_size: '4mb',
			auto_start: true,
			filters: {
				max_file_size: fileSize || '1000mb',
				mime_types: [{
					title: "",
					extensions: fileTypes
				}]
			},
			init: {
				'FilesAdded': function (up, files) {
				},
				'BeforeUpload': function (up, files) {
					if (beforeUpload){
						beforeUpload(files)
					}
				},
				'Error': function (up, err, errTip) {
					if (err.code === -600) {
						var tipMax = up.settings.filters.max_file_size;
						message.warning('请上传不超过' + tipMax + '大小的文件!');
					} else {
						message.warning(err.message);
					}
				},
				'UploadProgress': function (up, file) {
					onChange({
						progress: file.percent,
						url: false
					});
					_this.setState({
						progressing: true
					})
				},
				'FileUploaded': function (up, file, info) {
					const domain = up.getOption('domain');
					const res = JSON.parse(info);
					const sourceLink = domain + res.key; //获取上传成功后的文件的Url
					onChange({
						progress: false,
						url: translate ? domain + videoName + ".mp4" : sourceLink,
						taskId: res.persistentId,
						name: file.name
					}, self.props);
				},
				'UploadComplete': function (up, files, info) {
					onChange({
						progress: false,
						url: false
					});
					_this.setState({
						progressing: false
					})
				},
				'Key': function (up, file) {
					const l = file.name.split(".");
					const type = l[l.length - 1].toLocaleLowerCase();
					return parseInt(Math.random() * 10000) + "_" + Date.parse(new Date()) + "." + type;
				}
			}
		});
    }

	render() {
        const {progressing} = this.state;
        const {className, tips, disabled} = this.props
		return (
            <div>
				<Button className={className} disabled={disabled || progressing} id={this.buttonId}  style={{background: '#35a57c', color: '#fff'}}
				>{this.props.children}</Button>
				{tips && <span style={{marginLeft: 8}}>{tips}</span>}
			</div>
        )
    }
}

export {Upload};
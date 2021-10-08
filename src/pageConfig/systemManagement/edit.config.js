/**
 * @Author: dayTimeAffect
 * @Date: 2021/9/26
 */
import {formValidationNumber, tipQuestion} from "@/utils";

const companyType = [
    {id: 0, name: '有限责任公司'},
    {id: 1, name: '股份有限公司'},
    {id: 2, name: '集体所有制'},
    {id: 3, name: '股份合作制'},
    {id: 4, name: '国有企业'},
    {id: 5, name: '个体工商户'},
    {id: 6, name: '个人独资企业'},
    {id: 7, name: '有限合伙'},
    {id: 8, name: '普通合伙'},
    {id: 9, name: '外商投资企业'},
    {id: 10, name: '港、澳、台'},
    {id: 11, name: '联营企业'},
    {id: 12, name: '私营企业'},
]

const industry = [
    {id: 0, name: '全选'},
    {id: 1, name: '电信、广播电视和卫星传输服务'},
    {id: 2, name: '计算机、通信和其他电子设备制造业'},
    {id: 3, name: '科技推广和应用服务业'},
    {id: 4, name: '批发业'},
    {id: 5, name: '软件和信息技术服务业'},
    {id: 6, name: '商务服务业'},
    {id: 7, name: '研究和试验发展'},
    {id: 8, name: '专业技术服务业'},
]
const companyStatus = [
    {id: 0, name: '存续(在营、开业、在业)'},
    {id: 1, name: '吊销'},
    {id: 2, name: '注销'},
    {id: 3, name: '停业'},
    {id: 4, name: '撤销'},
    {id: 5, name: '迁入'},
    {id: 6, name: '迁出'},
]
const financing = [
    {id: 0, name: '未融资'},
    {id: 1, name: '天使/种子轮'},
    {id: 2, name: 'PreA至A+轮'},
    {id: 3, name: 'PreB至B+轮'},
    {id: 4, name: 'C轮及以上'},
    {id: 5, name: 'IPO上市'},
    {id: 6, name: '并购/合并'},
    {id: 7, name: '战略融资/投资'},
    {id: 8, name: '股权融资/转让'},
    {id: 9, name: '定向增发'},
    {id: 10, name: '其他'},
]
const market = [
    {id: 0, name: '未上市'},
    {id: 1, name: 'A股'},
    {id: 2, name: '中概股'},
    {id: 3, name: '港股'},
    {id: 4, name: '科创板'},
    {id: 5, name: '新三板'},
    {id: 6, name: '新四板'},
]
const track = [
    {id: 0, name: '互联网基础软硬件'},
    {id: 1, name: '互联网前沿技术与平台'},
    {id: 2, name: '网络安全'},
    {id: 3, name: '网络信息服务'},
    {id: 4, name: '人工智能'},
    {id: 5, name: '大数据'},
    {id: 6, name: '云计算'},
    {id: 7, name: '互联网+'},
]


export const editFiled = [
    {
        title: '企业基本信息',
        filed: [
            {type: 'input', filed: '企业名称', name: '企业名称', className: 'whole', required: true},
            {type: 'input', filed: '注册资本', name: '注册资本(万人名币)', required: true, validator: formValidationNumber},
            {type: 'date', filed: '注册时间', name: '注册时间', required: true},
            {type: 'input', filed: '省/市/区', name: '省/市/区', required: true},
            {type: 'select', filed: '公司类型', name: '公司类型', required: true, options: companyType},
            {type: 'select', filed: '行业', name: '行业', required: true, options: industry, mode: 'multiple'},
            {type: 'input', filed: '法人', name: '法人', required: true},
            {type: 'select', filed: '企业状态', name: '企业状态', required: true, options: companyStatus},
            {type: 'check', filed: '所属赛道', name: '所属赛道', required: true, options: track, className: 'whole'},
        ]
    },
    {
        title: '企业团队情况',
        filed: [
            {type: 'input', filed: '参保人数', name: '参保人数', required: true, validator: formValidationNumber},
        ]
    },
    {
        title: '企业技术水平',
        filed: [
            {type: 'input', filed: '专利数量', name: '专利数量', required: true, tip: tipQuestion('区分发明专利和实用新性专利(个)'), validator: formValidationNumber},
        ]
    },
    {
        title: '企业融资情况',
        filed: [
            {type: 'select', filed: '轮次', name: '轮次', required: true, options: financing},
            {type: 'select', filed: '是否上市', name: '是否上市', required: true, options: market},
        ]
    },
    {
        title: '企业风险状况',
        filed: [
            {type: 'multitermInputModal', filed: '司法风险', name: '司法风险', inputType: 'textArea', className: 'whole'},
            {type: 'multitermInputModal', filed: '监管风险', name: '监管风险', inputType: 'textArea', className: 'whole'},
            {type: 'multitermInputModal', filed: '经营风险', name: '经营风险', inputType: 'textArea', className: 'whole'},
        ]
    },
    {
        title: '企业品牌建设',
        filed: [
            {type: 'multitermInputModal', filed: '获奖表彰', name: '获奖表彰', inputType: 'textArea', className: 'whole'},
            {type: 'multitermInputModal', filed: '负面舆论', name: '负面舆论', inputType: 'textArea', className: 'whole'},
        ]
    },
]
export const editProps = {
    beforeEdited: values => {
        return values
    }
}
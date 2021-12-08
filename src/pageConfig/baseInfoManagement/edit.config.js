/**
 * @Author: dayTimeAffect
 * @Date: 2021/9/26
 */
import {formValidationNumber, formValidationInteger} from "@/utils";
import {createFirm} from "../../service";
import moment from "moment";
import map from "./map";
import {
    social_security,
    quit_rate,
    professional_expansion_rate,
    performance_growth_rate,
    debt_ratio,
    research_proportion,
    survival_time,
    // finance_round,
    market,
    track,
    ratepaying_credit,
    fiscal_revenue
} from "./options"

const companyType = [
    {id: 1, name: '有限责任公司'},
    {id: 2, name: '股份有限公司'},
    {id: 3, name: '集体所有制'},
    {id: 4, name: '股份合作制'},
    {id: 5, name: '国有企业'},
    {id: 6, name: '个体工商户'},
    {id: 7, name: '个人独资企业'},
    {id: 8, name: '有限合伙'},
    {id: 9, name: '普通合伙'},
    {id: 10, name: '外商投资企业'},
    {id: 11, name: '港、澳、台'},
    {id: 12, name: '联营企业'},
    {id: 13, name: '私营企业'},
]
const industry = [
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
    {id: 1, name: '存续'},
    {id: 2, name: '吊销'},
    {id: 3, name: '注销'},
    {id: 4, name: '停业'},
    {id: 5, name: '撤销'},
    {id: 6, name: '迁入'},
    {id: 7, name: '迁出'},
]

const staticMap = Object.entries(map).map(([city, children]) => (
    {
        value: city,
        label: city,
        children: Object.entries(children).map(([district, children]) => ({
            value: district,
            label: district,
            children: children.map(v => ({value: v, label: v}))
        }))
    }
))

const editFiled = [
    {
        title: '企业基本信息',
        filed: [
            {type: 'input', filed: 'name', name: '企业名称', className: 'whole', required: true, defaultDetails: "暂无信息"},
            {type: 'input', filed: 'taxpayer_number', name: '纳税识别号', required: true, defaultDetails: "暂无信息"},
            {type: 'date', filed: 'register_time', name: '注册时间', required: true},
            {type: 'cascader', filed: 'region', name: '省/市/区', required: true, options: staticMap, className: 'whole', wrapperCol: {span: 6}, defaultDetails: "暂无信息"},
            {type: 'select', filed: 'enterprise_type', name: '公司类型', required: true, options: companyType, defaultDetails: "暂无信息"},
            {type: 'select', filed: 'industry', name: '行业', required: false, options: industry, mode: 'multiple', defaultDetails: "暂无信息"},
            {type: 'input', filed: 'juridical_person', name: '法人', required: false, defaultDetails: "暂无信息"},
            {type: 'select', filed: 'enterprise_status', name: '企业状态', required: true, options: companyStatus, defaultDetails: "暂无信息"},
            {type: 'checkRange', filed: 'track', name: '所属赛道', required: false, options: track, className: 'whole', defaultDetails: "暂无信息"},
            {type: 'input', filed: 'finance_round', name: '融资轮次', defaultDetails: "暂无信息", validator: formValidationInteger},
            {type: 'multitermInputModal', filed: 'capital_firm', name: '投资机构品牌', className: 'whole', defaultDetails: "暂无信息"},
            {type: 'select', filed: 'ratepaying_credit', name: '纳税信用评级', required: false, options: ratepaying_credit, defaultDetails: "暂无信息"},
            {type: 'select', filed: 'fiscal_revenue', name: '最新财年营收', required: false, options: fiscal_revenue, defaultDetails: "暂无信息"},

        ]
    },
    {
        title: '企业团队情况',
        filed: [
            {type: 'input', filed: 'insure', name: '参保人数', required: false, validator: formValidationNumber, defaultDetails: "暂无信息"},
        ]
    },
    {
        title: '企业技术水平',
        filed: [
            {type: 'input', filed: 'invent', name: '发明专利', required: false, validator: formValidationNumber, defaultDetails: "暂无信息"},
            {type: 'input', filed: 'utility_model', name: '实用新型专利', required: false, validator: formValidationNumber, defaultDetails: "暂无信息"},
            {type: 'input', filed: 'design', name: '外观专利', required: false, validator: formValidationNumber, defaultDetails: "暂无信息"},
            {type: 'input', filed: 'copyright', name: '著作权', required: false, validator: formValidationNumber, defaultDetails: "暂无信息"},
        ]
    },
    {
        title: '企业风险状况',
        filed: [
            {type: 'multitermInputModal', filed: 'judicial_risk', name: '司法风险', className: 'whole', defaultDetails: "暂无信息"},
            {type: 'multitermInputModal', filed: 'regulatory_risk', name: '监管风险', className: 'whole', defaultDetails: "暂无信息"},
            {type: 'multitermInputModal', filed: 'business_risk', name: '经营风险', className: 'whole', defaultDetails: "暂无信息"},
        ]
    },
    {
        title: '企业品牌建设',
        filed: [
            {type: 'multitermInputModal', filed: 'award', name: '荣誉奖项', className: 'whole', defaultDetails: "暂无信息"},
            {type: 'multitermInputModal', filed: 'negative_opinion', name: '负面舆情', className: 'whole', defaultDetails: "暂无信息"},
        ]
    },
    {
        title: '其他关键信息',
        filed: [
            {type: 'select', filed: 'social_security', name: '社保缴纳基数', options: social_security, defaultDetails: "暂无信息"},
            {type: 'select', filed: 'quit_rate', name: '离职率', options: quit_rate, defaultDetails: "暂无信息"},
            {type: 'select', filed: 'professional_expansion_rate', name: '研发人员扩张率', options: professional_expansion_rate, defaultDetails: "暂无信息"},
            {type: 'select', filed: 'performance_growth_rate', name: '(营收)业绩增长率', options: performance_growth_rate, defaultDetails: "暂无信息"},
            {type: 'select', filed: 'debt_ratio', name: '负债率', options: debt_ratio, defaultDetails: "暂无信息"},
            {type: 'select', filed: 'research_proportion', name: '研发费用占比', options: research_proportion, defaultDetails: "暂无信息"},
            {type: 'select', filed: 'survival_time', name: '存续时间', options: survival_time, defaultDetails: "暂无信息"},
            {type: 'input', filed: 'register_capital', name: '实缴注册资本(万人名币)', validator: formValidationNumber, defaultDetails: "暂无信息"},
            {type: 'select', filed: 'market', name: '上市阶段', options: market, defaultDetails: "暂无信息"},
        ]
    },
]
const editProps = {
    beforeEdited: values => {
        if (values['region'] && values['region'].length > 0){
            [values['province'], values['city'], values['area']] = values['region']
        }
        if (values['track']){
            values['track'] = values['track']?.options || []
        }
        values['finance_round'] = values['finance_round'] || null
        delete values['region']
        return values
    },
    beforeShowData: (values, {type}) => {
        if (type === "edit"){
            values['register_time'] = values['register_time'] ? moment(values['register_time']) : undefined
            values['award'] = values['award'] || []
            values['negative_opinion'] = values['negative_opinion'] || []
        }
        values['track'] = {options: values['track']}
        if (typeof values['industry'] === "number") values['industry'] = [values["industry"]]
        values['region'] = [values['province'], values['city'], values['area']]
        return values
    },
    // searchMethod: getFirmInfo, //查询详情api
    addMethod: createFirm, //新建api
    // saveMethod: editFirmInfo, //保存编辑api
    savePermission: 'can_add', //是否有编辑权限
    name: '企业信息'
}

export const editConfig = {
    editFiled, editProps
}
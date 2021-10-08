/**
 * @Author: dayTimeAffect
 * @Date: 2021/9/26
 */
import {formValidationNumber, tipQuestion} from "@/utils";
import {createFirm, editFirmInfo, getFirmInfo} from "../../service";
import moment from "moment";

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
const financing = [
    {id: 1, name: '未融资'},
    {id: 2, name: '天使/种子轮'},
    {id: 3, name: 'PreA至A+轮'},
    {id: 4, name: 'PreB至B+轮'},
    {id: 5, name: 'C轮及以上'},
    {id: 6, name: 'IPO上市'},
    {id: 7, name: '并购/合并'},
    {id: 8, name: '战略融资/投资'},
    {id: 9, name: '股权融资/转让'},
    {id: 10, name: '定向增发'},
    {id: 0, name: '其他'},
]
const market = [
    {id: 1, name: '未上市'},
    {id: 2, name: 'A股'},
    {id: 3, name: '中概股'},
    {id: 4, name: '港股'},
    {id: 5, name: '科创板'},
    {id: 6, name: '新三板'},
    {id: 7, name: '新四板'},
]
const track = [
    {id: 1, name: '互联网基础软硬件'},
    {id: 2, name: '互联网前沿技术与平台'},
    {id: 3, name: '网络安全'},
    {id: 4, name: '网络信息服务'},
    {id: 5, name: '人工智能'},
    {id: 6, name: '大数据'},
    {id: 7, name: '云计算'},
    {id: 8, name: '互联网+'},
]

let sichuan = {
    "四川省": {
        "成都市": ["锦江区", "青羊区", "金牛区", "武侯区", "成华区", "龙泉驿区", "青白江区", "新都区", "温江区", "双流区", "郫都区", "新津区", "金堂县", "大邑县", "蒲江县", "都江堰市", "彭州市", "邛崃市", "崇州市", "简阳市"],
        "自贡市": ["自流井区", "贡井区", "大安区", "沿滩区", "荣县", "富顺县"],
        "攀枝花市": ["东区", "西区", "仁和区", "米易县", "盐边县"],
        "泸州市": ["江阳区", "纳溪区", "龙马潭区", "泸县", "合江县", "叙永县", "古蔺县"],
        "德阳市": ["旌阳区", "罗江区", "中江县", "广汉市", "什邡市", "绵竹市"],
        "绵阳市": ["涪城区", "游仙区", "安州区", "三台县", "盐亭县", "梓潼县", "北川羌族自治县", "平武县", "江油市"],
        "广元市": ["利州区", "昭化区", "朝天区", "旺苍县", "青川县", "剑阁县", "苍溪县"],
        "遂宁市": ["船山区", "安居区", "蓬溪县", "大英县", "射洪市"],
        "内江市": ["市中区", "东兴区", "威远县", "资中县", "内江经济开发区", "隆昌市"],
        "乐山市": ["市中区", "沙湾区", "五通桥区", "金口河区", "犍为县", "井研县", "夹江县", "沐川县", "峨边彝族自治县", "马边彝族自治县", "峨眉山市"],
        "南充市": ["顺庆区", "高坪区", "嘉陵区", "南部县", "营山县", "蓬安县", "仪陇县", "西充县", "阆中市"],
        "眉山市": ["东坡区", "彭山区", "仁寿县", "洪雅县", "丹棱县", "青神县"],
        "宜宾市": ["翠屏区", "南溪区", "叙州区", "江安县", "长宁县", "高县", "珙县", "筠连县", "兴文县", "屏山县"],
        "广安市": ["广安区", "前锋区", "岳池县", "武胜县", "邻水县", "华蓥市"],
        "达州市": ["通川区", "达川区", "宣汉县", "开江县", "大竹县", "渠县", "达州经济开发区", "万源市"],
        "雅安市": ["雨城区", "名山区", "荥经县", "汉源县", "石棉县", "天全县", "芦山县", "宝兴县"],
        "巴中市": ["巴州区", "恩阳区", "通江县", "南江县", "平昌县", "巴中经济开发区"],
        "资阳市": ["雁江区", "安岳县", "乐至县"],
        "阿坝藏族羌族自治州": ["马尔康市", "汶川县", "理县", "茂县", "松潘县", "九寨沟县", "金川县", "小金县", "黑水县", "壤塘县", "阿坝县", "若尔盖县", "红原县"],
        "甘孜藏族自治州": ["康定市", "泸定县", "丹巴县", "九龙县", "雅江县", "道孚县", "炉霍县", "甘孜县", "新龙县", "德格县", "白玉县", "石渠县", "色达县", "理塘县", "巴塘县", "乡城县", "稻城县", "得荣县"],
        "凉山彝族自治州": ["西昌市", "木里藏族自治县", "盐源县", "德昌县", "会理县", "会东县", "宁南县", "普格县", "布拖县", "金阳县", "昭觉县", "喜德县", "冕宁县", "越西县", "甘洛县", "美姑县", "雷波县"]
    }
}

const staticMap = Object.entries(sichuan).map(([city, children]) => (
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

export const editFiled = [
    {
        title: '企业基本信息',
        filed: [
            {type: 'input', filed: 'name', name: '企业名称', className: 'whole', required: true},
            {type: 'input', filed: 'register_capital', name: '注册资本(万人名币)', required: true, validator: formValidationNumber},
            {type: 'date', filed: 'register_time', name: '注册时间', required: true},
            {type: 'cascader', filed: 'region', name: '省/市/区', required: true, options: staticMap, className: 'whole', wrapperCol: {span: 6}},
            {type: 'select', filed: 'enterprise_type', name: '公司类型', required: true, options: companyType},
            {type: 'select', filed: 'industry', name: '行业', required: true, options: industry, mode: 'multiple'},
            {type: 'input', filed: 'juridical_person', name: '法人', required: true},
            {type: 'select', filed: 'enterprise_status', name: '企业状态', required: true, options: companyStatus},
            {type: 'check', filed: 'track', name: '所属赛道', required: true, options: track, className: 'whole'},
        ]
    },
    {
        title: '企业团队情况',
        filed: [
            {type: 'input', filed: 'insure', name: '参保人数', required: true, validator: formValidationNumber},
        ]
    },
    {
        title: '企业技术水平',
        filed: [
            {type: 'input', filed: 'patent', name: '专利数量', required: true, tip: tipQuestion('区分发明专利和实用新性专利(个)'), validator: formValidationNumber},
            {type: 'input', filed: 'copyright', name: '著作权数量', required: true, validator: formValidationNumber},
        ]
    },
    {
        title: '企业融资情况',
        filed: [
            {type: 'select', filed: 'finance_round', name: '轮次', required: true, options: financing},
            {type: 'select', filed: 'market', name: '是否上市', required: true, options: market},
        ]
    },
    {
        title: '企业风险状况',
        filed: [
            {type: 'multitermInputModal', filed: 'judicial_risk', name: '司法风险', className: 'whole'},
            {type: 'multitermInputModal', filed: 'regulatory_risk', name: '监管风险', className: 'whole'},
            {type: 'multitermInputModal', filed: 'business_risk', name: '经营风险', inputType: 'textArea', className: 'whole'},
        ]
    },
    {
        title: '企业品牌建设',
        filed: [
            {type: 'multitermInputModal', filed: 'award', name: '获奖表彰', className: 'whole'},
            {type: 'multitermInputModal', filed: 'negative_opinion', name: '负面舆论', className: 'whole'},
        ]
    },
]
export const editProps = {
    beforeEdited: values => {
        if (values['region'] && values['region'].length > 0){
            [values['province'], values['city'], values['area']] = values['region']
        }
        if (values['track']){
            values['track'] = values['track']?.options || []
        }
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
    searchMethod: getFirmInfo,
    addMethod: createFirm,
    saveMethod: editFirmInfo,
}
/**
 * Mock Doubao (豆包) API service with graceful fallback.
 * In production, this would call the real API endpoint.
 * On failure / timeout, it falls back to local template combinations.
 */

// ===== Title Generator =====
const titleFormulas = [
  '{n}天后我发现，{evidence}',
  '结婚{n}年才知道，{evidence}',
  '重生第{n}次，{evidence}',
  '穿越后第{n}天，{evidence}',
  '失忆{n}个月后，{evidence}',
]

const titleEvidences = [
  '我老公竟然是首富',
  '婆婆其实是亲妈',
  '死对头一直暗恋我',
  '全家都在演我',
  '我才是真正的千金',
  '我女儿不是亲生的',
  '管家是幕后黑手',
  '我居然是反派',
  '闺蜜其实是亲妹妹',
  '前夫一直在我身边',
]

export async function callDoubaoTitle(keyword = '') {
  await new Promise((r) => setTimeout(r, 400 + Math.random() * 600))
  // 90% 成功率，10% 模拟接口降级
  if (Math.random() < 0.1) throw new Error('接口超时，降级到本地模板')

  const generate = () => {
    const f = titleFormulas[Math.floor(Math.random() * titleFormulas.length)]
    const n = Math.floor(Math.random() * 30) + 1
    const ev = titleEvidences[Math.floor(Math.random() * titleEvidences.length)]
    let title = f.replace('{n}', n).replace('{evidence}', ev)
    if (keyword) title = `${keyword}·${title}`
    return title
  }
  return Array.from({ length: 5 }, generate)
}

export function fallbackTitle(keyword = '') {
  return Array.from({ length: 5 }, () => {
    const f = titleFormulas[Math.floor(Math.random() * titleFormulas.length)]
    const n = Math.floor(Math.random() * 30) + 1
    const ev = titleEvidences[Math.floor(Math.random() * titleEvidences.length)]
    let title = f.replace('{n}', n).replace('{evidence}', ev)
    if (keyword) title = `${keyword}·${title}`
    return title
  })
}

// ===== Character Seed =====
const professions = [
  '外科医生', '刑警队长', '互联网CEO', '金融分析师', '法医',
  '心理医生', '幼儿园老师', '电竞选手', '健身教练', '兽医',
  '考古学者', '舞蹈演员', '调酒师', '花艺师', '飞行员',
]

const contrasts = [
  '偏执型恋爱脑', '社恐顶级话痨', '洁癖囤积狂', '素食主义杀手',
  '社恐顶级网红', '恐高攀岩冠军', '色弱修图师', '路痴网约车司机',
  '失忆症患者侦探', '讨好型反社会', '手语翻译脱口秀', '夜盲值夜班',
]

const secrets = [
  '祖传玉佩藏地图', '真实身份是私生子', '左眼能看见死者记忆',
  '其实是跨国卧底', '银行账户有百亿', '每天偷偷资助孤儿院',
  '收藏着凶器陈列室', '身体里有三重人格', '梦里能预知死亡',
  '有个一模一样的双胞胎', '手机备忘录全是遗书草稿', '地下室锁着一个"自己"',
]

export async function callDoubaoChar() {
  await new Promise((r) => setTimeout(r, 300 + Math.random() * 400))
  if (Math.random() < 0.1) throw new Error('接口超时，降级到本地模板')
  const pick = (arr) => arr[Math.floor(Math.random() * arr.length)]
  return {
    profession: pick(professions),
    contrast: pick(contrasts),
    secret: pick(secrets),
  }
}

export function fallbackChar() {
  const pick = (arr) => arr[Math.floor(Math.random() * arr.length)]
  return {
    profession: pick(professions),
    contrast: pick(contrasts),
    secret: pick(secrets),
  }
}

// ===== Track Story =====
const trackTemplates = {
  female_suspense: {
    label: '女频悬疑',
    arcs: [
      '丈夫以为我只是个花瓶，却不知道我查清了他三任前妻的死因。',
      '穿越成豪门弃女，所有人都等着我去死，可他们不知道——真正的死者是上辈子的我。',
      '我死后第三年，闺蜜嫁了我前夫，可我的手机还在收到她的微信。',
      '嫁入豪门后发现：全家每个人的口供都对不上公公的死亡时间。',
      '我是一名入殓师，今天送来的遗体，和我长得一模一样。',
      '重生后第一件事，是去举报自己的亲生母亲。',
      '在丈夫的日记里，我看到自己的名字出现在"死者名单"第五页。',
    ],
  },
  male_urbane: {
    label: '男频都市',
    arcs: [
      '外卖小哥意外获得读心术，第一天就听到了女总裁的秘密。',
      '被前女友绿了之后，我收到了十年后的自己发来的短信。',
      '保安大叔退休那天，整栋大厦的董事长来给他敬酒。',
      '相亲对象骂我穷，三天后她公司被我全资收购了。',
      '我修了一辈子车，直到一辆劳斯莱斯车主跪下叫我师父。',
    ],
  },
  sweet_love: {
    label: '甜宠恋爱',
    arcs: [
      '总裁夫人又跑路了，助理颤抖着递上夫人留下的U盘——里面是董事长级别的机密。',
      '所有人都以为她是花瓶，直到她一个电话让跨国集团撤资。',
      '替嫁那天才知道，被替的双胞胎姐姐才是真正的小三。',
      '全网黑她是花瓶，结果她的马甲一个接一个掉：黑客大佬、赛车冠军、神秘作家。',
      '婚后三年总裁终于找到她，她已经带着三个缩小版的他跑路了。',
    ],
  },
  ancient: {
    label: '古风言情',
    arcs: [
      '重生嫡女回府第一夜，就撞见嫡母在后花园烧的是自己的画像。',
      '冷宫弃妃死后第三年，皇帝的龙椅下藏着她的血书。',
      '代嫁庶女入府三月，才知那"病弱世子"的药里被每日下毒。',
      '穿越成丫鬟，第一夜就发现小姐每晚变成了另一个人。',
      '太医院女医官查到皇后脉案，发现皇后竟然——没有心跳。',
    ],
  },
  revenge: {
    label: '复仇爽文',
    arcs: [
      '她死后五年从海外归来，前夫家正办婚宴——新娘穿着她的嫁衣。',
      '全网直播时，她当众甩出证据：杀害母亲的真凶正是主持人本人。',
      '跪了三年前婆婆求她复婚，她淡淡一笑：我今天是来送葬的。',
      '被全网骂"小三"三年后，她公布亲子鉴定：孩子是堂姐夫的。',
      '重生后第一个要报复的人，是上辈子最爱自己的那个。',
    ],
  },
}

export const trackOptions = [
  { id: 'female_suspense', label: '女频悬疑' },
  { id: 'male_urbane', label: '男频都市' },
  { id: 'sweet_love', label: '甜宠恋爱' },
  { id: 'ancient', label: '古风言情' },
  { id: 'revenge', label: '复仇爽文' },
]

export async function callDoubaoTrack(trackId, elements = '') {
  await new Promise((r) => setTimeout(r, 500 + Math.random() * 800))
  if (Math.random() < 0.1) throw new Error('接口超时，降级到本地模板')

  const tpl = trackTemplates[trackId]
  if (!tpl) throw new Error('未知赛道')

  // 随机抽 3 条
  const shuffled = [...tpl.arcs].sort(() => Math.random() - 0.5).slice(0, 3)
  if (elements) {
    return shuffled.map((s) => `【${elements}】${s}`)
  }
  return shuffled
}

export function fallbackTrack(trackId, elements = '') {
  const tpl = trackTemplates[trackId]
  if (!tpl) return ['未知赛道，请重试']
  const shuffled = [...tpl.arcs].sort(() => Math.random() - 0.5).slice(0, 3)
  if (elements) {
    return shuffled.map((s) => `【${elements}】${s}`)
  }
  return shuffled
}

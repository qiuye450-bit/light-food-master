import type { Recipe } from '../types'

export const recipes: Recipe[] = [
  // ===== 早餐 (12道) =====
  {
    id: 'b1', name: '燕麦蓝莓碗', calories: 285, category: 'breakfast',
    ingredients: ['即食燕麦', '蓝莓', '香蕉', '脱脂牛奶', '奇亚籽'],
    steps: ['燕麦片50g加脱脂牛奶200ml浸泡5分钟', '香蕉切片铺在燕麦上', '加入蓝莓和奇亚籽', '微波炉中火加热2分钟即可'],
    nutrition: { vegetables: 15, protein: 20, carbs: 65 },
    tags: ['高纤维', '快手早餐', '抗氧化'],
  },
  {
    id: 'b2', name: '全麦牛油果吐司', calories: 310, category: 'breakfast',
    ingredients: ['全麦面包', '牛油果', '鸡蛋', '小番茄', '黑胡椒'],
    steps: ['牛油果半个压成泥，加黑胡椒和少许盐调味', '全麦面包烤至微脆', '鸡蛋煎成太阳蛋', '面包抹上牛油果泥，放上太阳蛋和切半的小番茄'],
    nutrition: { vegetables: 20, protein: 25, carbs: 55 },
    tags: ['高蛋白', '优质脂肪', '网红早餐'],
  },
  {
    id: 'b3', name: '蔬菜鸡蛋饼', calories: 245, category: 'breakfast',
    ingredients: ['鸡蛋', '胡萝卜', '西葫芦', '全麦面粉', '葱花'],
    steps: ['胡萝卜和西葫芦擦丝', '鸡蛋2个打散，加入30g全麦面粉搅匀', '加入蔬菜丝和葱花、少许盐', '平底锅少油，倒入面糊摊平，中小火煎至两面金黄'],
    nutrition: { vegetables: 40, protein: 30, carbs: 30 },
    tags: ['高蛋白', '蔬菜多', '中式早餐'],
  },
  {
    id: 'b4', name: '隔夜燕麦杯', calories: 320, category: 'breakfast',
    ingredients: ['燕麦', '希腊酸奶', '蜂蜜', '草莓', '杏仁'],
    steps: ['燕麦50g加希腊酸奶100g混合', '加入蜂蜜一勺拌匀', '放入密封罐冷藏过夜', '早晨取出，放上切片草莓和碎杏仁'],
    nutrition: { vegetables: 5, protein: 22, carbs: 73 },
    tags: ['免煮', '高蛋白', '提前备餐'],
  },
  {
    id: 'b5', name: '菠菜蘑菇烘蛋', calories: 260, category: 'breakfast',
    ingredients: ['鸡蛋', '菠菜', '蘑菇', '洋葱', '橄榄油'],
    steps: ['菠菜焯水挤干切段，蘑菇切片，洋葱切丁', '锅中小火热橄榄油，炒香洋葱和蘑菇', '加入菠菜翻炒，铺平', '打散2个鸡蛋倒入，盖盖小火焖8分钟至蛋液凝固'],
    nutrition: { vegetables: 45, protein: 35, carbs: 20 },
    tags: ['低碳水', '高蛋白', '生酮友好'],
  },
  {
    id: 'b6', name: '南瓜小米粥', calories: 210, category: 'breakfast',
    ingredients: ['小米', '南瓜', '枸杞', '红枣'],
    steps: ['小米50g提前浸泡30分钟', '南瓜去皮切小块', '小米加水800ml煮开后放入南瓜', '小火慢熬25分钟，出锅前加枸杞红枣'],
    nutrition: { vegetables: 30, protein: 15, carbs: 55 },
    tags: ['暖胃', '养胃', '中式传统'],
  },
  {
    id: 'b7', name: '香蕉蛋白奶昔', calories: 280, category: 'breakfast',
    ingredients: ['香蕉', '蛋白粉', '燕麦奶', '花生酱', '亚麻籽'],
    steps: ['香蕉1根掰成段', '所有材料放入搅拌机：香蕉、蛋白粉1勺、燕麦奶250ml、花生酱1小勺、亚麻籽1勺', '高速搅拌30秒至顺滑', '倒入杯中即可饮用'],
    nutrition: { vegetables: 0, protein: 35, carbs: 65 },
    tags: ['高蛋白', '健身必备', '快手'],
  },
  {
    id: 'b8', name: '紫薯山药糕', calories: 230, category: 'breakfast',
    ingredients: ['紫薯', '山药', '蜂蜜', '椰蓉'],
    steps: ['紫薯和山药去皮蒸熟', '分别压成泥，各加少许蜂蜜', '模具底层铺紫薯泥压实', '上层铺山药泥压实', '脱模后撒椰蓉'],
    nutrition: { vegetables: 40, protein: 10, carbs: 50 },
    tags: ['低脂', '高纤维', '颜值高'],
  },
  {
    id: 'b9', name: '番茄虾仁意面', calories: 350, category: 'breakfast',
    ingredients: ['全麦意面', '虾仁', '小番茄', '大蒜', '罗勒'],
    steps: ['全麦意面60g煮8分钟捞出', '虾仁用盐和黑胡椒腌5分钟', '蒜末炒香，加虾仁煎至变色', '加入对半切的小番茄翻炒，放入意面拌匀，撒罗勒碎'],
    nutrition: { vegetables: 25, protein: 30, carbs: 45 },
    tags: ['高蛋白', '意面', '约会早餐'],
  },
  {
    id: 'b10', name: '豆浆燕麦粥', calories: 195, category: 'breakfast',
    ingredients: ['无糖豆浆', '燕麦', '核桃', '葡萄干', '肉桂粉'],
    steps: ['燕麦40g加无糖豆浆300ml', '小火煮5分钟至粘稠，不断搅拌', '盛碗后撒上碎核桃和葡萄干', '撒少许肉桂粉提香'],
    nutrition: { vegetables: 0, protein: 22, carbs: 78 },
    tags: ['植物蛋白', '暖身', '快手'],
  },
  {
    id: 'b11', name: '玉米鲜虾肠粉', calories: 290, category: 'breakfast',
    ingredients: ['肠粉皮', '鲜虾仁', '玉米粒', '生菜', '生抽'],
    steps: ['虾仁去虾线，用少许料酒和盐腌制', '肠粉皮铺平，放上虾仁、玉米粒和生菜丝', '卷好放入蒸锅，大火蒸5分钟', '淋上少许生抽和香油'],
    nutrition: { vegetables: 25, protein: 30, carbs: 45 },
    tags: ['低脂', '广式', '蒸菜'],
  },
  {
    id: 'b12', name: '水煮蛋蔬菜沙拉', calories: 220, category: 'breakfast',
    ingredients: ['鸡蛋', '生菜', '芝麻菜', '樱桃萝卜', '油醋汁'],
    steps: ['鸡蛋冷水下锅，水开后煮7分钟，捞出过冷水剥壳切半', '生菜和芝麻菜洗净甩干撕小块', '樱桃萝卜切薄片', '所有食材摆盘，淋上油醋汁'],
    nutrition: { vegetables: 50, protein: 25, carbs: 25 },
    tags: ['低碳水', '生酮友好', '快手'],
  },

  // ===== 午餐 (18道) =====
  {
    id: 'l1', name: '鸡胸肉藜麦沙拉', calories: 380, category: 'lunch',
    ingredients: ['鸡胸肉', '藜麦', '混合生菜', '小番茄', '黄瓜', '柠檬汁'],
    steps: ['鸡胸肉用盐、黑胡椒、柠檬汁腌制15分钟后煎熟切片', '藜麦50g加水煮15分钟沥干', '生菜打底，铺上藜麦和鸡胸肉', '加入对半切的小番茄和黄瓜片，淋上油醋汁'],
    nutrition: { vegetables: 45, protein: 35, carbs: 20 },
    tags: ['高蛋白', '健身餐', '低GI'],
  },
  {
    id: 'l2', name: '香煎三文鱼配时蔬', calories: 420, category: 'lunch',
    ingredients: ['三文鱼', '芦笋', '西兰花', '柠檬', '橄榄油'],
    steps: ['三文鱼用盐、黑胡椒和柠檬汁腌制10分钟', '西兰花掰小朵焯水，芦笋去老根', '平底锅少油，三文鱼皮朝下煎4分钟，翻面再煎3分钟', '同锅煎芦笋，摆盘即可'],
    nutrition: { vegetables: 40, protein: 35, carbs: 25 },
    tags: ['Omega-3', '高蛋白', '抗炎'],
  },
  {
    id: 'l3', name: '番茄菌菇豆腐汤', calories: 180, category: 'lunch',
    ingredients: ['嫩豆腐', '番茄', '金针菇', '香菇', '香菜'],
    steps: ['番茄切块炒出汁，加水500ml煮开', '豆腐切块、香菇切片、金针菇去根', '所有菌菇和豆腐放入汤中煮8分钟', '加盐和少许白胡椒粉，撒香菜'],
    nutrition: { vegetables: 55, protein: 25, carbs: 20 },
    tags: ['低卡', '高蛋白', '素食'],
  },
  {
    id: 'l4', name: '彩椒牛肉粒', calories: 350, category: 'lunch',
    ingredients: ['牛里脊', '红椒', '黄椒', '青椒', '洋葱'],
    steps: ['牛里脊切小粒，加生抽、料酒和淀粉腌制10分钟', '三种彩椒和洋葱切块', '热锅少油，牛肉粒大火滑炒至变色盛出', '炒香洋葱和彩椒，放回牛肉粒翻炒均匀，加黑胡椒调味'],
    nutrition: { vegetables: 40, protein: 35, carbs: 25 },
    tags: ['高铁', '高蛋白', '色彩丰富'],
  },
  {
    id: 'l5', name: '泰式青木瓜沙拉', calories: 220, category: 'lunch',
    ingredients: ['青木瓜', '小番茄', '花生', '青柠', '鱼露', '朝天椒'],
    steps: ['青木瓜去皮刨丝，冰水浸泡10分钟更脆', '小番茄对半切，花生捣碎', '调酱汁：青柠汁2勺+鱼露1勺+少许椰糖', '所有食材拌匀，撒花生碎和辣椒'],
    nutrition: { vegetables: 60, protein: 15, carbs: 25 },
    tags: ['低卡', '清爽', '东南亚风味'],
  },
  {
    id: 'l6', name: '糙米饭虾仁西蓝花', calories: 370, category: 'lunch',
    ingredients: ['糙米饭', '虾仁', '西兰花', '胡萝卜', '蒜末'],
    steps: ['糙米提前浸泡2小时后煮熟', '西兰花掰小朵焯水1分钟，胡萝卜切片', '虾仁用料酒和盐腌5分钟', '蒜末炒香，依次加入虾仁、西兰花、胡萝卜翻炒，调味后配糙米饭'],
    nutrition: { vegetables: 45, protein: 30, carbs: 25 },
    tags: ['高纤', '低GI', '均衡'],
  },
  {
    id: 'l7', name: '日式冷荞麦面', calories: 310, category: 'lunch',
    ingredients: ['荞麦面', '海苔', '葱花', '芥末', '日式酱油'],
    steps: ['荞麦面按包装说明煮好，过冰水沥干', '调蘸汁：日式酱油2勺+味淋1勺+柴鱼高汤3勺', '面条装盘撒海苔丝和葱花', '蘸汁食用，可加少许芥末'],
    nutrition: { vegetables: 10, protein: 18, carbs: 72 },
    tags: ['低脂', '清爽', '夏日必备'],
  },
  {
    id: 'l8', name: '蒸鳕鱼配蔬菜泥', calories: 290, category: 'lunch',
    ingredients: ['鳕鱼', '土豆', '菠菜', '牛奶', '黄油'],
    steps: ['鳕鱼用盐和柠檬汁腌10分钟，上锅蒸8分钟', '土豆煮熟压泥，加少许牛奶和黄油拌匀', '菠菜焯水挤干切碎，混入土豆泥', '蔬菜泥铺底，放上鳕鱼即可'],
    nutrition: { vegetables: 40, protein: 35, carbs: 25 },
    tags: ['高蛋白', '低脂', '法式轻食'],
  },
  {
    id: 'l9', name: '韩式拌饭（低卡版）', calories: 400, category: 'lunch',
    ingredients: ['糙米饭', '菠菜', '豆芽', '胡萝卜', '香菇', '鸡蛋', '韩式辣酱'],
    steps: ['菠菜焯水挤干，豆芽焯水，胡萝卜切丝，香菇切片', '各种蔬菜分别用少许香油炒熟调味', '煎一个太阳蛋', '糙米饭打底，铺上所有蔬菜和鸡蛋，加一勺韩式辣酱拌匀'],
    nutrition: { vegetables: 50, protein: 20, carbs: 30 },
    tags: ['韩式', '丰富多样', '拌饭'],
  },
  {
    id: 'l10', name: '秋葵炒蛋配杂粮饭', calories: 330, category: 'lunch',
    ingredients: ['秋葵', '鸡蛋', '杂粮饭', '蒜片', '生抽'],
    steps: ['秋葵焯水30秒后切斜段', '鸡蛋打散炒熟盛出', '蒜片爆香，下秋葵翻炒', '放回鸡蛋，加少许生抽调味，配杂粮饭'],
    nutrition: { vegetables: 40, protein: 25, carbs: 35 },
    tags: ['高蛋白', '家常', '快手'],
  },
  {
    id: 'l11', name: '冬瓜虾滑汤', calories: 160, category: 'lunch',
    ingredients: ['冬瓜', '虾滑', '姜丝', '葱花', '香油'],
    steps: ['冬瓜去皮切薄片', '水烧开加姜丝和冬瓜煮5分钟', '虾滑用勺子挖成球放入汤中', '虾滑浮起后加盐调味，撒葱花和几滴香油'],
    nutrition: { vegetables: 55, protein: 30, carbs: 15 },
    tags: ['低卡', '清淡', '消肿'],
  },
  {
    id: 'l12', name: '鸡丝凉面', calories: 360, category: 'lunch',
    ingredients: ['鸡胸肉', '荞麦面', '黄瓜', '豆芽', '芝麻酱', '蒜泥'],
    steps: ['鸡胸肉煮熟撕成丝', '荞麦面煮好过凉水', '黄瓜切丝，豆芽焯水', '调酱汁：芝麻酱1勺+生抽2勺+醋1勺+蒜泥+少许辣椒油', '所有材料拌匀'],
    nutrition: { vegetables: 35, protein: 30, carbs: 35 },
    tags: ['夏日', '爽口', '高蛋白'],
  },
  {
    id: 'l13', name: '香菇油菜配糙米饭', calories: 280, category: 'lunch',
    ingredients: ['油菜', '鲜香菇', '糙米饭', '蚝油', '蒜末'],
    steps: ['油菜洗净对半切，香菇切片', '蒜末爆香，下香菇炒软', '加入油菜大火翻炒至断生', '加蚝油和少许盐调味，配糙米饭'],
    nutrition: { vegetables: 55, protein: 15, carbs: 30 },
    tags: ['素食', '高纤维', '家常菜'],
  },
  {
    id: 'l14', name: '酸辣魔芋丝', calories: 120, category: 'lunch',
    ingredients: ['魔芋丝', '木耳', '黄瓜', '香菜', '醋', '辣椒油'],
    steps: ['魔芋丝开水烫2分钟沥干', '木耳泡发切丝焯水', '黄瓜切丝', '调汁：醋2勺+生抽1勺+辣椒油1勺+蒜末+少许代糖', '所有材料拌匀冷藏30分钟更入味'],
    nutrition: { vegetables: 50, protein: 5, carbs: 45 },
    tags: ['超低卡', '高纤维', '减脂神器'],
  },
  {
    id: 'l15', name: '鲜虾牛油果沙拉', calories: 350, category: 'lunch',
    ingredients: ['鲜虾', '牛油果', '芝麻菜', '芒果', '青柠'],
    steps: ['虾仁焯水至变色，过冰水保持Q弹', '牛油果半个切块，芒果切丁', '芝麻菜打底，放上所有食材', '淋上青柠汁和少许橄榄油'],
    nutrition: { vegetables: 35, protein: 30, carbs: 35 },
    tags: ['优质脂肪', '高蛋白', '颜值高'],
  },
  {
    id: 'l16', name: '番茄鸡肉丸子汤', calories: 250, category: 'lunch',
    ingredients: ['鸡胸肉糜', '番茄', '蛋清', '姜末', '菠菜'],
    steps: ['鸡胸肉糜加蛋清、姜末、盐搅打上劲', '番茄炒出汁加水煮开', '鸡肉泥用虎口挤成丸子下锅', '丸子浮起后加菠菜烫熟，调味即可'],
    nutrition: { vegetables: 40, protein: 40, carbs: 20 },
    tags: ['高蛋白', '暖汤', '自制丸子'],
  },
  {
    id: 'l17', name: '烤蔬菜鸡腿扒', calories: 390, category: 'lunch',
    ingredients: ['去骨鸡腿', '彩椒', '西葫芦', '洋葱', '迷迭香'],
    steps: ['鸡腿肉用盐、黑胡椒、迷迭香和少许橄榄油按摩腌制30分钟', '彩椒和西葫芦切大块，洋葱切瓣', '所有蔬菜铺在烤盘上，鸡腿皮朝上放置', '烤箱200度烤25分钟至鸡皮金黄'],
    nutrition: { vegetables: 45, protein: 35, carbs: 20 },
    tags: ['烤箱菜', '高蛋白', '懒人必备'],
  },
  {
    id: 'l18', name: '紫菜虾皮豆腐汤', calories: 130, category: 'lunch',
    ingredients: ['嫩豆腐', '紫菜', '虾皮', '葱花', '姜丝'],
    steps: ['豆腐切小块', '水烧开加姜丝', '放入豆腐煮3分钟', '加入撕碎的紫菜和虾皮，再煮2分钟，加盐和香油，撒葱花'],
    nutrition: { vegetables: 10, protein: 30, carbs: 60 },
    tags: ['超低卡', '补钙', '快手汤'],
  },

  // ===== 晚餐 (15道) =====
  {
    id: 'd1', name: '蒜蓉西兰花', calories: 120, category: 'dinner',
    ingredients: ['西兰花', '蒜末', '橄榄油', '干辣椒'],
    steps: ['西兰花掰小朵焯水1分钟，过凉水保持翠绿', '锅中加少许橄榄油，蒜末和干辣椒爆香', '放入西兰花大火快炒1分钟', '加盐调味出锅'],
    nutrition: { vegetables: 80, protein: 15, carbs: 5 },
    tags: ['超低卡', '素食', '快手'],
  },
  {
    id: 'd2', name: '清蒸鲈鱼', calories: 260, category: 'dinner',
    ingredients: ['鲈鱼', '姜片', '葱丝', '蒸鱼豉油', '料酒'],
    steps: ['鲈鱼洗净，两面划刀，抹料酒和盐腌制10分钟', '鱼身上放姜片，水开上锅蒸8分钟', '倒掉盘中汤汁，铺上葱丝', '淋上蒸鱼豉油，浇一勺滚烫的热油激香'],
    nutrition: { vegetables: 10, protein: 50, carbs: 40 },
    tags: ['高蛋白', '低脂', '经典粤菜'],
  },
  {
    id: 'd3', name: '番茄炒菜花', calories: 150, category: 'dinner',
    ingredients: ['菜花', '番茄', '番茄酱', '蒜末', '葱花'],
    steps: ['菜花掰小朵焯水1分钟', '番茄切块炒软出汁，加一勺番茄酱', '放入菜花翻炒均匀，小火焖3分钟入味', '加盐调味，撒葱花'],
    nutrition: { vegetables: 70, protein: 12, carbs: 18 },
    tags: ['低卡', '素食', '酸甜可口'],
  },
  {
    id: 'd4', name: '虾仁蒸蛋', calories: 200, category: 'dinner',
    ingredients: ['鸡蛋', '虾仁', '温水', '葱花', '生抽'],
    steps: ['两个鸡蛋打散，加1.5倍温水搅匀，过筛去泡', '虾仁用料酒和盐腌5分钟', '蛋液倒入蒸碗，盖保鲜膜扎孔', '水开上锅蒸8分钟，打开放上虾仁，再蒸2分钟，淋生抽撒葱花'],
    nutrition: { vegetables: 0, protein: 45, carbs: 55 },
    tags: ['高蛋白', '嫩滑', '家常'],
  },
  {
    id: 'd5', name: '凉拌海带丝', calories: 80, category: 'dinner',
    ingredients: ['海带丝', '蒜泥', '醋', '生抽', '芝麻油', '小米辣'],
    steps: ['海带丝泡发洗净，焯水2分钟', '过凉水沥干', '调汁：蒜泥+醋2勺+生抽1勺+芝麻油少许+小米辣', '拌匀冷藏30分钟更入味'],
    nutrition: { vegetables: 85, protein: 10, carbs: 5 },
    tags: ['超低卡', '高碘', '凉菜'],
  },
  {
    id: 'd6', name: '鸡肉蔬菜卷', calories: 260, category: 'dinner',
    ingredients: ['鸡胸肉', '生菜', '胡萝卜', '黄瓜', '越南米纸'],
    steps: ['鸡胸肉煮熟撕丝，胡萝卜和黄瓜切丝', '越南米纸温水泡软铺平', '放上生菜、鸡丝、胡萝卜丝、黄瓜丝', '卷紧后切段，配甜辣酱或鱼露蘸食'],
    nutrition: { vegetables: 50, protein: 30, carbs: 20 },
    tags: ['低卡', '高蛋白', '越南风味'],
  },
  {
    id: 'd7', name: '菌菇杂蔬汤', calories: 100, category: 'dinner',
    ingredients: ['金针菇', '蟹味菇', '菠菜', '豆腐', '姜片'],
    steps: ['所有菌菇去根洗净，豆腐切块', '水中加姜片煮开，放入菌菇和豆腐', '煮8分钟后加入菠菜', '菠菜变软后加盐和少许白胡椒粉调味'],
    nutrition: { vegetables: 70, protein: 20, carbs: 10 },
    tags: ['超低卡', '素食', '清肠'],
  },
  {
    id: 'd8', name: '烤花椰菜沙拉', calories: 190, category: 'dinner',
    ingredients: ['花椰菜', '孜然粉', '辣椒粉', '酸奶', '柠檬汁'],
    steps: ['花椰菜切小朵，加孜然粉、辣椒粉、橄榄油和盐拌匀', '烤箱200度烤20分钟至边缘焦黄', '调酱：希腊酸奶2勺+柠檬汁+蒜泥+盐', '烤好的花椰菜淋上酸奶酱'],
    nutrition: { vegetables: 65, protein: 15, carbs: 20 },
    tags: ['素食', '低卡', '地中海风味'],
  },
  {
    id: 'd9', name: '芹菜炒香干', calories: 200, category: 'dinner',
    ingredients: ['芹菜', '香干', '红椒', '蒜片', '生抽'],
    steps: ['芹菜去筋切斜段，香干切片，红椒切丝', '香干先煎至两面微黄盛出', '蒜片爆香，下芹菜和红椒翻炒', '放回香干，加生抽和少许盐翻炒均匀'],
    nutrition: { vegetables: 50, protein: 25, carbs: 25 },
    tags: ['高纤维', '家常', '素食'],
  },
  {
    id: 'd10', name: '照烧豆腐配西兰花', calories: 280, category: 'dinner',
    ingredients: ['老豆腐', '西兰花', '照烧酱', '芝麻', '姜末'],
    steps: ['老豆腐压去水分切厚片，用厨房纸吸干', '平底锅少油，豆腐煎至两面金黄', '加入照烧酱和少许水，小火收汁裹匀豆腐', '西兰花焯水摆盘，豆腐放在一旁，撒芝麻'],
    nutrition: { vegetables: 40, protein: 30, carbs: 30 },
    tags: ['高蛋白', '素食', '日式风味'],
  },
  {
    id: 'd11', name: '冬瓜排骨汤（去油版）', calories: 220, category: 'dinner',
    ingredients: ['冬瓜', '排骨', '姜片', '枸杞', '料酒'],
    steps: ['排骨冷水下锅加料酒焯水，撇去浮沫捞出洗净', '排骨加姜片和足量水，大火烧开转小火炖40分钟', '放凉后去掉表面凝结的油脂', '加入冬瓜块再煮15分钟，出锅前加枸杞和盐'],
    nutrition: { vegetables: 35, protein: 30, carbs: 35 },
    tags: ['低脂', '高蛋白', '汤品'],
  },
  {
    id: 'd12', name: '蒜蓉粉丝蒸娃娃菜', calories: 160, category: 'dinner',
    ingredients: ['娃娃菜', '龙口粉丝', '蒜末', '蒸鱼豉油', '葱花'],
    steps: ['粉丝温水泡软，娃娃菜切四瓣', '娃娃菜焯水30秒铺盘底', '粉丝铺在娃娃菜上', '蒜末用少许油炒香，铺在粉丝上，淋蒸鱼豉油，上锅蒸8分钟，出锅撒葱花'],
    nutrition: { vegetables: 60, protein: 8, carbs: 32 },
    tags: ['低卡', '素食', '蒸菜'],
  },
  {
    id: 'd13', name: '椒盐虾', calories: 230, category: 'dinner',
    ingredients: ['基围虾', '椒盐', '青椒', '红椒', '蒜末', '淀粉'],
    steps: ['虾去虾线，加料酒和盐腌10分钟，裹薄薄一层淀粉', '平底锅少油，虾煎至两面酥脆盛出', '锅中炒香蒜末和青红椒碎', '放回虾，撒椒盐翻炒均匀'],
    nutrition: { vegetables: 20, protein: 50, carbs: 30 },
    tags: ['高蛋白', '低脂', '壳类海鲜'],
  },
  {
    id: 'd14', name: '麻酱菠菜', calories: 130, category: 'dinner',
    ingredients: ['菠菜', '芝麻酱', '生抽', '醋', '蒜泥', '白芝麻'],
    steps: ['菠菜焯水10秒捞出挤干切段', '调麻酱：芝麻酱1勺+温水2勺调开+生抽1勺+醋半勺+蒜泥', '酱汁淋在菠菜上', '撒上白芝麻'],
    nutrition: { vegetables: 75, protein: 15, carbs: 10 },
    tags: ['超低卡', '补铁', '凉菜'],
  },
  {
    id: 'd15', name: '西葫芦鸡蛋饼', calories: 210, category: 'dinner',
    ingredients: ['西葫芦', '鸡蛋', '全麦面粉', '虾皮', '葱花'],
    steps: ['西葫芦擦丝加少许盐腌5分钟挤去水分', '加入2个鸡蛋、30g全麦面粉、虾皮和葱花搅匀', '平底锅刷薄油，舀一勺面糊摊平', '中小火煎至两面金黄'],
    nutrition: { vegetables: 40, protein: 25, carbs: 35 },
    tags: ['低卡', '家常', '快手'],
  },

  // ===== 加餐/小食 (5道) =====
  {
    id: 's1', name: '希腊酸奶水果杯', calories: 180, category: 'snack',
    ingredients: ['希腊酸奶', '混合莓果', '格兰诺拉麦片', '蜂蜜'],
    steps: ['杯中先铺一层希腊酸奶', '放一层混合莓果（蓝莓、树莓、草莓）', '再铺一层酸奶', '顶部撒格兰诺拉麦片，淋少许蜂蜜'],
    nutrition: { vegetables: 0, protein: 30, carbs: 70 },
    tags: ['高蛋白', '零食', '颜值高'],
  },
  {
    id: 's2', name: '海苔蔬菜卷', calories: 90, category: 'snack',
    ingredients: ['海苔片', '胡萝卜', '黄瓜', '牛油果', '苜蓿芽'],
    steps: ['胡萝卜和黄瓜切细长条，牛油果切片', '海苔片铺平，在一端放上所有蔬菜', '从有料的一端开始紧紧卷起', '切段食用，可蘸少许酱油'],
    nutrition: { vegetables: 75, protein: 10, carbs: 15 },
    tags: ['超低卡', '生食', '素食'],
  },
  {
    id: 's3', name: '烤羽衣甘蓝脆片', calories: 100, category: 'snack',
    ingredients: ['羽衣甘蓝', '橄榄油', '海盐', '蒜粉'],
    steps: ['羽衣甘蓝洗净彻底擦干，去茎只留叶子撕小块', '加少许橄榄油、海盐和蒜粉抓匀', '平铺在烤盘上，不要重叠', '烤箱150度烤10-12分钟至酥脆，注意不要烤焦'],
    nutrition: { vegetables: 70, protein: 15, carbs: 15 },
    tags: ['超低卡', '替代薯片', '高纤维'],
  },
  {
    id: 's4', name: '毛豆', calories: 130, category: 'snack',
    ingredients: ['毛豆荚', '海盐', '八角'],
    steps: ['毛豆荚洗净剪去两端方便入味', '水中加海盐和八角烧开', '放入毛豆煮8-10分钟', '捞出沥干，可直接食用'],
    nutrition: { vegetables: 30, protein: 35, carbs: 35 },
    tags: ['高蛋白', '植物蛋白', '简单'],
  },
  {
    id: 's5', name: '奇亚籽布丁', calories: 160, category: 'snack',
    ingredients: ['奇亚籽', '椰奶', '芒果', '椰丝'],
    steps: ['奇亚籽2勺加椰奶150ml搅匀', '冷藏至少4小时或过夜至凝胶状', '芒果切丁', '布丁上放芒果丁和椰丝'],
    nutrition: { vegetables: 0, protein: 15, carbs: 85 },
    tags: ['高纤维', 'Omega-3', '甜品替代'],
  },
]

export function getRecipesByIngredients(ingredients: string[]): Recipe[] {
  const lower = ingredients.map(i => i.toLowerCase())
  return recipes
    .map(r => {
      const matchCount = r.ingredients.filter(ing =>
        lower.some(userIng => ing.toLowerCase().includes(userIng) || userIng.includes(ing.toLowerCase()))
      ).length
      return { recipe: r, matchCount }
    })
    .filter(r => r.matchCount > 0)
    .sort((a, b) => b.matchCount - a.matchCount)
    .map(r => r.recipe)
}

export function getRecipesByCategory(category: Recipe['category']): Recipe[] {
  return recipes.filter(r => r.category === category)
}

export function generateDayMenu(preferredIngredients?: string[]): { breakfast: Recipe; lunch: Recipe; dinner: Recipe; totalCalories: number } {
  const breakfasts = getRecipesByCategory('breakfast')
  const lunches = getRecipesByCategory('lunch')
  const dinners = getRecipesByCategory('dinner')

  let breakfast: Recipe, lunch: Recipe, dinner: Recipe

  if (preferredIngredients && preferredIngredients.length > 0) {
    const matched = getRecipesByIngredients(preferredIngredients)
    const b = matched.find(r => r.category === 'breakfast')
    const l = matched.find(r => r.category === 'lunch')
    const d = matched.find(r => r.category === 'dinner')
    breakfast = b || breakfasts[Math.floor(Math.random() * breakfasts.length)]
    lunch = l || lunches[Math.floor(Math.random() * lunches.length)]
    dinner = d || dinners[Math.floor(Math.random() * dinners.length)]
  } else {
    breakfast = breakfasts[Math.floor(Math.random() * breakfasts.length)]
    lunch = lunches[Math.floor(Math.random() * lunches.length)]
    dinner = dinners[Math.floor(Math.random() * dinners.length)]
  }

  return {
    breakfast,
    lunch,
    dinner,
    totalCalories: breakfast.calories + lunch.calories + dinner.calories,
  }
}

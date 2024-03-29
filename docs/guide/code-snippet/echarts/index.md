# ECharts 示例

`ECharts` 图示例，用于展示 `ECharts` 的基本用法。示例代码：[echarts-example](https://github.com/1442916418/echarts-example)，参考：[ECharts](https://echarts.apache.org/zh/index.html) [madeapie](https://madeapie.com/#/)

## [折线图](https://github.com/1442916418/echarts-example/blob/main/src/charts/line/line.html)

![line](https://pic.imgdb.cn/item/65de92259f345e8d03fcc5e2.jpg)

### 未来一周的气温变化统计

![line](https://pic.imgdb.cn/item/65de92259f345e8d03fcc619.jpg)

- **目的**: 展示未来一周内最高气温与最低气温的变化趋势。

- **数据源**: 提供的气温变化曲线图。

- **图表类型**: 曲线图。

- **特点**:
  - **时间跨度(x轴)**：x 轴代表 7 天的时间段，从 1Day 到 7Day。
  - **气温跨度(y轴)**：y 轴代表气温数值，范围从 -20 到 10。
  - **数据集**：有两条曲线，分别表示最高气温（最高）和最低气温（最低）。
  - **视觉效果**：使用渐变色填充，增强视觉效果和可读性。

- **数据分析**:
  - **气温波动**：所示曲线图表明未来一周内，最高气温和最低气温均呈现出波动状。这种波动可能受多种气象因素影响，如前线移动、气压变化或季节性转换等。  
  - **剧烈变化**：第一天最低气温的急剧下降可能预示着一个冷空气的入侵或者其他导致气温骤降的气象事件。  
  - **气温趋同**：第四天最高气温和最低气温的交点表明在这一天，气温差异小，可能是由于整天气候条件较为稳定。  
  - **气温走势**：第七天最高气温的上升趋势表明天气可能变暖，而最低气温的相对平稳则暗示夜间气温变化不大。

- **结论**:  
  结合图表分析和气象知识，我们可以得出，在未来一周内，气温将呈现出一定的波动，且可能会经历至少一次显著的温度变化事件。第四天的气温趋同可能是一个特殊天气状况，需要注意这一天的具体气象预报。最后，根据第七天的数据，可以预计周末的气温将有所上升。这些信息对于计划户外活动、农业作业或是城市基础设施运作都是有用的，但是具体的气温数值和天气情况还需要结合当地气象局的详细预报来确定。

### 近九天氮气消耗量统计

![line](https://pic.imgdb.cn/item/65de92259f345e8d03fcc656.jpg)

- **目的**: 展示近九天内总氮气消耗量与上月同期的氮气消耗量的对比。

- **数据源**: 提供的氮气消耗量曲线图。

- **图表类型**: 曲线图。

- **特点**:
  - x 轴代表 9 天的时间段，从 1Day 到 9Day。
  - y 轴代表氮气消耗量数值，范围从 -10 到 30。
  - 有两条曲线，分别表示总氮气消耗量（每日总消耗量）和上月同期的氮气消耗量（上月同期的消耗量）。

- **数据分析**:
  1. **1Day** 至 **4Day**: 每日总消耗量和上月同期消耗量相差不大，但都是负值，可能表示氮气的回收或存储。
  2. **5Day** 和 **7Day**: 每日总消耗量急剧上升，尤其在7Day达到峰值，而上月同期消耗量则相对平稳。
  3. **6Day**: 每日总消耗量从峰值急剧下降到接近零点，而上月同期消耗量则略有下降。
  4. **8Day** 至 **9Day**: 两条曲线都趋于上升，但每日总消耗量较上月同期消耗量略高。

- **结论**:
  1. 本月的氮气消耗量在中后期有一明显的峰值，表明可能存在某种突发情况或项目导致氮气消耗增加。
  2. 上月同期的氮气消耗量相对稳定，无明显的波动，显示出较为常规的消耗模式。
  3. 需要进一步调查在7Day导致氮气消耗量增加的原因，以确保资源合理使用。
  4. 整体来看，本月的氮气消耗情况与上月同期存在较大差异，需要关注并分析背后的原因。

### 近十天告警次数统计

![line](https://pic.imgdb.cn/item/65de92259f345e8d03fcc691.jpg)

- **目的**: 展示近十天的告警次数，从而了解告警的频率和重要性。

- **数据源**: 提供的告警次数曲线图。

- **图表类型**: 曲线图，有填充色显示告警的强度。

- **特点**:
  - x 轴代表 10 天的时间段，从 1Day 到 10Day。
  - y 轴代表告警次数，范围从 0 到大约 30 次。
  - 曲线显示每日告警次数，填充色可能表示告警的强度或紧急程度。

- **数据分析**:
  1. **1Day** 至 **3Day**: 告警次数较低，平稳下降，但仍在 10 次左右。
  2. **4Day** 至 **8Day**: 4Day 告警次数有所上升，但在 5Day 开始下降，之后急剧上升，在 30 次左右。
  3. **9Day** 和 **10Day**: 告警次数急剧下降，之后再次上升，仍在 15 次左右。

- **结论**:
  1. 7Day 的告警次数明显增加，可能存在某种突发事件或系统问题。
  2. 告警的填充色在每天都有所不同，可能与告警的紧急程度或类型有关，需要进一步信息来确认。
  3. 从整体趋势来看，告警次数呈现波动状，但整体有上升趋势。需要重视并分析告警的原因，确保系统或设备的稳定运行。
  4. 对于 7Day 的高告警次数，建议深入调查，以避免未来的问题发生。

## [柱状图](https://github.com/1442916418/echarts-example/blob/main/src/charts/bar/bar.html)

![bar](https://pic.imgdb.cn/item/65de93a09f345e8d03002186.png)

### 月度分类堆叠柱状图分析

![bar1](https://pic.imgdb.cn/item/65de93a09f345e8d030021b0.jpg)

- **目的**: 展示8个不同月份（1Month至8Month）在四个分类（报警器1、报警器2、报警器3、报警器4）中的分布和数量。

- **数据源**: 每一个月份在四个分类上的具体值。

- **图表类型**: 堆叠柱状图。

- **特点**:
  - 图表展示了8个月的数据，每个月的数据都被分为四个不同的部分，对应于四个不同的颜色。
  - 柱状图中的颜色明显地展示了每个月在这四个分类中的分布。
  - 通过比较各个柱子的高度和颜色分布，可以清晰地看到每个月在不同分类中的表现。

### 车辆性能对比分析

![bar](https://pic.imgdb.cn/item/65de93a09f345e8d03002212.jpg)

- **目的**: 对比5款车型（车型1至车型5）在两个主要性能指标上的表现：最大速度 (km/h) 和百公里油耗 (L/100km)。

- **数据源**: 每款车型在两个指标上的具体数值。

- **图表类型**: 双轴柱状图。

- **特点**:
  - 图表展示了5款车型的数据。
  - 左侧Y轴表示车辆的最大速度，单位为km/h，而右侧Y轴表示车辆的百公里油耗，单位为L/100km。
  - 从柱状图中可以看出，车型2和车型5在最大速度上表现较好，而车型5的最大速度相对较低。
  - 与此同时，车型5在百公里油耗上的数值较低，暗示其油耗表现较好，而车型1和车型4的油耗相对较高。

### 五个月报警器销售对比

![bar](https://pic.imgdb.cn/item/65de93a09f345e8d03002253.jpg)

- **目的**: 展示在过去五个月内，报警器1与报警器2的销售数量对比。

- **数据源**: 未提供。但从图中可以明确看到每个月的报警器销售数量。

- **图表类型**: 双柱状图。

- **特点**:
  - 图表纵轴表示月份，从 1Month 到 5Month。
  - 横轴表示销售数量，范围从 0 到 21。
  - 报警器1在各个月的销售数量都低于10，最高达到9（在1Month）。
  - 报警器2在各个月的销售数量较高，尤其在1Month到4Month，销售数量超过15，其中1Month的销售数量最高，达到19。
  - 从图中可以看出，报警器2的销售趋势在整体上高于报警器1。

- **结论**: 报警器2在过去五个月的销售表现优于报警器1，特别是在近三个月的销售量明显高于报警器1。

### 十二月内产品A与产品B的销售对比

![bar](https://pic.imgdb.cn/item/65de93a09f345e8d030022b2.jpg)

- **目的**: 展示在过去十二个月内，产品A与产品B的销售数量对比。

- **数据源**: 每个月的产品销售数量。

- **图表类型**: 双柱状图。

- **特点**:
  - 图表纵轴表示销售数量，范围从 0 到 10。
  - 图表横轴表示月份，包含 1Month 到 12Month。
  - 产品A在各个月份的销售数量均较产品B为高，尤其在4Month、6Month和9Month，产品A的销售数量大幅领先。
  - 产品B的销售数量在整个时间段内较为稳定，大致保持在中等水平。

- **结论**: 在过去的十二个月中，产品A的销售数量整体上优于产品B。尽管产品B在1Month较高销量，但总体销售量仍低于产品A。

### 六个月内总销售的数据趋势

![bar](https://pic.imgdb.cn/item/65de94119f345e8d03016aa6.jpg)

- **目的**: 展示在过去六个月内总销售数据的变化趋势。

- **数据源**: 每个月的总销售数据值。

- **图表类型**: 单柱状图。

- **特点**:
  - 图表纵轴表示数据值，范围从 0 到 100个。
  - 图表横轴表示月份，包含从 1Month 到 6Month。
  - 3Month 的数据量较低，大约 10 左右。
  - 在 4Month 和 5Month，数据量达到了峰值，接近 90。
  - 1Month、2Month的数据量中等，大约50左右。

- **结论**:
  1. 在六个月的时间段内，数据的变化表现出了明显的上下波动。
  2. 4Month和5Month为两个数据高峰。
  3. 3Month的数据值相对较低。
  4. 总体来看，数据在这六个月中，3Month 除外，其他呈现出稳定趋势。
  5. 3Month 需要关注并分析背后的原因

### 1-5楼层报警次数和故障次数统计

![bar](https://pic.imgdb.cn/item/65de94129f345e8d03016ca7.jpg)

- **目的**: 展示在 1-5 楼层中的报警次数和故障次数。

- **数据源**: 每层的报警次数和故障次数。

- **图表类型**: 双柱状图。

- **特点**:
  - 图表纵轴表示楼层，从1F到5F。
  - 图表横轴表示次数。
  - 两种颜色的柱子分别代表 `报警次数（黄色）`和 `故障次数（红色）`。
  
- **数据分析**:
  - **1F**: 报警次数为 4 次，故障次数为 0 次。
  - **2F**: 报警次数为 1 次，故障次数为 4 次。
  - **3F**: 报警次数为 3 次，故障次数为 9 次。
  - **4F**: 报警次数为 7 次，故障次数为 9 次。
  - **5F**: 报警次数为 3 次，故障次数为 1 次。

- **结论**:
  1. 4F的故障次数稍高于报警次数。
  2. 1F的报警和故障次数都相对较低。
  3. 3F、4F和5F的故障次数明显高于报警次数，尤其是3F和4F，其中故障次数为9次，远高于报警次数。
  4. 故障次数在每层都比报警次数要高，除了2F。
  5. 从数据中可以看出，3F、4F和5F的设备可能存在更多的问题，需要更多的维护和检查。
  6. 总体来看，对于大部分楼层，故障的频率比报警更高，这可能意味着设备可能经常出现问题但不一定总是触发报警。

### 动画延迟柱状图

![bar](https://pic.imgdb.cn/item/65de94149f345e8d03017164.jpg)

## [饼图](https://github.com/1442916418/echarts-example/blob/main/src/charts/pie/pie.html)

![pie](https://pic.imgdb.cn/item/65de95ca9f345e8d0304fc15.png)

### 部件数量指数仪表盘

![pie](https://pic.imgdb.cn/item/65de95ca9f345e8d0304fc65.jpg)

- **目的**: 展示当前的部件数量指数及其与正常的关系。

- **数据源**: 提供的部件数量指数饼图。

- **图表类型**: 圆形饼图。

- **特点**:
  - 仪表盘由一个圆形刻度、中心的数字值和单位符号、以及下方的颜色条表示。
  - 刻度由两种颜色表示: 蓝色和红色。蓝色表示部件数量处于正常，而红色表示超出正常。
  - 中心的数字表示当前的部件数量指数值。
  - 下方的颜色条显示了正常与异常的具体数值。

- **数据分析**:
  - 当前的部件总数量指数为 32。
  - 正常部件 28，异常 4。

- **结论**:
  1. 超出正常的值为 4，这意味着需要采取一些措施来改善部件数量或提醒居民采取防护措施。
  2. 从仪表盘的设计来看，红色区域表示的是不良的部件数量，需要引起关注。

### 预警信息处理状态分析

![pie](https://pic.imgdb.cn/item/65de95cb9f345e8d0304fcc4.jpg)

- **目的**: 展示预警信息在三个处理状态（待处理、已处理、处理中）的分布情况。

- **数据源**: 提供的预警信息处理状态仪表盘图。

- **图表类型**: 圆环形分段仪表盘图。

- **特点**:
  - 仪表盘由一个圆环形刻度和各状态的百分比组成。
  - 每一个处理状态对应一个特定颜色的圆环段，且每段的长度与该状态的百分比成正比。
  - 每一段圆环旁边都有对应的状态名称和百分比。

- **数据分析**:
  - 待处理的预警信息占比为 23.05%，对应的是红色部分。
  - 处理中的预警信息占比为 31%，对应的是橙色部分。
  - 已处理的预警信息占比为 40.28%，对应的是绿色部分。

- **结论**:
  1. 大部分的预警信息已经得到了处理，占比为 40.28%。
  2. 待处理的预警信息占比相对较低，为 23.05%。这意味着大部分的预警已经被响应，但还有近四分之一的预警需要进一步的关注和处理。
  3. 处理中的预警信息占比也相对较高，为 31%，这表示有三分之一的预警正在得到处理。
  4. 总体上，大部分的预警已经得到响应，但仍需关注那些待处理的预警，确保及时处理。

### 设备状态分析

![pie](https://pic.imgdb.cn/item/65de95cb9f345e8d0304fd1a.jpg)

- **目的**: 展示设备在三个状态（正常、异常、未使用）的分布情况。

- **数据源**: 提供的设备状态饼图。

- **图表类型**: 圆环形分段饼图。

- **特点**:
  - 饼图由一个圆环形刻度和各状态的百分比组成。
  - 每一个状态对应一个特定颜色的圆环段，且每段的长度与该状态的百分比成正比。
  - 每一段圆环旁边都有对应的状态名称和百分比。

- **数据分析**:
  - 正常状态的设备占比为 79.93%，对应的是蓝色部分。
  - 未使用的设备占比为 7.2%，对应的是灰色部分。
  - 异常状态的设备占比为 7.2%，对应的是红色部分。

- **结论**:
  1. 绝大多数的设备处于正常工作状态，占比为 79.93%。
  2. 未使用和异常状态的设备占比相同，均为 7.2%。这意味着有一部分设备未被使用，而另一部分设备正在经历一些问题。
  3. 从这些数据可以看出，维护团队在设备维护方面做得很好，因为大部分设备都在正常运行。但是，仍然需要注意那些处于异常状态的设备，并采取适当的措施来修复它们。
  4. 对于未使用的设备，管理团队可以考虑是否需要继续持有这些设备或是否可以重新分配或出售它们。

### 告警信息状态分析

![pie](https://pic.imgdb.cn/item/65de95cb9f345e8d0304fd5a.jpg)

- **目的**: 展示告警信息在两个状态（待处理、已处理）的分布情况。

- **数据源**: 提供的告警信息状态饼图。

- **图表类型**: 圆环形分段饼图。

- **特点**:
  - 饼图由一个圆环形刻度和各状态的百分比组成。
  - 每一个状态对应一个特定颜色的圆环段，且每段的长度与该状态的百分比成正比。
  - 每一段圆环旁边都有对应的状态名称和百分比。

- **数据分析**:
  - 已处理的告警信息占比为 91.74%，对应的是绿色部分，数量为 1111 条。
  - 待处理的告警信息占比为 8.26%，对应的是红色部分，数量为 100 条。

- **结论**:
  1. 大多数的告警信息已经被处理，占比为 91.74%。
  2. 仍有 8.26% 的告警信息待处理，数量为 100 条。这需要管理和维护团队的关注，以确保所有的告警信息都得到及时的响应和处理。
  3. 从这些数据可以看出，维护团队在处理告警信息方面做得很好，但仍需继续关注那些未处理的告警，确保系统和设备的稳定运行。

### 告警信息处理进度分析

![pie](https://pic.imgdb.cn/item/65de96329f345e8d0305e6a2.jpg)

- **目的**: 展示告警信息当前的处理进度。

- **数据源**: 提供的告警信息处理进度饼图。

- **图表类型**: 饼图。

- **特点**:
  - 饼图由一个圆环形进度条和中心的百分比组成。
  - 圆环的填充长度与处理进度的百分比成正比。
  - 圆环内部展示了当前的处理进度百分比。

- **数据分析**:
  - 告警信息的处理进度为 15%，对应的是绿色填充部分。

- **结论**:
  1. 告警信息的处理进度已经达到了 15%。
  2. 仍有 75% 的告警信息处理尚未完成，这部分告警信息可能仍在进一步分析、验证或处理中。
  3. 管理和维护团队需要继续关注那些尚未完成处理的告警，确保所有的告警信息都得到及时和完整的处理。

### 各省市及国外项目数量统计分析

![pie](https://pic.imgdb.cn/item/65de96329f345e8d0305e6dd.jpg)

- **目的**: 展示国内不同省市以及国外的项目数量分布情况。

- **数据源**: 提供的各省市及国外项目数量统计圆环图。

- **图表类型**: 多彩圆环图。

- **特点**:
  - 圆环由五种不同颜色的区段组成，每种颜色代表一个省市或国外。
  - 每个区段的长度与该地区的项目数量所占的比例成正比。
  - 圆环中心标注了所有地区的总项目数量。

- **数据分析**:
  - 五个地区的项目数量分别如下：
    1. 国外：17.85%
    2. 北京市：22.87%
    3. 上海市 30.06%
    4. 江苏省：14.85%
    5. 广东省：14.37%

  - 总项目数量为 835 个。

- **结论**:
  1. 上海市拥有最多的项目，占总项目数量的 30.06%。
  2. 江苏省和广东省的项目数量接近，分别占总项目数量的 14.85% 和 14.37%。
  3. 国外的项目数量占比为 17.85%，位于中间位置。
  4. 广东省的项目数量最少，占总项目数量的 14.37%。
  5. 各个地区的项目数量差异存在，但整体上项目分布相对均匀，说明公司在国内外都有相对稳定的业务分布。
  6. 管理团队应根据项目数量和重要性，合理分配资源和关注度，确保各地项目的顺利进行。

### 年度天气概况对比分析

![pie](https://pic.imgdb.cn/item/65de96329f345e8d0305e70c.jpg)

- **目的**: 对比2023年度与历史平均值在不同天气类别（晴朗、阴、雨、雪）的情况。

- **数据源**: 提供的天气概况圆环图。

- **图表类型**: 双层圆环图。

- **特点**:
  - 外层圆环表示历史平均值，内层圆环表示2023年的数据。
  - 四种颜色分别代表不同的天气状况：晴朗（橙色）、阴（紫色）、雨（浅蓝）、雪（深蓝色）。
  - 圆环中心的 `年份2023` 标识了数据的时间范围。

- **数据分析**:
  - 由于没有给出数值，无法确切知道每种天气状况的具体天数或百分比。
  - 通过比较内外圆环的颜色部分长度，可以推测2023年各天气状况与历史平均的差异。

- **结论**:
  1. 根据圆环的颜色部分长度，可以大致分析哪种天气状况在2023年与历史平均相比有所增加或减少。
  2. 例如，如果2023年的某种天气颜色部分较历史平均更长，则表明该天气状况在2023年更为常见。
  3. 反之，如果2023年的颜色部分较短，则可能表明该天气状况不如历史平均常见。
  4. 此图可为气候变化分析或年度天气趋势提供直观的视觉比较。
  5. 精确的分析需要更多数据，如具体的天数或百分比等。

## [仪表盘](https://github.com/1442916418/echarts-example/blob/main/src/charts/gauge/gauge.html)

![gauge](https://pic.imgdb.cn/item/65de97009f345e8d0307a985.jpg)

### 旋转式仪表盘

![gauge](https://pic.imgdb.cn/item/65de97009f345e8d0307a9bf.jpg)

- **目的**: 展示当前压力值及其与上下限的关系。

- **数据源**: 压力仪表值、初始上/下限值、上/下阀值。

- **图表类型**: 旋转式仪表盘图。

- **特点**:
  - 小仪表图和大仪表图根据压力仪表初始上限值和下限值绘制蓝色区域，再根据上阈值和下阀值绘制红色区域，
  - 刻度从 0 开始，通过 50，到 100 结束。
  - 指针当前指向的大约是 35 的位置。

- **数据分析**:
  - 当前的度量值约为 35。
  - 该仪表盘的特点是，正常情况下可能会期望度量值接近 0 或 90。
  - 指针所指的位置在蓝色区域，表示当前状态为正常范围内。

### 压力仪表盘

![gauge](https://pic.imgdb.cn/item/65de97009f345e8d0307a9de.jpg)

- **目的**: 展示当前压力值及其与上下限的关系。

- **数据源**: 压力仪表值、初始上/下限值、上/下阀值。

- **图表类型**: 半圆形仪表盘图。

- **特点**:
  - 图表由一个半圆形刻度、一个旋转指针和中心的数字值组成。
  - 刻度由两种颜色表示: 蓝色和红色。其中蓝色表示正常范围，红色可能表示超出正常范围的压力值。
  - 中心的数字表示当前的压力值。

- **数据分析**:
  - 当前的压力值为 36。
  - 指针指向蓝色区域，这表示当前压力值在正常范围内。
  - 红色区域的开始点可能表示上阀值，即超过此值则进入超压区域。具体的上阀值数字没有显示，但从图中可以推测其值大于 36。
  - 初始的上/下限值没有明确表示，但整个半圆可能代表从最低压力到最高压力的范围。

- **结论**:
  1. 当前的压力值是 36，这在正常范围内。
  2. 尚未达到红色超压区域，这意味着当前压力尚未达到潜在的上阀值。

### 压力仪表盘分析

![gauge](https://pic.imgdb.cn/item/65de97009f345e8d0307aa23.jpg)

- **目的**: 展示当前压力值及其与上下限的关系。

- **数据源**: 提压力仪表值、初始上/下限值、上/下阀值。

- **图表类型**: 圆形仪表盘图。

- **特点**:
  - 每个仪表盘由一个圆形刻度、一个旋转指针、中心的数字值和百分比符号组成。
  - 刻度由三种颜色表示: 蓝色、绿色和红色。蓝色表示较低的压力区域，绿色表示中等压力区域，而红色可能表示超出正常范围的压力值。
  - 中心的数字表示当前的压力百分比值。

- **数据分析**:
  - 当前的压力百分比值为 51%。
  - 指针指向绿色区域，这表示当前压力值在正常范围内。

- **结论**:
  51% 的压力值位于中等压力范围内

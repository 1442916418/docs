import{_ as l,o as i,c as a,Q as r}from"./chunks/framework.aea2adc8.js";const t="/docs/assets/osi.232c3dff.gif",I=JSON.parse('{"title":"OSI","description":"","frontmatter":{},"headers":[],"relativePath":"guide/computer/osi/review.md","filePath":"guide/computer/osi/review.md","lastUpdated":1697618861000}'),o={name:"guide/computer/osi/review.md"},e=r('<h1 id="osi" tabindex="-1">OSI <a class="header-anchor" href="#osi" aria-label="Permalink to &quot;OSI&quot;">​</a></h1><h2 id="查看-osi-图片" tabindex="-1">查看 OSI 图片 <a class="header-anchor" href="#查看-osi-图片" aria-label="Permalink to &quot;查看 OSI 图片&quot;">​</a></h2><p><img src="'+t+'" alt="OSI 图片"></p><h2 id="各自业务" tabindex="-1">各自业务 <a class="header-anchor" href="#各自业务" aria-label="Permalink to &quot;各自业务&quot;">​</a></h2><h3 id="物理层" tabindex="-1">物理层 <a class="header-anchor" href="#物理层" aria-label="Permalink to &quot;物理层&quot;">​</a></h3><ul><li><p><strong>功能</strong></p><ul><li>底层数据传输</li><li>将数据的 0、1 转换为电压、脉冲光传输给物理的传输介质</li></ul></li><li><p><strong>概括</strong></p><ul><li>比特流与电子信号之间的转换，使用物理介质传输</li></ul></li><li><p><strong>协议簇</strong></p><ul><li>ISO2110</li><li>IEEE802</li><li>IEEE802.2</li><li>EIA/TIA RS-232</li><li>EIA/TIA RS-449</li><li>V.35</li><li>RJ-45</li></ul></li><li><p><strong>封装内容</strong></p><ul><li>二进制流</li><li>比特流，也就是所谓电流</li></ul></li><li><p><strong>简述</strong></p><ul><li>在 OSI 参考模型中，物理层（Physical Layer）是参考模型的最低层，也是 OSI 模型的第一层。物理层的主要功能是利用传输介质为数据链路层提供物理连接，实现比特流的透明传输。物理层的作用是实现相邻计算机节点之间比特流的透明传送，尽可能屏蔽掉具体传输介质和物理设备的差异。使其上面的数据链路层不必考虑网络的具体传输介质是什么。“透明传送比特流”表示经实际电路传送后的比特流没有发生变化，对传送的比特流来说，这个电路好像是看不见的。</li></ul></li></ul><h2 id="数据链路层" tabindex="-1">数据链路层 <a class="header-anchor" href="#数据链路层" aria-label="Permalink to &quot;数据链路层&quot;">​</a></h2><p>数据链路层（Data Link Layer）是OSI模型的第二层，负责建立和管理节点间的链路。该层的主要功能包括定义数据的基本格式、如何传输数据、如何标识数据、帧编码以及误差纠正控制。数据链路层的工作涉及数据帧和比特流之间的转换，以及封装和解封装数据帧。以下是关于数据链路层的详细信息：</p><ul><li><p><strong>功能</strong>：</p><ul><li>定义数据的基本格式，包括如何传输数据和如何标识数据。</li><li>实施帧编码和误差纠正控制以确保数据的可靠传输。</li></ul></li><li><p><strong>概括</strong>：</p><ul><li>数据链路层负责数据帧和比特流之间的转换，以便在不同节点之间传输数据。</li></ul></li><li><p><strong>协议簇</strong>：</p><ul><li>数据链路层涵盖了多个协议，包括但不限于：SLIP，CSLIP，PPP，MTU，ARP，RARP，SDLC、HDLC、PPP、STP以及帧中继。</li></ul></li><li><p><strong>封装内容</strong>：</p><ul><li>数据链路层封装数据帧，用于在物理层上传输。</li></ul></li><li><p><strong>简述</strong>：</p><ul><li>数据链路层的主要任务是将0和1的比特序列划分为具有意义的数据帧，然后传输给对端，完成数据帧的生成和接收。这可以通过一个类比来理解：将需要传输的数据比作来自不同来源的水，如果直接倒入池子中，无法分辨出不同来源的水。但如果将不同来源的水灌入瓶子中并打上标记，就能区分出不同来源的水。这就是为什么需要将数据划分为具有意义的数据帧并传输给对端的原因。需要注意的是，数据链路层只负责将数据传输给物理相连的两端，并不直接发送到最终地址。</li></ul></li><li><p><strong>子层</strong>：</p><ul><li>数据链路层通常分为两个子层：介质访问控制（MAC）和逻辑链路控制（LLC）。 <ul><li>MAC子层的主要任务是解决共享型网络中多用户对信道竞争的问题，完成网络介质的访问控制。</li><li>LLC子层的主要任务是建立和维护网络连接，执行差错校验、流量控制和链路控制。</li></ul></li></ul></li></ul><h2 id="网络层" tabindex="-1">网络层 <a class="header-anchor" href="#网络层" aria-label="Permalink to &quot;网络层&quot;">​</a></h2><p>网络层（Network Layer）是OSI模型的第三层，它负责将数据从发送端的主机传送到接收端的主机。在此过程中，可能存在多个数据链路，但网络层的任务是找出一条相对顺畅的通路将数据传递到目标地址。以下是关于网络层的详细信息：</p><ul><li><p><strong>功能</strong>：</p><ul><li>定义IP编址，以及定义路由功能。</li><li>实施拥塞控制和处理网际互连。</li></ul></li><li><p><strong>概括</strong>：</p><ul><li>网络层负责确定数据从发送端到接收端的路径，即经由哪个路由传递给哪个目标地址。</li></ul></li><li><p><strong>协议簇</strong>：</p><ul><li>网络层涵盖了多个协议，包括但不限于：IP，ICMP，OSPF，BGP，IGMP，ARP，RARP，IPX、RIP和OSPF。</li></ul></li><li><p><strong>封装内容</strong>：</p><ul><li>网络层封装数据为数据报，用于在网络中传输。</li></ul></li><li><p><strong>简述</strong>：</p><ul><li>网络层的主要任务是将数据从发送端的主机传输到接收端的主机。在这个过程中，可能存在多个数据链路，但网络层的职责是找出一条相对顺畅的通路将数据传递到目标地址。传输的地址使用的是IP地址，类似于我们的住址，可以从广域到局域逐步缩小范围，最终到达目标地址。</li></ul></li><li><p><strong>问题解决</strong>：</p><ul><li>在实现网络层功能时，需要解决以下主要问题： <ul><li><strong>寻址</strong>：解决了网络内部的寻址问题，而不同子网间通信需要逻辑地址（如IP地址）。</li><li><strong>交换</strong>：定义了不同的信息交换方式，如线路交换技术和存储转发技术。</li><li><strong>路由算法</strong>：当存在多条路径时，通过路由算法选择最佳路径，将信息从发送端传送到接收端。</li><li><strong>连接服务</strong>：用于控制从源节点到目的节点的流量，以防止阻塞并进行差错检测。</li></ul></li></ul></li></ul><p>这些层级和功能对于计算机网络的正常运行至关重要，它们共同构成了OSI模型的基础。</p><h2 id="传输层" tabindex="-1">传输层 <a class="header-anchor" href="#传输层" aria-label="Permalink to &quot;传输层&quot;">​</a></h2><h3 id="功能" tabindex="-1">功能 <a class="header-anchor" href="#功能" aria-label="Permalink to &quot;功能&quot;">​</a></h3><ul><li>端到端传输数据的基本功能</li><li>管理两个节点之间的数据传输</li></ul><h3 id="概括" tabindex="-1">概括 <a class="header-anchor" href="#概括" aria-label="Permalink to &quot;概括&quot;">​</a></h3><ul><li>是否有数据丢失</li></ul><h3 id="协议簇" tabindex="-1">协议簇 <a class="header-anchor" href="#协议簇" aria-label="Permalink to &quot;协议簇&quot;">​</a></h3><ul><li>TCP</li><li>UDP</li></ul><h3 id="封装内容" tabindex="-1">封装内容 <a class="header-anchor" href="#封装内容" aria-label="Permalink to &quot;封装内容&quot;">​</a></h3><ul><li>报文段</li></ul><h3 id="简述" tabindex="-1">简述 <a class="header-anchor" href="#简述" aria-label="Permalink to &quot;简述&quot;">​</a></h3><p>传输层（Transport Layer）是 OSI 模型的第4层。该层是通信子网和资源子网的接口和桥梁，起到承上启下的作用。其主要任务包括：</p><ul><li>传输连接管理：提供建立、维护和拆除传输连接的功能。传输层为高层提供 &quot;面向连接&quot; 和 &quot;面向无连接&quot; 两种服务。</li><li>处理传输差错：提供可靠的 &quot;面向连接&quot; 和不太可靠的 &quot;面向无连接&quot; 数据传输服务、差错控制和流量控制。在提供 &quot;面向连接&quot; 服务时，通过这一层传输的数据将由目标设备确认，如果在指定的时间内未收到确认信息，数据将被重发。</li></ul><h2 id="会话层" tabindex="-1">会话层 <a class="header-anchor" href="#会话层" aria-label="Permalink to &quot;会话层&quot;">​</a></h2><h3 id="功能-1" tabindex="-1">功能 <a class="header-anchor" href="#功能-1" aria-label="Permalink to &quot;功能&quot;">​</a></h3><ul><li>控制应用程序之间的会话能力</li><li>建立、管理和维护通信</li></ul><h3 id="概括-1" tabindex="-1">概括 <a class="header-anchor" href="#概括-1" aria-label="Permalink to &quot;概括&quot;">​</a></h3><ul><li>何时建立连接、何时断开连接以及保持多久连接</li></ul><h3 id="协议簇-1" tabindex="-1">协议簇 <a class="header-anchor" href="#协议簇-1" aria-label="Permalink to &quot;协议簇&quot;">​</a></h3><ul><li>NetBIOS</li><li>ZIP</li></ul><h3 id="封装内容-1" tabindex="-1">封装内容 <a class="header-anchor" href="#封装内容-1" aria-label="Permalink to &quot;封装内容&quot;">​</a></h3><p>（无）</p><h3 id="简述-1" tabindex="-1">简述 <a class="header-anchor" href="#简述-1" aria-label="Permalink to &quot;简述&quot;">​</a></h3><p>会话层（Session Layer）是 OSI 模型的第5层，是用户应用程序和网络之间的接口，主要任务包括：</p><ul><li>会话管理：允许用户在两个实体设备之间建立、维持和终止会话，并支持它们之间的数据交换。可以提供单向会话或双向同时会话，并管理会话中的发送顺序，以及会话的持续时间。</li><li>会话流量控制：提供会话流量控制和交叉会话功能。</li><li>寻址：使用远程地址建立会话连接。</li><li>出错控制：从逻辑上讲，会话层主要负责数据交换的建立、保持和终止，但实际的工作是接收来自传输层的数据，并负责纠正错误。会话控制和远程过程调用均属于这一层的功能。但应注意，此层检查的错误不是通信介质的错误，而是磁盘空间、打印机缺纸等类型的高级错误。</li></ul><h2 id="表示层" tabindex="-1">表示层 <a class="header-anchor" href="#表示层" aria-label="Permalink to &quot;表示层&quot;">​</a></h2><p>表示层（Presentation Layer）位于OSI分层结构的第六层，主要负责处理数据的格式化、代码转换以及数据加密等任务。它扮演了在异构系统之间通信时提供公共语言的角色，以实现互操作性。与第五层（传输层）不同，表示层处理与数据表示和传输相关的所有问题，包括数据格式转换、加密和压缩等。以下是表示层的详细信息：</p><ul><li><p><strong>功能</strong>：</p><ul><li>数据格式化：协商和建立数据交换的格式，解决不同应用程序之间的数据格式差异。</li><li>数据编码：处理字符集和数字的转换，允许不同数据类型在不同系统之间进行交流。</li><li>压缩和解压缩：减少数据传输量，提高效率。</li><li>数据加密和解密：增强数据传输的安全性，特别是在互联网上进行敏感信息的传输时。</li></ul></li><li><p><strong>概括</strong>：</p><ul><li>表示层的主要任务是将数据以一种网络可理解的格式进行格式化。不同网络类型可能需要不同的数据格式，因此表示层管理数据的格式转换，以使其适应特定网络的要求。此外，表示层还负责对图像和文件格式进行编码和解码。</li></ul></li><li><p><strong>协议簇</strong>：</p><ul><li>表示层涉及多个协议，包括但不限于：ASCII、ASN.1、JPEG 和 MPEG。</li></ul></li></ul><h2 id="应用层" tabindex="-1">应用层 <a class="header-anchor" href="#应用层" aria-label="Permalink to &quot;应用层&quot;">​</a></h2><p>应用层（Application Layer）是OSI参考模型的第七层，它直接与用户和应用程序交互，为用户提供各种网络服务和功能。这一层处理网络用户的请求，建立和终止与应用程序之间的连接，以及协调不同应用程序之间的工作。以下是有关应用层的详细信息：</p><ul><li><p><strong>功能</strong>：</p><ul><li>提供各种应用软件，包括Web应用。</li><li>实施特定应用的协议，例如文件传输、电子邮件等。</li><li>提供用户与网络之间的接口，允许用户与网络进行交互式通信。</li></ul></li><li><p><strong>概括</strong>：</p><ul><li>应用层为用户提供各种网络服务，例如电子邮件、文件传输、网络管理等。它充当用户和网络之间的窗口，使用户能够访问网络资源并与其他用户进行通信。</li></ul></li><li><p><strong>协议簇</strong>：</p><ul><li>应用层涵盖了多个协议和服务，包括但不限于：TFTP、HTTP、SNMP、FTP、SMTP、DNS、RIP 和 Telnet。</li></ul></li><li><p><strong>封装内容</strong>：</p><ul><li>应用层封装数据为报文，用于在网络中传输。</li></ul></li><li><p><strong>简述</strong>：</p><ul><li>应用层是网络用户和应用程序之间的接口，为用户提供了各种服务和功能。它包括文件传输、电子邮件、Web浏览等多种协议和应用程序。应用层的功能因用户需求而异，包括分布式数据库、分布式计算、远程文件传输、电子邮件、远程登录和控制等。</li></ul><p>应用层协议和程序有很多种，不同的网络操作系统之间在功能、界面、实现技术、对硬件的支持、安全性和可靠性方面可能存在差异。</p></li></ul><h2 id="小结" tabindex="-1">小结 <a class="header-anchor" href="#小结" aria-label="Permalink to &quot;小结&quot;">​</a></h2><p>OSI模型是一个理想的网络体系结构模型，通常网络系统只涉及其中的几层，很少有系统能够实现所有的七层，并完全遵循其规定。从网络功能的角度来看：</p><ul><li>前四层（物理层、数据链路层、网络层和传输层）主要提供数据传输和交换功能，即节点之间的通信。</li><li>第四层（传输层）充当上下两部分的桥梁，是整个网络体系结构中最关键的部分。</li><li>后三层（会话层、表示层和应用层）主要提供资源子网的功能，涉及用户与应用程序之间的信息和数据处理。</li></ul><p>综合来看，不同层级的功能共同构成了计算机网络的基础。</p><h2 id="tcp-ip分层模型" tabindex="-1">TCP/IP分层模型 <a class="header-anchor" href="#tcp-ip分层模型" aria-label="Permalink to &quot;TCP/IP分层模型&quot;">​</a></h2><p>TCP/IP协议被组织成四个概念层，其中三层对应于ISO参考模型中的相应层。TCP/IP协议不包括物理层和数据链路层，因此需要与其他协议一起协同工作。以下是TCP/IP分层模型的详细信息：</p><ul><li><p><strong>网络接口层</strong>（Network Interface Layer）：</p><ul><li>这一层包括与物理硬件之间的接口协议，但不涉及数据链路层和物理层的功能。它定义了诸如地址解析协议（ARP）之类的协议，提供TCP/IP协议与底层硬件之间的接口。</li></ul></li><li><p><strong>网际层</strong>（Internet Layer）：</p><ul><li>对应于ISO七层模型的网络层，包括IP协议、路由信息协议（RIP）等。网际层负责数据的包装、寻址和路由，还包括Internet控制消息协议（ICMP），用于网络诊断。</li></ul></li><li><p><strong>传输层</strong>（Transport Layer）：</p><ul><li>对应于ISO七层模型的传输层，提供端到端的通信服务。TCP协议提供可靠的数据流传输服务，UDP</li></ul></li></ul><p>协议提供不可靠的用户数据报服务。</p><ul><li><strong>应用层</strong>（Application Layer）： <ul><li>对应于ISO七层模型的应用层和表达层，包含了多个应用层协议和服务，如HTTP、FTP、SMTP、DNS等，负责提供各种网络应用和用户服务。</li></ul></li></ul><p>需要注意的是，TCP/IP协议族与OSI模型不完全匹配，因为它们的设计目标和历史背景不同。但它们都用于描述计算机网络中的不同层级和功能。</p>',53),n=[e];function u(s,h,p,d,P,c){return i(),a("div",null,n)}const q=l(o,[["render",u]]);export{I as __pageData,q as default};

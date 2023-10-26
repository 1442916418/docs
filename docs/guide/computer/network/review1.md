# 网络复习 - ChartAI

## 为什么传统上利用多个域名来提供网站资源会更有效？

在早期的网络应用和浏览器中，浏览器对于单个域名的并发请求是有限制的。当网站的内容主要由图像、样式表、脚本等资源组成时，如果所有资源都来自同一域名，那么加载的速度可能会受到限制。通过使用多个域名（或称为子域名、CDN域名等）来提供资源，浏览器可以并发地从不同的域名加载资源，从而提高页面的加载速度。

例如，浏览器可能对一个域名只允许6个并发连接。这意味着，如果一个页面有12个资源需要加载，那么在使用单个域名时，它们需要分两批进行加载。但是，如果这些资源被分散到两个域名上，那么浏览器可以同时从两个域名加载所有12个资源。

```html
<!-- 使用单个域名 -->
<img src="https://example.com/image1.jpg" />
<img src="https://example.com/image2.jpg" />

<!-- 使用多个域名 -->
<img src="https://cdn1.example.com/image1.jpg" />
<img src="https://cdn2.example.com/image2.jpg" />
```

但值得注意的是，现代浏览器已经提高了对单个域名的并发请求限制，而且随着HTTP/2和HTTP/3的普及，多个资源可以在单个连接上并行加载，所以这个策略可能不再那么重要。

## 从输入 URL 到整个网页加载完毕及显示在屏幕上的整个流程

1. **URL 输入**: 用户在浏览器的地址栏输入一个URL。

2. **DNS 解析**: 浏览器需要知道目标服务器的IP地址来获取网页资源。为此，浏览器会查询域名系统（DNS）来解析URL中的域名为对应的IP地址。

    ```python
    import socket
    ip_address = socket.gethostbyname('example.com')
    ```

3. **建立连接**: 浏览器与服务器建立一个TCP连接（对于HTTPS，这还涉及到SSL/TLS握手过程）。

4. **发送 HTTP 请求**: 浏览器通过已建立的连接发送一个HTTP GET请求，要求服务器返回URL对应的资源。

    ```http
    GET /index.html HTTP/1.1
    Host: example.com
    ```

5. **服务器处理**: 服务器收到请求后，可能会查询数据库、运行脚本或执行其他操作来生成或获取请求的资源。

6. **发送 HTTP 响应**: 服务器返回一个HTTP响应，其中包含资源的内容和其他相关的头信息。

    ```http
    HTTP/1.1 200 OK
    Content-Type: text/html

    <html>...</html>
    ```

7. **渲染页面**: 浏览器开始解析和渲染HTML内容。在此过程中，浏览器可能会发现需要从其他来源加载的资源（如图像、CSS、JavaScript文件）。对于这些资源，浏览器会重复上述的请求和接收过程。

8. **执行脚本**: 如果页面包含JavaScript，浏览器会执行它，这可能会导致页面的进一步更新或更多的资源请求。

9. **完成加载**: 当所有的资源都被加载和渲染，页面会被完全显示在屏幕上，此时浏览器的加载指示器（如进度条或旋转的图标）会消失。

此流程可能因浏览器、服务器配置和其他因素而略有不同，但大体上的步骤是相似的。

## Long-Polling、WebSockets 和 Server-Sent Event 之间有什么区别？

### Long-Polling

Long-Polling 是一种在 Web 应用中实现实时功能的技术。其基本思想是客户端发起一个到服务器的请求，并等待服务器的响应。当服务器有新的数据可用时，它会发送一个响应给客户端。客户端处理完这个响应后，会立即发起另一个请求，等待服务器的下一个响应。

```javascript
function poll() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', '/server-data', true);
  xhr.onload = function() {
    if (xhr.status == 200) {
      var data = JSON.parse(xhr.responseText);
      console.log(data);
      // 处理数据后再次轮询
      poll();
    }
  };
  xhr.send();
}

poll();
```

### WebSockets

WebSockets 是一种在单个 TCP 连接上进行全双工通信的协议。它允许服务器和客户端之间进行双向通信，这意味着服务器可以在任何时候向客户端发送数据，而无需客户端首先发起请求。

```javascript
var socket = new WebSocket('ws://example.com/socket-endpoint');

socket.onopen = function(event) {
  console.log('Connection opened');

  socket.send('Hello, Server!');
};

socket.onmessage = function(event) {
  var data = event.data;
  console.log('Received from server:', data);
};

socket.onclose = function(event) {
  console.log('Connection closed');
};
```

### Server-Sent Event (SSE)

SSE 也称为 EventSource，是一种只允许服务器向客户端发送数据的技术。与 WebSockets 不同，SSE 是单向的。它在一个持久的 HTTP 连接上工作，并使用标准的 HTTP 协议。这使得 SSE 在某些场景下，如只需要服务器到客户端的通信时，成为一个简单且有用的选择。

```javascript
var evtSource = new EventSource("/server-events");

evtSource.onmessage = function(event) {
  var data = event.data;
  console.log('Received from server:', data);
};

evtSource.onerror = function(event) {
  console.error('EventSource failed:', event);
};
```

- **区别总结**
  - **Long-Polling**：客户端发起请求，等待服务器的响应。当服务器有数据时，它会响应，然后客户端再发起新的请求。
  - **WebSockets**：建立一个持久的、双向的连接，允许服务器和客户端之间相互发送数据。
  - **Server-Sent Event**：只允许服务器向客户端发送数据的技术，在一个持久的 HTTP 连接上运作。

## request 和 response headers

### Diff. between Expires, Date, Age and If-Modified-

HTTP headers 是从服务器到浏览器或从浏览器到服务器传递信息的关键方式。以下是关于 `Expires`, `Date`, `Age` 和 `If-Modified-...` 这些头部的详细描述：

1. **Expires**:
   - `Expires` 响应头指明资源的过期日期和时间。浏览器可以在这个日期和时间之前，无需重新请求，直接从缓存中读取资源。
   - 示例：`Expires: Wed, 21 Oct 2023 07:28:00 GMT`

2. **Date**:
   - `Date` 响应头表示消息是什么时候被发送的。
   - 示例：`Date: Tue, 17 Oct 2023 07:28:00 GMT`

3. **Age**:
   - `Age` 响应头表示自原始服务器生成响应以来经过的时间（以秒为单位）。
   - 示例：`Age: 12`

4. **If-Modified-Since / If-Modified-...**:
   - `If-Modified-Since` 请求头使得客户端可以基于该资源上一次被修改的时间来请求该资源。这可以减少不必要的网络流量，因为只有在资源在上次获取后已被修改时，服务器才会返回新的资源。
   - 示例：`If-Modified-Since: Sat, 29 Oct 2022 19:43:31 GMT`

### Do Not Track

- `Do Not Track` 请求头是一个浏览器可以设置的头，表示用户不希望其浏览行为被任何网站追踪。
- 示例：`DNT: 1` (1 表示不追踪)

### Cache-Control

- `Cache-Control` 响应头控制了浏览器和其他中间代理如何缓存和再验证响应。
- 示例：`Cache-Control: no-store, no-cache, must-revalidate`

### Transfer-Encoding

- `Transfer-Encoding` 响应头指明了消息体的传输编码方式。比如 "chunked" 表示数据是分块发送的。
- 示例：`Transfer-Encoding: chunked`

### ETag

- `ETag` 响应头提供了一个资源的版本标识，通常是内容的哈希值或版本号。配合 `If-None-Match` 请求头，它可以帮助浏览器判断缓存的资源是否仍然是最新的。
- 示例：`ETag: "737060cd8c284d8af7ad3082f209582d"`

### X-Frame-Options

- `X-Frame-Options` 响应头可以用来指明浏览器应该如何处理一个网页中的 `<frame>`, `<iframe>`, `<embed>` 和 `<applet>` 元素。它可以防止点击劫持攻击。
- 示例：`X-Frame-Options: SAMEORIGIN`

### JavaScript 示例

要在JavaScript中设置或获取这些头，您可以使用 XMLHttpRequest 或 Fetch API。以下是使用 Fetch API 的简单示例：

```javascript
fetch('https://example.com/api/resource', {
  headers: {
    'If-Modified-Since': 'Sat, 29 Oct 2022 19:43:31 GMT'
  }
})
.then(response => {
  console.log(response.headers.get('ETag'));
})
.catch(error => {
  console.error('Error fetching the resource:', error);
});
```

这个示例发送一个带有 `If-Modified-Since` 请求头的请求，并在响应中检索 `ETag` 头。

## HTTP Method

HTTP 方法是 HTTP 协议中定义的一套动作，用于表示要对给定的资源执行的操作。每次发送 HTTP 请求时，都会使用其中之一的方法。

以下是一些常见的 HTTP 方法以及它们的解释：

1. **GET**: 请求指定的资源。GET 请求只应从服务器检索数据，并且不应产生任何副作用。

    ```javascript
    fetch('/example', {
      method: 'GET'
    });
    ```

2. **POST**: 提交数据以由资源处理。常用于表单提交。

    ```javascript
    fetch('/example', {
      method: 'POST',
      body: JSON.stringify(data)
    });
    ```

3. **PUT**: 从客户端更新现有资源或创建新资源。

    ```javascript
    fetch('/example/resource-id', {
      method: 'PUT',
      body: JSON.stringify(data)
    });
    ```

4. **DELETE**: 请求删除指定的资源。

    ```javascript
    fetch('/example/resource-id', {
      method: 'DELETE'
    });
    ```

5. **PATCH**: 对资源进行部分修改。

    ```javascript
    fetch('/example/resource-id', {
      method: 'PATCH',
      body: JSON.stringify(data)
    });
    ```

6. **HEAD**: 与 GET 方法类似，但不返回消息体，只检索资源的元信息。

7. **OPTIONS**: 返回服务器针对特定资源所支持的 HTTP 请求方法。

8. **CONNECT**: 用于网络隧道。

9. **TRACE**: 提供一个请求的回路测试路径。

这些方法有时也被称为 HTTP 动词。每个方法明确指示了对资源的预期行为。

## HTTP Status 301 与 302 的区别

HTTP 状态代码是由三位数字组成的，用于表示 Web 服务器处理请求的结果。特定的两个状态代码，301 和 302，与 URL 重定向相关。

- **301 Moved Permanently**：这意味着请求的资源已被永久移动到另一个 URI，并且所有将来的引用都应使用其中返回的一些 URI。它可以用来将网站的旧 URL 永久转移到新的 URL。

- **302 Found (HTTP/1.1) 或 Moved Temporarily (HTTP/1.0)**：表示请求的资源目前位于另一个 URI 下，但可能在将来会改变。因此，客户端应该继续使用原有的 URI。

### 区别

1. **持久性**：301 是永久移动，而 302 是临时移动。
2. **搜索引擎优化**：从 SEO 的角度看，301 重定向意味着旧页面的“链接权重”或“页面权威”会转移到新的 URL，而 302 则不会。
3. **浏览器行为**：在某些情况下，浏览器可能会缓存 301 重定向，而对于 302 重定向则不一定。

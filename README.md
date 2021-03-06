## douban-movie-electron



<p align="center">
  <img src="./assets/logo.png" width="300px">
</p>
<p align="center">
  <a href="https://github.com/GolderBrother/douban-movie-electron"><img
      src="https://img.shields.io/github/stars/GolderBrother/douban-movie-electron.svg?color=green&style=flat-square"
      alt="Starts"></a>
  <a href="https://github.com/GolderBrother/douban-movie-electron"><img
      src="https://img.shields.io/github/forks/GolderBrother/douban-movie-electron.svg?style=flat-square"
      alt="Forks"></a>
  <a href="https://github.com/GolderBrother/douban-movie-electron/blob/master/LICENSE"><img
      src="https://img.shields.io/github/license/GolderBrother/douban-movie-electron.svg?style=flat-square"
      alt="License"></a>
</p>

> 基于 Electron, React, React-router, Typescript 一款桌面豆瓣电影应用

---



### Start

```bash
# install fe pkg
$ yarn
# preivew
$ yarn electron-dev
# build
$ yarn build
# pack
$ yarn dist

```


### Preview

![photo-001](https://github.com/GolderBrother/PicBed/blob/master/Personal/douban-movie-electron-001.png?raw=true)
![photo-002](https://github.com/GolderBrother/PicBed/blob/master/Personal/douban-movie-electron-002.png?raw=true)
![photo-003](https://github.com/GolderBrother/PicBed/blob/master/Personal/douban-movie-electron-003.png?raw=true)
![photo-004](https://github.com/GolderBrother/PicBed/blob/master/Personal/douban-movie-electron-004.png?raw=true)
![photo-005](https://github.com/GolderBrother/PicBed/blob/master/Personal/douban-movie-electron-005.png?raw=true)
![photo-006](https://github.com/GolderBrother/PicBed/blob/master/Personal/douban-movie-electron-006.png?raw=true)

### Todo & Done

#### 首页

- [x] banner
- [x] 历史记录
- [x] 检索建议
- [x] 正在热映
- [x] 新片榜
- [x] 北美票房榜
- [x] 一周口碑榜
- [x] Top250
- [x] footer

#### 电影详情页

- [x] 电影评分、基本信息
- [x] 剧照
- [x] 预告片（点击打开播放虚拟页）
- [x] 评论
- [x] 热评

#### 搜索详情页

- [x] 搜索信息列表


### Tech

- React(react-hooks)
- React-router
- Typescript  
----
- ant-design
- react-lazy-load  
----
- axios
- lodash  
----
- Koa


### MIT license
Copyright (c) 2019 GolderBrother &lt;1204788939@qq.com&gt;

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the &quot;Software&quot;), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

---
built upon love by [docor](https://github.com/turingou/docor.git) v0.3.0


**参考链接**
- [Electron 文档](https://electronjs.org/docs/tutorial/application-distribution)
- [搭建自己的React+Typescript环境（一）](https://www.cnblogs.com/ssw-men/p/11155699.html)
- [Typescript相关坑与解决办法](https://www.imooc.com/article/47192)
- [一次解决React+TypeScript+Webpack 别名（alias）找不到问题的过程](https://blog.csdn.net/weixin_33698043/article/details/89663221)
- [React + Electron 搭建一个桌面应用](https://juejin.im/post/5a6a91276fb9a01cbd58ce32#heading-14)

TODO:
1.样式css -> scss
2.制作托盘功能

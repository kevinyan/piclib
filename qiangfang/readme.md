#  首先要先配置
1. 下载 ```qiangfang.js``` 到本地
2. 提前抓包获取 ```token```  && ```ChooseRoomId```


# 按下面步骤进行：
1. 访问页面：

```https://ztcwx.myscrm.cn/page/room.html?token=876&activityId=123&chooseRoomId=876
```

2. Fiddler代理静态资源：
```
EXACT:https://img.myscrm.cn/dist/projects/zxkp/vendor-e13a04f69181755ba263.js
EXACT:https://img.myscrm.cn/dist/projects/zxkp/js/page/room-b14101032875462ea827.js
```

```
qiangfang.js
```


3. 刷新页面


!(图片)[https://raw.githubusercontent.com/kevinyan/piclib/master/qiangfang/demo.jpg]


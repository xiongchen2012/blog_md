## Store

Action定义了State发生了什么样的变化，也就是**WHAT**<br>
Reducer定义了具体如何将这个变化应用(apply)到State中，也就是**HOW**<br>
Store是保存State的地方，一切的reducer,action都是在Store中发生的，也就是**WHERE**。

Store：可以理解为仓库，是保存state的地方贮藏室。根据Redux的设计思想，整个Redux的应用**有且仅有一个Store**，这个规定保证了整个应用的状态是可控的，不会引起混乱。

现实中的仓库可以提供物品存入、取出的功能。Redux的Store也提供了这些基本功能：<br>
1. 维持整个Redux应用的State
2. 随时可以获取应用的State（通过getState()方法）
3. 随时可以更新应用的State（通过dispatch(action)方法）
4. 可以注册监听器订阅State的变化（通过subscribe(listener)方法），或者注销监听器

#### 创建Store

Redux提供了createStore方法创建Store；
```js
import { createStore } from 'redux';

let store = createStore( reducers, initialState){
    /* ... */
}
```

第1个参数是通过combineReducers()合并成1个的Reducer合集；
第2个参数是可选的，即应用初始化时候的State；

#### 获取State

Store提供了getState()方法可以在任意时间点获取Store中保存的State;

```js
let state = store.getState())  /* {visibilityFilter: "SHOW_ALL", todos:[] } */
```

#### 更新State

Store提供了dispatch(action)方法，可以触发reducer根据不同类型的action更新state

```js
/* dispatch参数：具体的Action或Action创建函数 */
store.dispatch(action)
```

**这里的更新不是指更新原有State中某个/某几个字段，而是生成新的state替换Store中的旧state**

#### 监控State

Store提供了subscribe(listener)方法，用于当state更新通知listener
```js
/* listner是一个函数，当State更新时会被调用 */
let unsubscribe = store.subscribe(()=>{
    console.log(store.getState());
});

/* 可以随时注销Listener */
unsubscribe();
```

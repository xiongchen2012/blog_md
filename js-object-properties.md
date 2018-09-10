## Javascript对象属性

### 属性的分类

 Javascript对象的属性有3种类型：  
 1. 命名数据字段（Named Data Property）
 2. 命名存取器字段（Named Accessor Property）
 3. 内置字段（Internal Property）

#### 命名数据字段（Named Data Property）  

命名数据字段是JS对象最常见的属性，平时我们大部分时间接触和使用的都是这种类型的字段。它是名称(Key)和值(Value)的映射，一般形式是：

```  js
    let obj = {
        key: value
    }

    //访问这类属性的值的方法有以下2种
    console.log(obj.key);
    console.log(obj[key]);

    //设置这类属性的值的方法也有2种
    obj.key = value;
    obj[key] = value;
```

#### 字段存取器（Named Accessor Property）  

除了上面两种给属性设置值的方法之外，还可以通过函数进行属性的赋值和取值。这种函数又叫存取器（Java里面又叫Getter和Setter）。这些存取器函数本身也是对象的属性之一，所以又叫命名存取器，一般形式是：

```  js
    let obj = {
        get key(){
            return value;
        },
        set key(value){
            key = value
        }
    }

    //调用方法和第1种是相同的。
```

#### 内置字段（Internal Property）

JS对象还有一些属性是ECMAJavascript规范规定的，也只有规范会用到这些属性，这些属性无法直接访问，但是又确实影响了对象的行为，因此管这些属性叫“内部”属性。

内部属性的特征是用两个方括号围起来的，比如[[Prototype]]属性用来指示对象的prototype,你没办法使用`obj.[[ProtoType]]`来访问这个属性的值，但是你可以通过`Object.getPrototypeOf()`来访问。同时，也没办法直接指定这类属性的值，直接使用`obj.[[Prototype]]=something`给它赋值会出错，但是可以用`Object.create()`赋值或者指定对象的`__prototype__`属性进行赋值

另外一个例子是[[Extensible]]内置属性，用于标记对象能否扩展它的属性（添加新的字段）。只能通过`Object.isExtensible()`来访问，或者是通过`Object.preventExtensions()`来将其设置为false,一旦设置成false，就不能再设置成true了，因为没有提供叫类似`Object.allowExtensions()`这样的方法。

### 字段的属性

字段的值和元数据信息都保存在字段的属性（Attribute）中，字段的属性一般用双括号来表示：

**命名数据**字段有以下两个属性：

- [[Value]] 存放的是字段的值
- [[Writable]] 标记字段的值是否可以被赋值运算符（=）赋值


**字段存取器**字段有以下两个属性：

- [[Get]] 存放了字段的getter函数，读取该字段的值时会被调用
- [[Set]] 存放了字段的setter函数，设置字段值的时候会被调用

还有一些所有字段都有的属性：

- [[Enumerable]] 标记字段是否能够被枚举
- [[Configurable]] 标记字段的属性是否允许被修改（也就是字段的元数据是否能被修改）

| **Attribute key** | **Default value** | Behavior                                                     |
| ----------------- | ----------------- | ------------------------------------------------------------ |
| [[Value]]         | `undefined`       |                                                              |
| [[Get]]           | `undefined`       |                                                              |
| [[Set]]           | `undefined`       |                                                              |
| [[Writable]]      | `false`           | 是否可以被重新赋值（严格模式下对false的属性赋值会报错）      |
| [[Enumerable]]    | `false`           | 是否可以在 [`for...in`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/for...in) 循环和 [`Object.keys()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/keys) 中被枚举 |
| [[Configurable]]  | `false`           | 表示对象的属性是否可以被删除，以及除`writable`特性外的其他特性是否可以被修改 |

### Property Descriptor

属性描述符将上述字段的属性描述对象化，每一个对象的字段都可以用属性描述符来表达。比如：

```json
{
    value: 123,
    writable: false,
    enumerable: true,
    configurable: false
}
```

以上描述符定义了一个只读的字段，值是123；这种直接给出值的描述符叫**数据描述符**，还有一种通过getter/setter函数定义的描述符叫**存取描述符**，下面的描述符和上述的等价：

```json
{
    get: function(){ return 123 },
    enumerable: true,
    configurable: false
}
```

描述一个属性，只能用两种描述符中的一种，不能同时存在。

- 数据描述符可以有：value、writable、enumerable、configurable
- 存取描述符可以有: get、set、enumerable、configurable

#### 使用属性描述符的函数

1. **Object.defineProperty** 

   语法是：

   ```
   Object.defineProperty(obj, prop, descriptor)
   ```

   为对象 `obj` 定义新的/更新旧的属性 `prop` ，字段的属性由 `descriptor` 决定，返回新的经过修改的对象。

2. **Object.defineProperties**

3. **Object.create**

4. **Object.getOwnPropertyDescriptor**




### 参考
[Object properties in JavaScript](http://2ality.com/2012/10/javascript-properties.html)

[Object.defineProperty MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)

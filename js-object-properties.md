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

#### 命名存取器字段（Named Accessor Property）  

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

JS对象还有一些属性是ECMAJavascript规范规定的，也只有规范会用到这些属性，这些属性是无法直接访问到的，但是又确实影响了对象的行为，因此才管这些属性叫“内置”属性。

内置属性的特征是用两个方括号围起来的，比如[[Prototype]]属性用来指示对象的prototype,你没办法使用`obj.[[ProtoType]]`来访问这个属性的值，但是你可以通过`Object.getPrototypeOf()`来访问。

同时，你也没办法直接指定这种属性的值，比如说还是[[Prototype]]，直接使用`obj.[[Prototype]]=something`给它赋值肯定是不行的，但是你可以用`Object.create()`来赋值或者指定对象的`__prototype__`属性来赋值

另外一个例子是[[Extensible]]内置属性，用于标记对象能否扩展它的属性（添加新的字段）。只能通过`Object.isExtensible()`来访问，或者是通过`Object.preventExtensions()`来将其设置为false,一旦设置成false，就不能再设置成true了，因为没有提供叫类似`Object.allowExtensions()`这样的方法。

### 参考
[Object properties in JavaScript](http://2ality.com/2012/10/javascript-properties.html)

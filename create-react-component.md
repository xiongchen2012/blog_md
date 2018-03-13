## Function

```js
function Welcome(props){
    return <h1>Hello, {props.name}</h1>;
}
```

## Arrow Function

```js
const Welcome = ({name})=> {
    return <h1>Hello, {name}</h1>;
}
```
函数和箭头函数实际上是一回事，惟一有区别的就是props传参。<br>
函数可以把props作为参数一起传进来，箭头函数只能把props下面具体的参数挨个传进来。如上例中的name


## Class

```js
class Welcome extends React.Component{
    constructor(props){
        super(props);
        // something else
    }
    
    render(){
        return <h1>Hello, {this.props.name}</h1>;
    }
}
```


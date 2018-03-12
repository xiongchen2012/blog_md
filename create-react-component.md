## Function

```js
function Welcome(props){
    return <h1>Hello, {props.name}</h1>;
}
```

## Arrow Function

```js
const Welcome = ({props})=> (
    return <h1>Hello, {props.name}</h1>;
)
```

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


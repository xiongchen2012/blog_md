import React from "react";
import ReactDOM from "react-dom";
import moment from "moment";
import { Input } from "antd";

class InputEditor extends React.Component {
    constructor(props) {
        super(props);
        this.value = this.props.value;
        this.defaultValue = this.value ? this.value : "";
        this.onChange = this.onChange.bind(this);
    }

    getValue() {
        let updated = {};
        updated[this.props.column.key] = this.dateStr;
        return updated;
    }

    getInputNode() {
        let inputEle = ReactDOM.findDOMNode(this).querySelector("input");
        return inputEle;
    }

    onChange = (value, newValue) => {
        this.value = newValue;
    };
    render() {
        return (
            <div>
                <Input
                    style={{ width: "100%", height: "100%" }}
                    size="small"
                    defaultValue={this.defaultValue}
                    value={this.value}
                    onChange={this.onChange}
                />
            </div>
        );
    }
}

export default InputEditor;

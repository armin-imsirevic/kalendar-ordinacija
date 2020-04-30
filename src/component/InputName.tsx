import React from 'react';

export class InputName extends React.Component<{disabled: boolean, value}, {value: string}> {
    constructor(props) {
        super(props);
        this.state = {value: props.value};

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    render() {
        return (<input disabled={this.props.disabled} className='input-name' type='text' name='name' value={this.state.value} onChange={this.handleChange} />);
    }
}
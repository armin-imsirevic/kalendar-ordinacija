import ReactDOM from 'react-dom';
import React from 'react';

const modalRoot: HTMLElement = document.getElementById('portal-root') as any;

export class PortalNotification extends React.Component {
    el: HTMLElement;

    constructor(props) {
        super(props);
        this.el = document.createElement('div');
    }

    componentDidMount() {
        console.log(this.el);
        modalRoot.appendChild(this.el);
    }

    componentWillUnmount() {
        console.log(this.el);
        modalRoot.removeChild(this.el);
    }

    render() {
        console.log(this.el);

        return ReactDOM.createPortal(
            this.props.children,
            this.el,
        );
    }
}
import ReactDOM from 'react-dom';
import React from 'react';
import { INotificationData } from './interface';

const modalRoot: HTMLElement = document.getElementById('portal-root') as any;

interface PortalNotificationProps {
    notificationData: INotificationData;
}

export class PortalNotification extends React.Component<PortalNotificationProps> {
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
            this.constructChildren(),
            this.el,
        );
    }

    constructChildren = () => {
        const notificationData = this.props.notificationData;
        if (notificationData && notificationData.message){

            return this.props.notificationData.message;
        }
    }
}
import React from 'react';

export class TimeSelect extends React.PureComponent<{onChange: any, isEven: boolean, required: boolean, disabled: boolean}> {
    render () {
        const {
            required,
            onChange,
            disabled,
        } = this.props;
        return (
            <select disabled={disabled} onChange={onChange} name='time' required={required}>
                <option></option>
                {
                    this.props.isEven ? (<>
                        <option value='08:00'>08:00</option>
                        <option value='08:30'>08:30</option>
                        <option value='09:00'>09:00</option>
                        <option value='09:30'>09:30</option>
                        <option value='10:00'>10:00</option>
                        <option value='10:30'>10:30</option>
                        <option value='11:30'>11:30</option>
                        <option value='12:00'>12:00</option>
                        <option value='12:30'>12:30</option>
                        <option value='13:00'>13:00</option>
                        <option value='13:30'>13:30</option>
                    </>) : (<>
                        <option value='14:00'>14:00</option>
                        <option value='14:30'>14:30</option>
                        <option value='15:00'>15:00</option>
                        <option value='15:30'>15:30</option>
                        <option value='16:30'>16:30</option>
                        <option value='17:00'>17:00</option>
                        <option value='17:30'>17:30</option>
                        <option value='18:00'>18:00</option>
                        <option value='18:30'>18:30</option>
                    </>)
                }
            </select>
        );
    }
};


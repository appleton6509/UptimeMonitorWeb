import { ShadowBox } from 'components/Design/ShadowBox';
import {Component, React} from 'react'

export class ConfirmEmailSuccess extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
        <ShadowBox>
            Confirmation successful, please sign in;
        </ShadowBox>);
    }
}
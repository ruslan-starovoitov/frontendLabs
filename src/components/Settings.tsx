import {Component} from "react";

import React from 'react';
import List from '@material-ui/core/List';
import PseudonymSettingsItem from "./parts/PseudonymSettingsItem";
import {inject, observer} from "mobx-react";
import AccountsStore from "../stores/AccountsStore";

type StoreProps = {
    AccountsStore: AccountsStore;
};

interface Props extends StoreProps {
    classes: any;
}

interface State {

}

@inject("AccountsStore")
@observer
export default class Settings extends Component<Props, State> {
    static defaultProps = {} as StoreProps;

    constructor(props: Props) {
        super(props);
        this.state = { ...this.state };
    }

    render() {
        const accountsStore = this.props.AccountsStore;
        return <List>
            {
                accountsStore.userAccounts.map(account =>
                    <PseudonymSettingsItem
                        account={account}
                    />
                )
            }
            </List>;
    }
}

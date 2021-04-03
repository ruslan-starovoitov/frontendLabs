import {Component} from "react";

import React from 'react';
import List from '@material-ui/core/List';
import PseudonymSettingsItem from "./parts/PseudonymSettingsItem";
import {inject, observer} from "mobx-react";
import AccountsStore from "../stores/AccountsStore";
import {Box, Paper} from "@material-ui/core";
import Button from "@material-ui/core/Button";

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

    createAccount =() =>{
        let username = prompt("Please, enter new username", "username");
        if(username===null || username.length===0 || username.indexOf(' ')!==-1){
            alert("Unacceptable username. Username should be one word.")
            return;
        }
        this.props.AccountsStore.addAccount(username, 'https://i.imgur.com/fgrfeVu.jpg');
    }

    render() {
        const accountsStore = this.props.AccountsStore;
        return <List>
            {
                accountsStore.userAccounts.map(account =>
                    <PseudonymSettingsItem key={account.id}
                        account={account}
                    />
                )
            }
            <Box marginTop={'30px;'}>
                <Button variant="contained" color={"primary"} onClick={()=>{
                    this.createAccount();
                }}>
                    CREATE NEW PSEUDONYM
                </Button>
            </Box>
            </List>;
    }
}

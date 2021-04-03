import React, {Component} from 'react';
import {Theme, createStyles, withStyles} from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Chip from "@material-ui/core/Chip";
import Button from "@material-ui/core/Button";
import AccountsStore from '../../stores/AccountsStore';
import {inject, observer} from "mobx-react";
import Account from "../../data/Account";
import {makeObservable} from "mobx";

const styles = (theme: Theme) =>
    createStyles({
        root: {
            width: '500px',
            marginTop: '30px'
        },
        media: {
            height: 0,
            paddingTop: '56.25%', // 16:9
        },
        expand: {
            transform: 'rotate(0deg)',
            marginLeft: 'auto',
            transition: theme.transitions.create('transform', {
                duration: theme.transitions.duration.shortest,
            }),
        },
        expandOpen: {
            transform: 'rotate(180deg)',
        },
        avatar: {
            backgroundColor: red[500],
        },
        column: {
            flexBasis: '33.33%',
        },
        helper: {
            borderLeft: `2px solid ${theme.palette.divider}`,
            padding: theme.spacing(1, 2),
        },
        link: {
            color: theme.palette.primary.main,
            textDecoration: 'none',
            '&:hover': {
                textDecoration: 'underline',
            },
        },
    });


type StoreProps = {
    AccountsStore: AccountsStore;
};

interface Props extends StoreProps {
    classes: any;
    account: Account;
}

interface State {
    expanded: boolean;
}

@inject("AccountsStore")
@observer
class PseudonymSettingsItem extends Component<Props, State>{
    static defaultProps = {} as StoreProps;

    constructor(props: Props) {
        super(props);
        this.state = { ...this.state };
    }

    handleExpandClick =() =>{
        this.setState({expanded : !this.state.expanded});
    }

    deleteAccountTag =(accountId: number, tagText: string) =>{
        this.props.AccountsStore.deleteAccountTag(accountId, tagText);
    }

    deleteAccount =(accountId: number) =>{
        this.props.AccountsStore.deleteAccount(accountId);
    }

    addNewTag =(accountId: number) =>{
        let newTagText = prompt("Please, enter new tag name", "tagName");
        if(newTagText===null || newTagText.length===0 || newTagText.indexOf(' ')!==-1){
            alert("Unacceptable tag name. Tag should be one word.")
            return;
        }
        let ok = this.props.AccountsStore.addNewTag(accountId, newTagText);
        if(!ok){
            alert("Such tag already exists")
        }
    }

    render() {
        const account = this.props.AccountsStore.getAccountById(this.props.account.id);
        return <Card className={this.props.classes.root}>
                <CardHeader
                    avatar={
                        <Avatar  aria-label="recipe" className={this.props.classes.avatar} src={account.imageUrl}>
                        </Avatar>
                    }
                    title={account.username}
                    action={
                        <IconButton
                            className={clsx(this.props.classes.expand, {
                                [this.props.classes.expandOpen]: this.state.expanded,
                            })}
                            onClick={this.handleExpandClick}
                            aria-expanded={this.state.expanded}
                            aria-label="show more"
                        >
                            <ExpandMoreIcon />
                        </IconButton>
                    }
                />
                <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <Typography paragraph>Tags:</Typography>
                        <div className={this.props.classes.column} />
                        <div className={this.props.classes.column}>
                            {
                                account.tags.map(tag =>
                                    <Chip label={tag} onDelete={() => {
                                        this.deleteAccountTag(account.id, tag);
                                    }} />
                                )
                            }

                        </div>
                    </CardContent>
                    <CardActions>
                        <Button size="small" color="primary" onClick={()=>{
                            this.addNewTag(account.id);
                        }}>
                            Add new tag
                        </Button>
                        <Button size="small" color="secondary" onClick={()=>{
                            this.deleteAccount(account.id);
                        }}>
                            Delete pseudonym
                        </Button>
                    </CardActions>
                </Collapse>
            </Card>;
    }
}

export default withStyles(styles, { withTheme: true })(PseudonymSettingsItem);

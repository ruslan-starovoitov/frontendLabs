import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Chip from "@material-ui/core/Chip";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme: Theme) =>
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
    }),
);

export default function RecipeReviewCard() {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Card className={classes.root}>
            <CardHeader
                avatar={
                    <Avatar  aria-label="recipe" className={classes.avatar} src="https://i.imgur.com/sicII7N.jpg">
                    </Avatar>
                }
                title="First Username"
                action={
                    <IconButton
                        className={clsx(classes.expand, {
                            [classes.expandOpen]: expanded,
                        })}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                    >
                        <ExpandMoreIcon />
                    </IconButton>
                }
            />
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography paragraph>Method:</Typography>
                    <div className={classes.column} />
                    <div className={classes.column}>
                        <Chip label="Barbados" onDelete={() => {}} />
                    </div>
                </CardContent>
                <CardActions>
                    <Button size="small" color="primary">
                        Add new tag
                    </Button>
                </CardActions>
            </Collapse>
        </Card>
    );
}

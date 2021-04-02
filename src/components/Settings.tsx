import { Component } from "react";

import React from 'react';
import List from '@material-ui/core/List';
import RecipeReviewCard from "./parts/RecipeReviewCard";
import DetailedAccordion from "./parts/Accordion";

export default class Settings extends Component {
    render() {
        return <List>
            <RecipeReviewCard/>
            <RecipeReviewCard/>
        </List>;
    }
}

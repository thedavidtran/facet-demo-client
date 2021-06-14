import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import CurrencyTextField from "@unicef/material-ui-currency-textfield";

const useStyles = makeStyles((theme) => ({
	card: {
		margin: "0.5em",
		display: "flex",
		flexWrap: "wrap",
		"& > *": {
			margin: theme.spacing(1.2),
			width: theme.spacing(15),
			height: theme.spacing(18)
		}
	}
}));

const Summary = ({summary}) => {
	const classes = useStyles();
	return (
		<Paper className={classes.card} elevation={3}>
			<Grid container spacing={2}>
				<Grid item>
					<Typography
						style={{fontSize: "20px"}}
						className={classes.title}
						color="textSecondary"
						gutterBottom
					>
						{summary.title}
					</Typography>
					<Typography variant="h5" component="h2">
						{summary.balance}
					</Typography>
				</Grid>
			</Grid>
		</Paper>
	);
};

export default Summary;
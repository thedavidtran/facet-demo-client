import Button from "@material-ui/core/Button";
import React, {useState} from "react";
import {useHistory} from "react-router-dom";
import RecordDataService from "../services/record";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import CurrencyTextField from "@unicef/material-ui-currency-textfield";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const AddRecord = ({retrieveRecords}) => {
	const initialRecordState = {
			type: "asset",
			name: "",
			balance: 0
		};
	const [record, setRecord] = useState(initialRecordState);
	const handleInputChange = (event) => {
		const {name, value} = event.target;
		setRecord({...record, [name]: value});
	};
	const types = [{value: "asset", caption: "Asset"}, {value: "liability", caption: "Liability"}];
	const history = useHistory();
	const saveRecord = async () => {
		try {
			const data = {
					type: record.type,
					name: record.name,
					balance: record.balance
				};
			const response = await RecordDataService.create(data);
			const payload = response.data;
			setRecord({
				id: payload.id,
				type: payload.type,
				name: payload.name,
				balance: payload.balance
			});
			await retrieveRecords();
			navigateToRecords()
		} catch (err) {
			// something went wrong
			newRecord();
		}
	};

	const newRecord = () => {
		setRecord(initialRecordState);
	};

	const navigateToRecords = () => {
		history.push("/records");
	}

	const useStyles = makeStyles((theme) => ({
		paper: {
			marginTop: theme.spacing(8),
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
		},
		avatar: {
			margin: theme.spacing(1),
			backgroundColor: theme.palette.secondary.main,
		},
		form: {
			width: '100%', // Fix IE 11 issue.
			marginTop: theme.spacing(3),
		},
		submit: {
			margin: theme.spacing(3, 0, 2),
		},
	}));

	const classes = useStyles();

	return (
		<Container component="main" maxWidth="xs">
			<div className={classes.paper}>
				<Typography component="h1" variant="h5">
					Add Record
				</Typography>
				<form className={classes.form} noValidate>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<TextField
								required
								fullWidth
								id="name"
								label="Name"
								name="name"
								value={record.name}
								onChange={handleInputChange}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								select
								fullWidth
								id="type"
								name="type"
								label="Type"
								value={record.type}
								onChange={handleInputChange}
							>
								{types.map((option) => (
									<MenuItem key={option.value} value={option.value}>
										{option.caption}
									</MenuItem>
								))}
							</TextField>
						</Grid>
						<Grid item xs={12}>
							<CurrencyTextField
								fullWidth
								label="Balance"
								value={record.balance}
								currencySymbol="$"
								onChange={(event, value) => {
									setRecord({
										...record,
										balance: value,
									})
								}}
							/>
						</Grid>
					</Grid>
					<Button onClick={saveRecord} color="primary">Submit</Button>
					<Button onClick={navigateToRecords}>Cancel</Button>
				</form>
			</div>
		</Container>
	);


	/*<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
					>
						Sign Up
					</Button>*/

};

export default AddRecord;
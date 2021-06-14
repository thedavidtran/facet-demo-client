import React, {useState, useEffect} from "react";
import {useHistory} from "react-router-dom";
import RecordDataService from "../services/record";
import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import {
	Switch,
	Route,
	useRouteMatch
} from "react-router-dom";
import Summary from "./Summary";
import AddRecord from "./AddRecord";

const useStyles = makeStyles((theme) => ({
	root: {
		'& > *': {
			margin: theme.spacing(1),
		},
	},
	table: {
		minWidth: 650
	},
	deleteButton: {
		float: "right"
	}
}));

function currencyFormat(num) {
	return (num >= 0) ? `$${num}` :`-$${Math.abs(num)}`;
}

const RecordsList = () => {
	const [records, setRecords] = useState([]);
	const [netWorth, setNetWorth] = useState(0);
	const [totalAsset, setTotalAsset] = useState(0);
	const [totalLiability, setTotalLiability] = useState(0);

	useEffect(() => {
		async function fetchData() {
			await retrieveRecords();
		}

		fetchData();
	}, []);

	const retrieveRecords = async () => {
		let response = await RecordDataService.getAll();
		setRecords(response.data);
		response = await RecordDataService.summary(12345); // TODO: user id
		let data = response.data;
		setNetWorth(data.net_worth);
		setTotalAsset(data.total_asset);
		setTotalLiability(data.total_liability);
	};

	const {path, url} = useRouteMatch();
	const history = useHistory();

	const handleAddRecordClick = () => {
		history.push(`${url}/add`);
	};

	const handleDeleteRecordClick = async (recordId) => {
		const response = await RecordDataService.remove(recordId);
		if (response) await retrieveRecords();
	}

	const classes = useStyles();
	return (
		<div>
			<Switch>
				<Route exact path={path}>
					<div>
						<Summary styles={{width: "20rem"}} summary={{title: "Net Worth", balance: currencyFormat(netWorth)}} />
						<Summary summary={{title: "Total Assets", balance: currencyFormat(totalAsset)}} />
						<Summary summary={{title: "Total Liabilities", balance: currencyFormat(totalLiability)}} />
					</div>
					<Button color="primary" onClick={handleAddRecordClick}>Add Record</Button>
					<div className={classes.root}>
						<TableContainer component={Paper}>
							<Table className={classes.table} aria-label="simple table">
								<TableHead>
									<TableRow>
										<TableCell>Name</TableCell>
										<TableCell align="right">Type</TableCell>
										<TableCell align="right">Balance</TableCell>
										<TableCell align="center">Delete</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{records.map((row) => (
										<TableRow key={row.id}>
											<TableCell component="th" scope="row">
												{row.name}
											</TableCell>
											<TableCell align="right">{row.type}</TableCell>
											<TableCell align="right">{currencyFormat(row.balance)}</TableCell>
											<TableCell className={classes.deleteButton} algin="right"><Button onClick={() => handleDeleteRecordClick(row.id)} color="secondary">x</Button></TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</TableContainer>
					</div>
				</Route>
				<Route path={`${path}/add`}>
					<AddRecord retrieveRecords={retrieveRecords} />
				</Route>
			</Switch>
		</div>
	);
};

export default RecordsList;
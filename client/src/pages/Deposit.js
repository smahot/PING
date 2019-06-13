import React from 'react';

import { withStyles } from '@material-ui/core/styles';

import CreatePartner from '../components/Deposit/CreatePartner';
import CreateProject from '../components/Deposit/CreateProject';

import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import AuthService from '../components/AuthService';
import i18n from '../components/i18n';
/**
 * Deposit of a project
 */

const styles = theme => ({
	root: {
		flexGrow: 1,
		width: '100%',
		maxWidth: 1150,
		margin: 'auto',
		padding: theme.spacing.unit * 2,
	},
	paper: {
		padding: theme.spacing.unit * 2,
		textAlign: 'left',
		color: theme.palette.text.secondary,
	},
});

const DEFAULT_STATE = {
	years: [],
	majors: [],
	//années et majeures sélectionnées
	study_year: [],
	majors_concerned: [],

	stepIndex:2,
	title: "",
	description: "",
	keyWords: [],
	files: [],
	urls: [],
	email: "",
	company: "",
	first_name: "",
	last_name: "",
	finished: false,
	submited: false
}

class Deposit extends React.Component {
	constructor(props) {
		super(props);

		this.state = { ...DEFAULT_STATE }

	}



	// Revoir le fonctionnement de la variable finished. Est-elle vraiment nécessaire ?
	handleNext = () => {
		const { stepIndex } = this.state;

		if (!this.state.finished) {
			this.setState({
				stepIndex: stepIndex + 1,
				finished: stepIndex >= 2
			});
		}
	};

	// A voir s'il est vraiment nécessaire de pouvoir revenir en arrière
	handlePrev = () => {
		const { stepIndex } = this.state;
		if (stepIndex > 0) {
			this.setState({ stepIndex: stepIndex - 1 });
		}
	};

	FilesUpload() {
		return new Promise((resolve, reject) => {
			var formData = new FormData()
			/*Object.keys(this.state.files).forEach((key)=>{  //On parcourt la liste des fichiers
				const file = this.state.files[key]
				formData.append(key, new Blob([file], {type : file.type}), file.name || 'file') //On ajoute dans le formData le fichier
			})*/

			this.state.files.forEach((file) => {
				formData.append(file.name, new Blob([file], { type: file.type }), file.name || 'file')
			})

			AuthService.fetch('/api/addFile', {
				method: 'POST',
				body: formData
			})
				.then((resp) => {
					resp.json().then((urls) => {
						this.setState({ urls: urls })
						return resolve()
					});
				})
				.catch((err) => { return reject(err) })
		});
	}

	getStepContent(stepIndex) {
		const lng = this.props.lng;
		const { classes } = this.props;
		switch (stepIndex) {
			//Information about the partner
			case 0:
				return (
					<div>
						<Grid container direction="column" justify="center" alignItems="flex-start">
							<Grid item className={classes.paper}>
								<Typography variant="h6">{i18n.t('home.p1', { lng })}</Typography>
								<Typography>
									{i18n.t('home.p1_l1', { lng })}<br />
									{i18n.t('home.p1_l2', { lng })}<br />
								</Typography>
							</Grid>
							<Grid item className={classes.paper}>
								<Typography variant="h6">{i18n.t('home.p2', { lng })}</Typography>
								<Typography>
									{i18n.t('home.p2_l1', { lng })}<br />
									{i18n.t('home.p2_l2', { lng })}<br />
									{i18n.t('home.p2_l3', { lng })}<br />
									{i18n.t('home.p2_l4', { lng })}<br />
								</Typography>
							</Grid>
							<Grid item className={classes.paper}>
								<Typography variant="h6">{i18n.t('home.p3', { lng })}</Typography>
								<Typography>
									{i18n.t('home.p3_l4', { lng })}<br />
									{i18n.t('home.p3_l5', { lng })}<br />
									{i18n.t('home.p3_l6', { lng })}<br />
									{i18n.t('home.p3_l7', { lng })}<br />
								</Typography>
							</Grid>
							<Grid item className={classes.paper}>
								<Typography variant="h6">{i18n.t('home.p4', { lng })}</Typography>
								<Typography>
									{i18n.t('home.p4_l1', { lng })}<br />
									{i18n.t('home.p4_l2', { lng })}<br />
									{i18n.t('home.p4_l3', { lng })}<br />
									{i18n.t('home.p4_l4', { lng })}<br />
								</Typography>
							</Grid>
							<Grid item xs={2} style={{ paddingBottom: "20px", paddingLeft: "20px" }}>
								<Button lng={lng} variant='contained' color='primary' onClick={this.handleNext}>
									<Typography>
										{i18n.t('next.label', { lng })}
									</Typography>
								</Button>
							</Grid>
						</Grid>
					</div>
				);

			case 1: //Applying padding to the parent with at least half the spacing value applied to the child : Negative margin workarounds
				return (
					<CreatePartner lng={lng} next={this.handleNext} />
				);

			/**
			 * Information about the project
			 */
			case 2:
				return (
					<CreateProject lng={lng} next={this.handleNext} />
				)
			case 3:
				return (
					<Grid container lng={lng}>
						<Grid item>
							<br />
							<div> {i18n.t('message.label', { lng })} </div>
							<br /><br />
						</Grid>
					</Grid>);
			default:
				return <div></div>;
		}
	}

	render() {
		const lng = this.props.lng;
		const { stepIndex } = this.state;

		return (
			<div id="deposit-body">
				<Grid container style={{ marginTop: 12 }} justify="center">
					<Grid item xs={11}>
						<Paper style={{ paddingTop: 12, paddingLeft: 100, paddingRight: 100 }}>
							<Stepper activeStep={stepIndex}>
								<Step>
									<StepLabel lng={lng} >{i18n.t('callForProjects.label', { lng })}</StepLabel>
								</Step>
								<Step>
									<StepLabel lng={lng} >{i18n.t('partnerInfo.label', { lng })}</StepLabel>
								</Step>
								<Step>
									<StepLabel lng={lng} >{i18n.t('projectInfo.label', { lng })}</StepLabel>
								</Step>
								<Step>
									<StepLabel lng={lng} >{i18n.t('submission.label', { lng })}</StepLabel>
								</Step>
							</Stepper>

							{this.getStepContent(stepIndex)}
						</Paper>
					</Grid>
				</Grid>
			</div>
		);
	}
}

export default withStyles(styles, { withTheme: true })(Deposit);

import { sha256 } from 'js-sha256';

import React from "react";
import { Redirect } from 'react-router'

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from "@material-ui/core/Checkbox";

// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";

import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import Snackbar from "components/Snackbar/Snackbar.jsx";


import { api } from "config.json"

const styles = theme => ({
    cardCategoryWhite: {
        "&,& a,& a:hover,& a:focus": {
            color: "rgba(255,255,255,.62)",
            margin: "0",
            fontSize: "14px",
            marginTop: "0",
            marginBottom: "0"
        },
        "& a,& a:hover,& a:focus": {
            color: "#FFFFFF"
        }
    },
    cardTitleWhite: {
        color: "#FFFFFF",
        marginTop: "0px",
        minHeight: "auto",
        fontWeight: "300",
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        marginBottom: "3px",
        textDecoration: "none",
        "& small": {
            color: "#777",
            fontSize: "65%",
            fontWeight: "400",
            lineHeight: "1"
        }
    },
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing.unit * 2,
    }
});

class CreateUser extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            type: "",
            password: "",
            password_2: "",
            labelWidth: 0,
            admin: false,
            lastName: "",
            firstName: "",
            email: "",
            company: "",
            success: false,
            error: false,
            message: "",
            redirect: false,
        }

        this.handleChange = this.handleChange.bind(this);
        this.createUser = this.createUser.bind(this);
    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    handleCheckboxChange = name => event => {
        this.setState({ [name]: event.target.checked });
    };

    createUser() {
        this.setState({ error: false, success: false },
            () => {
                let err = false;
                if (this.state.type === "") {
                    err = true;
                    this.setState({
                        error: true,
                        message: "Veuillez selectionner un type d'utilisateur."
                    });
                }
                else if (this.state.firstName === "") {
                    err = true;
                    this.setState({
                        error: true,
                        message: "Veuillez remplir le champ prénom de l'utilisateur."
                    });
                }
                else if (this.state.lastName === "") {
                    err = true;
                    this.setState({
                        error: true,
                        message: "Veuillez remplir le champ nom de l'utilisateur."
                    });
                }
                else if (this.state.type === "partner" && this.state.company === "") {
                    err = true;
                    this.setState({
                        error: true,
                        message: "Veuillez remplir le champ Entreprise."
                    });
                }
                else if (!validateEmail(this.state.email)) {
                    err = true;
                    this.setState({
                        error: true,
                        message: "Veuillez saisir une adresse mail valide."
                    });
                }
                else if (this.state.type === "EPGE" || this.state.type === "administration") {
                    if (!isValidPassword(this.state.password)) {
                        err = true;
                        this.setState({
                            error: true,
                            message: "Le mot de passe doit à minima être de 8 caractères et comporter une majuscule, une minuscule et un chiffre ou un charactère spécial."
                        });
                    }

                    if (this.state.password !== this.state.password_2) {
                        err = true;
                        this.setState({
                            error: true,
                            message: "Les deux mots de passe doivent être identiques."
                        });
                    }
                }

                if (!err) {
                    let data = {
                        firstName: this.state.firstName,
                        lastName: this.state.lastName,
                        admin: this.state.admin,
                        email: this.state.email,
                        company: this.state.company,
                        type: this.state.type,
                        password: sha256(this.state.email + this.state.password)
                    }

                    fetch(api.host + ":" + api.port + "/api/user", {
                        method: "PUT",
                        mode: "cors",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(data)
                    })
                        .then(res => {
                            if (!res.ok) throw res;
                            else return res.json()
                        })
                        .then(data => {
                            if (data._id) {
                                this.setState({
                                    success: true,
                                    message: "Utilisateur crée avec succès. Vous allez être redirigé vers la liste des utilisateurs."
                                });

                                setTimeout(() => {
                                    this.setState({ redirect: true });
                                }, 500);
                            }
                        })
                        .catch(err => {
                            err.json().then(errMsg => {
                                if (errMsg.name === "EmailUsed") {
                                    this.setState({
                                        error: true,
                                        message: "Cette adresse mail est déjà associée à autre un utilisateur."
                                    });
                                } else {
                                    console.error(errMsg);
                                    this.setState({
                                        error: true,
                                        message: "Une erreur est survenue lors de la création de l'utilisateur."
                                    });
                                }
                            })
                        });
                }
            });
    }

    render() {
        const { classes } = this.props;
        let companyField, adminCheckbox, redirect, passwordField;
        if (this.state.type === "partner") {
            companyField = (
                <GridContainer>
                    <GridItem xs={12} sm={12} md={3}>
                        <FormControl className={classes.formControl} fullWidth={true}>
                            <CustomInput
                                labelText="Entreprise"
                                inputProps={{
                                    value: this.state.company,
                                    onChange: this.handleChange,
                                    name: "company"
                                }}
                                formControlProps={{
                                    fullWidth: true
                                }}
                            />
                        </FormControl>
                    </GridItem>
                </GridContainer>);
        }

        if (this.state.type === "EPGE" || this.state.type === "administration") {
            adminCheckbox = (
                <GridContainer>
                    <GridItem xs={12} sm={12} md={3}>
                        <FormControl className={classes.formControl} >
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={this.state.admin}
                                        onChange={this.handleCheckboxChange('admin')}
                                        value="admin"
                                        color="primary"
                                    />
                                }
                                label="Administrateur"
                            />
                        </FormControl>
                    </GridItem>
                </GridContainer >
            );

            passwordField = (
                <GridContainer>
                    <GridItem xs={12} sm={12} md={4}>
                        <FormControl className={classes.formControl} fullWidth={true}>
                            <CustomInput
                                labelText="Mot de passe"
                                inputProps={{
                                    value: this.state.password,
                                    onChange: this.handleChange,
                                    name: "password",
                                    type: "password"
                                }}
                                formControlProps={{
                                    fullWidth: true
                                }}
                            />
                        </FormControl>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                        <FormControl className={classes.formControl} fullWidth={true}>
                            <CustomInput
                                labelText="Mot de passe (vérification)"
                                inputProps={{
                                    value: this.state.password_2,
                                    onChange: this.handleChange,
                                    name: "password_2",
                                    type: "password"
                                }}
                                formControlProps={{
                                    fullWidth: true
                                }}
                            />
                        </FormControl>
                    </GridItem>
                </GridContainer >
            );
        }

        if (this.state.redirect) {
            redirect = <Redirect to="/users" />
        }
        return (
            <GridContainer>
                {redirect}
                <Snackbar
                    place="tc"
                    color="success"
                    message={this.state.message}
                    open={this.state.success}
                    closeNotification={() => this.setState({ success: false })}
                    close
                />
                <Snackbar
                    place="tc"
                    color="danger"
                    message={this.state.message}
                    open={this.state.error}
                    closeNotification={() => this.setState({ error: false })}
                    close
                />
                <GridItem xs={12} sm={12} md={12}>
                    <Card>
                        <CardHeader color="primary">
                            <h4 className={classes.cardTitleWhite}>Créer un utilisateur</h4>
                            <p className={classes.cardCategoryWhite}>Complete your profile</p>
                        </CardHeader>
                        <CardBody>
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={3}>
                                    <FormControl className={classes.formControl} >
                                        <InputLabel htmlFor="type">Type</InputLabel>
                                        <Select
                                            value={this.state.type}
                                            onChange={this.handleChange}
                                            inputProps={{
                                                name: 'type',
                                                id: 'type',
                                            }}
                                        >
                                            <MenuItem value=""><em></em></MenuItem>
                                            {/*<MenuItem value="student">Elève</MenuItem>*/}
                                            <MenuItem value="partner">Partenaire</MenuItem>
                                            <MenuItem value="administration">Administration</MenuItem>
                                            <MenuItem value="EPGE">EPGE</MenuItem>
                                        </Select>
                                    </FormControl>
                                </GridItem>
                            </GridContainer>

                            {companyField}

                            <GridContainer>
                                <GridItem xs={12} sm={12} md={4}>
                                    <FormControl className={classes.formControl} fullWidth={true}>
                                        <CustomInput
                                            labelText="Nom"
                                            inputProps={{
                                                value: this.state.lastName,
                                                onChange: this.handleChange,
                                                name: "lastName"
                                            }}
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                        />
                                    </FormControl>
                                </GridItem>
                                <GridItem xs={12} sm={12} md={4}>
                                    <FormControl className={classes.formControl} fullWidth={true}>
                                        <CustomInput
                                            labelText="Prénom"
                                            inputProps={{
                                                value: this.state.firstName,
                                                onChange: this.handleChange,
                                                name: "firstName"
                                            }}
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                        />
                                    </FormControl>
                                </GridItem>
                            </GridContainer>

                            <GridContainer>
                                <GridItem xs={12} sm={12} md={8}>
                                    <FormControl className={classes.formControl} fullWidth={true}>
                                        <CustomInput
                                            labelText="Adresse mail"
                                            inputProps={{
                                                value: this.state.email,
                                                onChange: this.handleChange,
                                                name: "email"
                                            }}
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                        />
                                    </FormControl>
                                </GridItem>
                            </GridContainer>
                            {passwordField}
                            {adminCheckbox}
                        </CardBody>
                        <CardFooter>
                            <Button color="primary" onClick={this.createUser}>Créer l'utilisateur</Button>
                        </CardFooter>
                    </Card>
                </GridItem>
            </GridContainer >
        );
    }
}

export default withStyles(styles)(CreateUser);

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function isValidPassword(password) {
    if (password.length < 8) return false;

    let containsLowerCase, containsUpperCase, containsNumber, containsSpecialChar;
    containsLowerCase = containsUpperCase = containsNumber = containsSpecialChar = false;

    for (let i = 0; i < password.length; i++) {
        if (password[i] >= 'A' && password[i] <= 'Z') containsUpperCase = true;
        else if (password[i] >= 'a' && password[i] <= 'z') containsLowerCase = true;
        else if (password[i] >= '0' && password[i] <= '9') containsNumber = true;
        else containsSpecialChar = true;
    }

    return containsLowerCase && containsUpperCase && (containsNumber || containsSpecialChar);
}
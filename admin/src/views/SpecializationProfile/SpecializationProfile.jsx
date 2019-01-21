import React from "react";
import { Link } from 'react-router-dom';

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Visibility from "@material-ui/icons/Visibility"
import Delete from "@material-ui/icons/Delete"

// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Table from "components/Table/Table.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import AutoComplete from "components/AutoComplete/AutoComplete.jsx"
import Button from "components/CustomButtons/Button.jsx";

import { api } from "../../config"

const styles = {
    cardCategoryWhite: {
        color: "rgba(255,255,255,.62)",
        margin: "0",
        fontSize: "14px",
        marginTop: "0",
        marginBottom: "0"
    },
    cardTitleWhite: {
        color: "#FFFFFF",
        marginTop: "0px",
        minHeight: "auto",
        fontWeight: "300",
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        marginBottom: "3px",
        textDecoration: "none"
    }
};

class SpecializationProfile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            specialization: {
                referent: ["", "", "", ""]
            },
            loadingProfile: true,
            loadingReferent: true,
            modificated: false,
            specialization_old: {},
            administration: [],
            selected: null
        }

        this.handleChange = this.handleChange.bind(this);
        this.update = this.update.bind(this);
        this.cancel = this.cancel.bind(this);
        this.loadData = this.loadData.bind(this);
        this.addReferent = this.addReferent.bind(this);
    }

    loadData() {
        fetch(api.host + ":" + api.port + "/api/specialization/" + this.props.match.params.id)
            .then(res => res.json())
            .then(data => {
                if (data) {
                    console.log(data);
                    let spe = {
                        nameFr: data.name.fr,
                        nameEn: data.name.en,
                        abbreviation: data.abbreviation,
                        _id: data._id
                    }

                    spe.referent = data.referent.map(ref =>
                        [
                            ref.last_name,
                            ref.first_name,
                            ref.email,
                            (<div>
                                <Link to={"/user/" + ref._id}>
                                    <Button type="button" color="info"><Visibility /> Voir le profil</Button>
                                </Link>
                                <Button onClick={this.removeReferent(ref._id)} type="button" color="danger"><Delete />Supprimer</Button>
                            </div>)
                        ]
                    );
                    this.setState({
                        specialization: spe,
                        specialization_old: spe,
                        loadingProfile: false
                    });
                }
            });

        fetch(api.host + ":" + api.port + "/api/user/EPGE")
            .then(res => res.json())
            .then(data => {
                if (data) {
                    this.setState({
                        administration: data,
                        loadingReferent: false
                    });
                }
            });
    }

    componentDidMount() {
        this.loadData();
    }

    handleChange = event => {
        const value = event.target.value;
        const id = event.target.id;
        this.setState(prevState => ({
            modificated: true,
            specialization: {
                ...prevState.specialization,
                [id]: value
            }
        }));
    }

    cancel() {
        this.setState({
            modificated: false,
            specialization: this.state.specialization_old
        });
    }

    update() {
        let data = {
            _id: this.state.specialization._id,
            abbreviation: this.state.specialization.abbreviation,
            name: {
                fr: this.state.specialization.nameFr,
                en: this.state.specialization.nameEn
            }
        }

        fetch(api.host + ":" + api.port + "/api/specialization", {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                let spe = {
                    _id: data._id,
                    nameFr: data.name.fr,
                    nameEn: data.name.en,
                    abbreviation: data.abbreviation
                }
                this.setState({
                    specialization: spe,
                    specialization_old: spe,
                    modificated: false
                });
            });
    }

    addReferent() {
        console.log(this.state.selectedItem);
        if (this.state.selectedItem) {
            const data = {
                _id: this.props.match.params.id,
                referent: this.state.selectedItem.value
            };
            console.log(data);

            fetch(api.host + ":" + api.port + "/api/specialization/referent", {
                mode: "cors",
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data)
            }).then(res => res.json())
                .then(data => {
                    this.loadData();
                    this.setState({ selectedItem: "" });
                });
        }
        else {
            console.error("No selected item");
        }
    }

    removeReferent = id => event => {
        const data = {
            _id: this.props.match.params.id,
            referent: id
        }

        fetch(api.host + ":" + api.port + "/api/specialization/referent", {
            mode: "cors",
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        }).then(res => res.json())
            .then(data => {
                this.loadData();
            });
    }

    render() {
        const { classes } = this.props;
        const { specialization } = this.state;

        let profile;
        let referent;
        let suggestions;
        if (!this.state.loadingProfile) {
            profile = (
                <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                        <Card>
                            <CardHeader color="primary">
                                <h4 className={classes.cardTitleWhite}>Profil de l'utilisateur</h4>
                                <p className={classes.cardCategoryWhite}>Complete your profile</p>
                            </CardHeader>
                            <CardBody>
                                <GridContainer>
                                    <GridItem xs={12} sm={12} md={4}>
                                        <CustomInput
                                            labelText="Abbréviation"
                                            id="abbreviation"
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                            inputProps={{
                                                onChange: this.handleChange,
                                                value: this.state.specialization.abbreviation
                                            }}
                                        />
                                    </GridItem>
                                </GridContainer>
                                <GridContainer>
                                    <GridItem xs={12} sm={12} md={6}>
                                        <CustomInput
                                            labelText="Nom (fr)"
                                            id="nameFr"
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                            inputProps={{
                                                onChange: this.handleChange,
                                                value: this.state.specialization.nameFr
                                            }}
                                        />
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={6}>
                                        <CustomInput
                                            labelText="Nom (en)"
                                            id="nameEn"
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                            inputProps={{
                                                onChange: this.handleChange,
                                                value: this.state.specialization.nameEn
                                            }}
                                        />
                                    </GridItem>
                                </GridContainer>
                            </CardBody>
                            <CardFooter>
                                <GridContainer >
                                    <GridItem xs={12} sm={12} md={12}>
                                        <Button disabled={!this.state.modificated} color="success" onClick={this.update}>Sauvegarder</Button>
                                        <Button disabled={!this.state.modificated} color="danger" onClick={this.cancel}>Annuler</Button>
                                    </GridItem>
                                </GridContainer>
                            </CardFooter>
                        </Card>
                    </GridItem>
                </GridContainer>);
        }
        if (!this.state.loadingReferent && !this.state.loadingProfile) {
            suggestions = this.state.administration.map(admin => ({
                label: admin.last_name + " " + admin.first_name,
                value: admin._id
            }));

            referent = (
                <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                        <Card>
                            <CardHeader color="primary">
                                <h4 className={classes.cardTitleWhite}>Référents</h4>
                                <p className={classes.cardCategoryWhite}>Personnes en charge de la majeure</p>
                            </CardHeader>
                            <CardBody>
                                <GridContainer>
                                    <GridItem xs={12} sm={12} md={12}>
                                        <Table
                                            tableHeaderColor="primary"
                                            tableHead={["Nom", "Prénom", "Email", "Actions"]}
                                            tableData={this.state.specialization.referent}
                                        />
                                    </GridItem>
                                </GridContainer>
                            </CardBody>
                            <CardFooter></CardFooter>
                        </Card>
                    </GridItem>

                    <GridItem xs={12} sm={12} md={12}>
                        <Card>
                            <CardHeader color="primary">
                                <h4 className={classes.cardTitleWhite}>Ajouter un référent</h4>
                                <p className={classes.cardCategoryWhite}>Personnes en charge de la majeure</p>
                            </CardHeader>
                            <CardBody>
                                <GridContainer>
                                    <GridItem xs={12} sm={12} md={12}>
                                        <AutoComplete
                                            data={suggestions}
                                            label="Listes des référents"
                                            selected={this.state.selectedItem}
                                            select={item => this.setState({ selectedItem: item })}
                                        />
                                    </GridItem>
                                </GridContainer>
                                <GridContainer>
                                    <GridItem xs={12} sm={12} md={12}>
                                        <Button color="success" onClick={this.addReferent}>Ajouter le référent</Button>
                                    </GridItem>
                                </GridContainer>
                            </CardBody>
                            <CardFooter>
                            </CardFooter>
                        </Card>
                    </GridItem>
                </GridContainer>
            );
        }
        return (
            <div>
                {profile}
                {referent}
            </div>
        );
    }
}

export default withStyles(styles)(SpecializationProfile);
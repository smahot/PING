import React from "react";
import PropTypes from 'prop-types';

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import { Input } from '@material-ui/core'

import Add from "@material-ui/icons/Add"

// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Modal from "components/Modal/Modal.jsx";

import { withUser } from "../../providers/UserProvider/UserProvider"
import AuthService from "components/AuthService"
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
    },
    displayLineBreak: {
        "white-space": "pre-line"
    }
};

class Files extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            projectFiles: this.props.projectFiles,
            openFileModal: false,
            toDelete: "",
        }
    }

    // Loads only files associated to the project
    loadProjectFiles() {
        fetch(api.host + ":" + api.port + "/api/project/" + this.props.projectId + "/files")
            .then(res => res.json())
            .then(data => {
                this.setState({
                    projectFiles: data.files
                });
            });
    }

    // Asks user if he really wants to delete the file
    openFileModal = _id => () => {
        this.setState({
            openFileModal: true,
            toDelete: _id
        });
    };

    // Closes the modal asking the user if he wants to delete the file
    closeFileModal = () => {
        this.setState({
            openFileModal: false,
            toDelete: ""
        });
    };

    // Deletes a file
    deleteFile = () => {
        const data = {
            fileID: this.state.toDelete
        };

        AuthService.fetch(api.host + ":" + api.port + "/api/project/file", {
            method: "DELETE",
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                if (data.ok) {
                    this.loadProjectFiles();
                    this.closeFileModal();
                }
            });
    }

    // Uploads a new file
    uploadFile = file => {
        var formData = new FormData();
        formData.append("partnerID", this.props.partnerId);
        formData.append("projectID", this.props.projectId)
        formData.append("file", new Blob([file], { type: file.type }), file.name || 'file');


        fetch(api.host + ":" + api.port + '/api/project/file', {
            method: "POST",
            headers: {
                "Authorization": AuthService.getToken()
            },
            body: formData
        })
            .then(res => res.json())
            .then(data => {
                 this.loadProjectFiles();
            });
    }

    render() {
        const { classes, color, projectStatus } = this.props;
        return (
            <div>
                <Modal
                    open={this.state.openFileModal}
                    closeModal={this.closeFileModal}
                    title="Supprimer ce fichier ?"
                    content={(<div>Etes vous sûr de vouloir supprimer ce fichier ?
                    <br />
                        Toute suppression est définitive et aucun retour en arrière n'est possible.
                    </div>)}
                    buttonColor="danger"
                    buttonContent="Supprimer"
                    validation={this.deleteFile}
                />
                <Card>
                    <CardHeader color={color}>
                        <h4 className={classes.cardTitleWhite}>Liste des fichiers</h4>
                        <p className={classes.cardCategoryWhite}>Fichiers proposés par le partenaire</p>
                    </CardHeader>
                    <CardBody>
                        <GridContainer>
                            {
                                // Create an item for each file associated to the project
                                this.state.projectFiles.map(file => {
                                    if (file != null)
                                        return (
                                            <GridItem xs={12} sm={12} md={6} key={file._id}>
                                                <Card style={{ width: "20rem" }}>
                                                    <CardBody>
                                                        <h4>{file.originalName}</h4>
                                                        <a download href={api.host + ":" + api.port + "/api/project/file/" + file._id}>
                                                            <Button size="sm" color="info">Télécharger</Button>
                                                        </a>
                                                        {(this.props.user.user.EPGE || this.props.user.user.admin) &&
                                                            <Button size="sm" color="danger" onClick={this.openFileModal(file._id)}>Supprimer</Button>
                                                        }
                                                    </CardBody>
                                                </Card>
                                            </GridItem>
                                        );
                                    else return <div></div>;
                                })
                            }

                        </GridContainer>
                    </CardBody>
                    {(this.props.user.user.EPGE || this.props.user.user.admin) && projectStatus === "pending" &&
                        <CardFooter>
                            <GridContainer >
                                <GridItem xs={12} sm={12} md={12}>
                                    <Input
                                        className={classes.input}
                                        id="raised-button-file"
                                        type="file"
                                        onChange={e => this.uploadFile(e.target.files[0])}
                                        style={{ display: "none" }}
                                    />
                                    <label htmlFor="raised-button-file">
                                        <Button component="span" size="sm" color="info"><Add />Ajouter un fichier</Button>
                                    </label>
                                </GridItem>
                            </GridContainer>
                        </CardFooter>
                    }
                </Card>
            </div>
        );
    }
}

Files.propTypes = {
    color: PropTypes.string.isRequired,
    projectFiles: PropTypes.array.isRequired,
    projectStatus: PropTypes.string.isRequired,
    projectId: PropTypes.string.isRequired,
    partnerId: PropTypes.string.isRequired,
}

export default withUser(withStyles(styles)(Files));

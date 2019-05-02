import i18next from 'i18next';

i18next
	.init({
		interpolation: {
			escapeValue: false,
		},
		lng: 'en',
		resources: {
			en: {
				translation: {
					deposit: { label: "Deposit project" },
					year: { label: 'Year', },
					partner: { label: 'Proposed by', },
					firm: { label: 'Company' },
					title: { label: 'Project\'s title' },
					keywords: { label: 'Keywords', },
					comment: { label: 'Comments', },
					question: { label: 'Feel free to ask your questions ', },
					questionH: { label: 'Ask your question ! ', },
					button: { label: 'Send ', },
					project: {
						title: 'List of projects',
						accepted: 'Project accepted !',
						pending: "Waiting for approval",
						rejected: "Project rejected by school"
					},
					major: { label: 'Major', },
					filter: { label: 'Filters', },
					ibo: { label: 'Computer science, Big Data and IoT', },
					ne: { label: 'New Energies', },
					if: { label: 'Financial Engineering', },
					mnm: { label: 'Computational Mechanics and Modelling', },
					callForProjects: { label: 'Call for projects', },
					partnerInfo: { label: 'Partner information', },
					projectInfo: { label: 'Project Information', },
					submission: { label: 'Project Submission', },
					message: { label: ' Thank you for your submission, your project is now waiting to be validated by the project team of the school. An email has been sent to your address mail containing a link that allows you to edit your submission if you want to. ', },
					tellus: { label: 'Tell us about yourself', },
					email: { label: 'Your email address', },
					field: { label: 'This field is required', },
					field_length: { label: 'Maximum text length exceeded' },
					notvalid: { label: 'email is not valid', },
					company: { label: 'Your company', },
					firstname: { label: 'Your first name', },
					lastname: { label: 'Your last name', },
					back: { label: 'Back', },
					next: { label: 'Next', },
					createAccount: { label: 'Create account' },
					projectPres: { h2: 'Please Present your project', },
					titleproj: { label: 'Title of the project *', },
					year4: { label: '4th Year', },
					year5: { label: '5th Year', },
					majors: { label: 'Major(s) Concerned *', },
					years: { label: 'Concerned years *', },
					descriptionProj: { label: 'A complete description of your project *', },
					finish: { label: 'Finish', },
					delete: { label: 'Delete', },
					keyword: { label: 'Keywords (Press Enter on your keyboard to validate !)', },
					files: { label: 'Others Files', },
					dropfiles: { label: 'Drop files here or click to upload', },
					acceptedfiles: { label: 'Accepted files : png , pdf , csv ...', },
					pdf: { label: 'Export as PDF', },
					click: { label: ' Click here', },
					example: { label: 'to reset the example.', },
					welcomePlatform: { h1: 'Welcome to DeVinci Platform', },
					welcomePole: { h1: 'Welcome to Leonard De Vinci Campus ', },
					hybridation: { h2: 'Hybridization and transversality', },
					approche: { h3: 'A unique transversal approach', },
					presentation: { p: 'The Leonardo da Vinci Pole Schools have developed a pedagogical transversality that encourages the opening up of teaching and allows students to work in multidisciplinary teams while progressing in their training and their digital knowledge.', },
					transvality: { label: 'The Transversality', },
					keys: { label: 'The Key numbers', },
					projectt: { label: 'The Project', },
					program: { label: 'The Programmes', },
					schools: { h2: 'Our Schools', },
					campus: { h3: 'One campus, four schools', },
					leonard: { p: 'The Leonardo da Vinci Campus is three schools in Paris-La Défense: an engineering school, a management school, a multimedia school. In addition, an Institute offers continuing education.', },

					home: {
						title: 'Industrial Innovation Projects',
						title_p1: 'You are a company, a laboratory, a student? You want to test an idea, create a prototype, decipher and / or explore a field of innovation, ...?',
						p1: 'Submit a project to our students!',
						p1_l1: 'Proposing a project will allow you to cooperate with a team of motivated and innovative engineering students and contribute to their training by involving them in current issues.',
						p1_l2: 'Companies or laboratories, it is also a way to make yourself known to those who will respond in the coming years to your internship and job offers.',
						p2: 'How does it work?',
						p2_l1: 'A project group is made up of 4 students (3 or 5 if necessary) who will each work about ten hours a week on your project.',
						p2_l2: 'Each group will be monitored and supervised by a teacher from the school ("project manager") who can provide them with scientific guidance.',
						p2_l3: 'These projects concern students in years 4 and 5, with a similar functioning and a slightly different timetable: the projects start for all in mid/end September, and end at the end of January for years 5 and at the end of March for years 4.',
						p2_l4: 'As students go on to work placements afterwards, it may be possible for your project to be "continued" as an internship by one of the team\'s students.',
						p3: 'What will be my role?',
						p3_l1: 'You will be able to present your project (live and/or via video) during the "project launch days":',
						p3_l2: ' - September 13 (9am-12.30pm) for the 5th years',
						p3_l3: ' - September 18 (9am-12:30pm) for the 4th years',
						p3_l4: 'If your project is chosen, you become a "project partner".',
						p3_l5: 'The team of students then contacts you to start the project, then keeps you informed of the progress of its work, by deadlines set together, and finally organizes with you the project closure in the last week of January for years 5, March for years 4.',
						p3_l6: 'The team will be regularly monitored throughout its project by its "project manager", who will also be responsible for evaluating it.',
						p3_l7: 'At the end of the project, there will be a feedback meeting with the partner (project closure), followed by a showroom of presentations of all projects (31 January for the A5s; 28 March for the A4s) to which you will of course be invited and welcome.',
						p4: 'How to propose a project?',
						p4_l1: 'Click on [Submit a project] at the top right of the page.',
						p4_l2: 'You will then be asked to provide information on the partner and then describe the proposed project, and identify the desired and expected competencies.',
						p4_l3: 'Deadline for the submission of project proposals: 5 September 2018',
						p4_l4: 'If you have any questions, please do not hesitate to contact us: projetesilv@devinci.fr',
						p5: 'Thank you for your participation, and see you soon.',
						p5_l1: 'The EGPE (ESILV Project Management Team)',
					},
					navs: {
						home: 'Home',
						projects: 'Projects',
						myprojects: 'My projects',
						submit: 'Submit a project',
						login: 'Log in',
						admin: 'Admin',
						linkLost: 'Project link lost',
						welcome: 'Welcome',
						disconnect:"Disconnect"
					},
					forgetPass: {
						submit: 'Submit',
						desc: 'If you have lost your link to connect, please enter your email to retrieve it.',
						textfield: "Your email address"
					},
					carousel: {
						Title1: 'BermudZer: bermudean option pricing',
						Text1: 'Industrial Innovation Project of the 5th year, Major Financial Engineering 2014-2015',
						Title2: 'Vinci Eco Drive – Design and control of the engine block, Shell Eco-Marathon 2015',
						Text2: '5th-year Industrial Innovation Project, Major Mechanical Numerical and Modeling 2014-2015',
						Title3: 'ID-cam: digital accessibility for the blind and visually impaired',
						Text3: '2017-2018 project of the 5th year of the ESILV engineering student program, 2018 promo',
						Title4: 'Big Data analysis of Unesco sites via social networks',
						Text4: '5th Year Industrial Innovation Project, Major in Computer Science and Digital Science 2014-2015',
						back: 'Back',
						next: 'Next',
					}
				},
			},
			fr: {
				translation: {
					deposit: { label: "Deposer le projet" },
					year: { label: 'Année', },
					partner: { label: 'Proposé par', },
					firm: { label: 'Entreprise' },
					title: { label: 'Titre du projet' },
					keywords: { label: 'Mots-clés', },
					comment: { label: 'Commentaires', },
					question: { label: 'Posez votre question', },
					questionH: { label: 'Posez une question ! ', },
					button: { label: 'Envoyer', },
					project: {
						title: 'Liste des projets',
						accepted: 'Projet accepté !',
						pending: "En attente de validation",
						rejected: "Projet rejetté par l'école"
					},
					major: { label: 'Majeure', },
					filter: { label: 'Filtres', },
					ibo: { label: 'Informatique, BigData et objets connectés', },
					ne: { label: 'Nouvelles Energies', },
					if: { label: 'Ingénierie Financière', },
					mnm: { label: 'Mécanique numérique et modélisation', },
					callForProjects: { label: 'Appel à projets', },
					partnerInfo: { label: 'Des informations sur le partenaire', },
					projectInfo: { label: 'Des informations sur le projet', },
					submission: { label: 'Soumission du projet', },
					message: { label: '  Merci, votre projet est maintenant en attente de validation par l\'administration de l\'école concerné. Un email vous a été envoyé avec un lien pour modifier votre projet. ', },
					tellus: { label: 'Parlez-nous de vous', },
					email: { label: 'Votre adresse email', },
					field: { label: 'Ce champ est obligatoire', },
					field_length: { label: 'Longueur maximale du texte dépassée' },
					notvalid: { label: 'Email indiqué n\'est pas valide', },
					company: { label: 'Votre entreprise', },
					firstname: { label: 'Prénom', },
					lastname: { label: 'Nom', },
					back: { label: 'Précédent', },
					next: { label: 'Suivant', },
					createAccount: { label: 'Créer le compte' },
					projectPres: { h2: 'Présentez votre projet', },
					titleproj: { label: 'Intitulé de votre projet *' },
					year4: { label: 'Année 4', },
					year5: { label: 'Année 5', },
					majors: { label: 'Majeure(s) ciblée(s) *', },
					years: { label: 'Années concerné(s) *', },
					descriptionProj: { label: 'Description complete de votre projet *', },
					finish: { label: 'Terminer', },
					delete: { label: 'Supprimer', },
					keyword: { label: 'Mots clés (appuyez sur Entrée sur votre clavier pour valider ! )', },
					files: { label: 'Autres Fichiers ', },
					dropfiles: { label: 'Déposez les fichiers ici ou cliquez pour télécharger', },
					acceptedfiles: { label: 'Types de fichiers acceptés : png , pdf , csv ...', },
					pdf: { label: 'Exporter en PDF', },
					click: { label: ' Cliquez ici', },
					example: { label: 'pour réinitialiser l\'exemple.', },
					welcomePlatform: { h1: 'Bienvenue sur la DeVinci Plateforme', },
					welcomePole: { h1: 'Bienvenue au Pôle Léonard de Vinci', },
					hybridation: { h2: 'Hybridation et transversalité', },
					approche: { h3: 'Une approche transversale unique', },
					presentation: { p: 'Les écoles du Pôle Léonard de Vinci ont développé une transversalité pédagogique qui encourage le décloisonnement des enseignements et permet aux étudiants de travailler en équipes pluridisciplinaires tout en progressant dans leur formation et leurs savoirs numériques.', },
					transvality: { label: 'La Transversalité', },
					keys: { label: 'Les Chiffres-clés', },
					projectt: { label: 'Le Projet', },
					program: { label: 'Les Programmes', },
					schools: { h2: 'Les écoles', },
					campus: { h3: 'Un campus, quatre écoles', },
					leonard: { p: 'Le Pôle Léonard de Vinci, c’est trois écoles à Paris-La Défense : une école d’ingénieurs, une école de management, une école multimédia. En complément, un Institut propose de la formation continue.', },
					forgetPass: {
						submit: 'Envoyer',
						desc: 'Si vous avez perdu votre lien pour vous connecter, veuillez entrer votre mail pour le récupérer.',
						textfield: "Votre adresse mail"
					},
					home: {
						title: 'Projets Innovation Industrielle',
						title_p1: 'Vous êtes une entreprise, un laboratoire, un étudiant ? Vous souhaitez tester une idée, créer un prototype, déchiffrer et/ou explorer un terrain d\'innovation, ... ?',
						p1: 'Proposez un projet à nos élèves !',
						p1_l1: 'Proposer un projet vous permettra de coopérer avec une équipe d\'élèves ingénieurs motivés et innovants et de contribuer à leur formation en les impliquant dans des problématiques actuelles.',
						p1_l2: 'Entreprises ou laboratoires, c\'est aussi un moyen de vous faire connaître auprès de ceux qui répondront dans les années futures à vos offres de stages et d\'emplois.',
						p2: 'Comment ça marche ?',
						p2_l1: 'Un groupe projet est constitué de 4 élèves (3 ou 5 éventuellement) qui travailleront chacun une dizaine d\'heures par semaine sur votre projet.',
						p2_l2: 'Chaque groupe sera suivi et encadré par un enseignant de l\'école ("directeur de projet") à même de les guider scientifiquement.',
						p2_l3: 'Ces projets concernent les élèves d\'année 4 et d\'année 5, avec un fonctionnement similaire et un calendrier un peu différent : les projets démarrent pour tous mi/fin septembre, et se terminent fin janvier pour les années 5 et fin mars pour les années 4.',
						p2_l4: 'Les élèves partant en stage après, il peut être possible que votre projet soit "poursuivi" en stage par un élève de l\'équipe.',
						p3: 'Quel va être mon rôle ?',
						p3_l1: 'Vous pourrez présenter votre projet (en direct et/ou via vidéo) lors des journées "lancements projets" :',
						p3_l2: ' - le 13 septembre (9h-12h30) pour les années 5',
						p3_l3: ' - le 18 septembre (9h-12h30) pour les années 4',
						p3_l4: 'Si votre projet est choisi, vous devenez alors "partenaire du projet".',
						p3_l5: 'L\'équipe d\'élèves prend alors contact avec vous pour démarrer le projet, puis vous tient au courant de l\'évolution de ses travaux, par des échéances fixées ensemble, et enfin organise avec vous la clôture de projet la dernière semaine de janvier pour les années 5, de mars pour les années 4.',
						p3_l6: 'L\'équipe sera suivie régulièrement tout au long de son projet par son "directeur de projet", qui sera aussi chargé de l\'évaluer.',
						p3_l7: 'La fin du projet verra une réunion de restitution avec le partenaire (clôture de projet), suivie d\'un showroom de présentations de tous les projets (le 31 janvier pour les A5 ; le 28 mars pour les A4) auquel vous serez bien entendu invité et bienvenu.',
						p4: 'Comment proposer un projet ?',
						p4_l1: 'Cliquez sur [Soumettre un projet] en haut à droite de la page.',
						p4_l2: 'Vous devrez alors donner des information sur le partenaire puis décrire le projet proposé, et cibler les compétences voulues et attendues.',
						p4_l3: 'Deadline pour le dépôt des proposition de projets : 5 Septembre 2018',
						p4_l4: 'Pour toute question, n\'hésitez pas à nous contacter : projetesilv@devinci.fr',
						p5: 'Merci de votre participation, et à très bientôt.',
						p5_l1: 'L\'EGPE (Equipe Gestion Projets ESILV)',
					},
					navs: {
						home: 'Accueil',
						projects: 'Projets',
						myprojects: 'Mes projets',
						submit: 'Soumettre un projet',
						login: 'Se connecter',
						admin: 'Admin',
						linkLost: 'Lien oublié',
						welcome: "Bienvenue ",
						disconnect:"Se déconnecter"
					},
					carousel: {
						Title1: 'BermudZer : pricing d’options bermudéennes',
						Text1: 'Projet d’Innovation Industrielle de 5ème année, Majeure Ingénierie Financière 2014-2015',
						Title2: 'Vinci Eco Drive – Conception et pilotage du Bloc moteur, Shell Eco-Marathon 2015',
						Text2: 'Projet d’Innovation Industrielle de 5ème année, Majeure Mécanique numérique et modélisation 2014-2015',
						Title3: 'ID-cam : accessibilité numérique pour les non-voyants et mal-voyants',
						Text3: 'Projet 2017-2018 de 5e année du cursus d’élève ingénieur de l’ESILV, promo 2018',
						Title4: 'Analyse Big Data des sites Unesco via les réseaux sociaux',
						Text4: 'Projet d’Innovation Industrielle de 5ème année, Majeure Informatique et sciences du numérique 2014-2015',
						back: 'Précédent',
						next: 'Suivant',
					}
				},
			},
		},
	})

export default i18next
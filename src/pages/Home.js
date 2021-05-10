import { IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCheckbox, IonCol, IonContent, IonFab, IonFabButton, IonGrid, IonHeader, IonIcon, IonItem, IonPage, IonRow, IonSlide, IonSlides, IonToolbar } from '@ionic/react';
import styles from './Home.module.scss';

import { addOutline, menuOutline, notificationsOutline, searchOutline } from "ionicons/icons";
import { getCategories, getNotes } from '../store/Selectors';
import { CategoryStore, NoteStore } from '../store';
import { markNote } from "../store/NoteStore";

const Home = () => {

	const categories = CategoryStore.useState(getCategories);
	const notes = NoteStore.useState(getNotes);

	const getNoteStyle = (categoryID, isComplete = false) => {

		const categoryColor = categories.filter(category => category.id === categoryID)[0].color;

		return {

			"--background": categoryColor,
			"--background-checked": categoryColor,
			"--border-style": "none",
			"opacity": isComplete ? "0.6" : "1"
		}
	}

	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonButtons slot="start">
						<IonButton>
							<IonIcon icon={ menuOutline } />
						</IonButton>
					</IonButtons>

					<IonButtons slot="end">
						<IonButton>
							<IonIcon icon={ searchOutline } />
						</IonButton>

						<IonButton>
							<IonIcon icon={ notificationsOutline } />
						</IonButton>
					</IonButtons>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen>

				<IonGrid>
					<IonRow>
						<IonCol size="12" className="ion-padding-start">
							<h1 className={ styles.mainTitle }>Hello, Alan!</h1>
						</IonCol>
					</IonRow>

					<IonRow>
						<IonCol size="12" className="ion-padding-start ion-padding-top">
							<IonCardSubtitle className={ styles.heading }>
								Categories
							</IonCardSubtitle>
						</IonCol>
					</IonRow>
				</IonGrid>

				<IonSlides id="slider" options={{ slidesPerView: "auto", zoom: true, grabCursor: true }} className={ `${ styles.categorySlider } ion-padding-bottom` }>
					{ categories.map((category, index) => {

						const noteCount = notes.filter(n => n.category_id === category.id).length;

						return (

							<IonSlide key={ `categorySlide_${ index }`}>
								<IonCol className="ion-text-left">
									<IonCard>
										<IonCardHeader className="ion-no-padding">

											<div className={ styles.slideCount }>
												<h6>{ noteCount } { noteCount === 1 ? "note" : "notes" } </h6>
											</div>
											<div className={ styles.slideHeader }>
												<h4>{ category.name }</h4>
											</div>
										</IonCardHeader>

										<IonCardContent>
											<div className={ styles.categoryColor } style={{ borderBottom: `2px solid ${ category.color }` }}></div>
										</IonCardContent>
									</IonCard>
								</IonCol>
							</IonSlide>
						);
					})}
				</IonSlides>

				<IonGrid className={ styles.bottomContainer }>
					<IonRow>
						<IonCol size="12" className="ion-padding-start">
							<IonCardSubtitle className={ styles.heading }>
								Recent Notes
							</IonCardSubtitle>
						</IonCol>
					</IonRow>
					
					<div className={ styles.recentNotes }>

						{ notes.map((note, index) => {

							return (

								<IonRow key={ `note_${ index }` } className="animate__animated animate__faster" id={ `noteRow_${ note.id }` }>
									<IonCol size="12">
										<IonItem>
											<IonCheckbox checked={ note.complete } style={ getNoteStyle(note.category_id, note.complete) } onClick={ () => markNote(note.id) } />
											<h4 style={ note.complete ? { textDecoration: "line-through", opacity: "0.6" } : {} }>{ note.note }</h4>
										</IonItem>
									</IonCol>
								</IonRow>
							);
						})}
					</div>
				</IonGrid>

				<IonFab vertical="bottom" horizontal="end" slot="fixed" className="ion-padding">
					<IonFabButton routerLink="/add">
						<IonIcon icon={ addOutline } />
					</IonFabButton>
				</IonFab>
			</IonContent>
		</IonPage>
	);
};

export default Home;

import { IonBackButton, IonButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonItem, IonLabel, IonPage, IonRow, IonSelect, IonSelectOption, IonTextarea, IonTitle, IonToolbar, useIonRouter } from '@ionic/react';
import styles from './Add.module.scss';

import { checkmarkOutline } from "ionicons/icons";
import { getCategories, getNotes } from '../store/Selectors';
import { CategoryStore, NoteStore } from '../store';
import { addNote } from "../store/NoteStore";
import { useState } from 'react';

const Add = () => {

	const categories = CategoryStore.useState(getCategories);
	const notes = NoteStore.useState(getNotes);
    const [ noteCategory, setNoteCategory ] = useState(false);
    const [ noteContent, setNoteContent ] = useState("");
    const router = useIonRouter();

    const add = () => {

        const note = {

            id: notes.length + 1,
            category_id: noteCategory,
            note: noteContent,
            complete: false
        }

        addNote(note);
        router.goBack();
    }

	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonButtons slot="start">
						<IonBackButton />
					</IonButtons>

                    <IonTitle className={ styles.title }>Add note</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen>

                <IonGrid className="ion-padding-top">

                    <IonRow>
						<IonCol size="12" className="ion-padding-start">
							<h1 className={ styles.mainTitle }>Add a note</h1>
						</IonCol>
					</IonRow>

                    <IonRow>
                        <IonCol size="12">
                            <IonItem lines="none" className={ styles.customInput }>
                                <IonLabel position="floating">Category</IonLabel>
                                <IonSelect placeholder="Select..." value={ noteCategory } onIonChange={ e => setNoteCategory(e.target.value) }>
                                    { categories.map(category => {

                                        return <IonSelectOption value={ category.id } key={ category.id }>{ category.name }</IonSelectOption>
                                    })}
                                </IonSelect>
                            </IonItem>
                        </IonCol>
                    </IonRow>

                    <IonRow>
                        <IonCol size="12">
                            <IonItem lines="none" className={ styles.customInput }>
                                <IonLabel position="floating">Note</IonLabel>
                                <IonTextarea value={ noteContent } onIonChange={ e => setNoteContent(e.target.value) } placeholder="Enter note text here..." />
                            </IonItem>
                        </IonCol>
                    </IonRow>

                    <IonRow>
                        <IonCol size="12">
                            <IonButton expand="block" className={ styles.saveButton } onClick={ add }>
                                <IonIcon icon={ checkmarkOutline } />
                                Save note
                            </IonButton>
                        </IonCol>
                    </IonRow>
                </IonGrid>
			</IonContent>
		</IonPage>
	);
};

export default Add;
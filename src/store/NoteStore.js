import { Store } from 'pullstate';

const NoteStore = new Store({

	notes: [
        {
            id: 1,
            category_id: 1,
            note: "Daily meeting with team",
            complete: false
        },
        {
            id: 2,
            category_id: 2,
            note: "Pay monthly rent",
            complete: true
        },
        {
            id: 3,
            category_id: 3,
            note: "Workout in the gym",
            complete: false
        },
        {
            id: 4,
            category_id: 1,
            note: "Make progress on project",
            complete: false
        },
    ]
});

export const markNote = noteID => {

    const noteIndex = NoteStore.currentState.notes.findIndex(n => n.id === noteID);
    NoteStore.update(s => { s.notes[noteIndex].complete = !s.notes[noteIndex].complete });

    document.getElementById(`noteRow_${ noteID }`).classList.add("animate__pulse");

    setTimeout(() => {

        document.getElementById(`noteRow_${ noteID }`).classList.remove("animate__pulse");
    }, 500);
}

export const addNote = (note) => {

    NoteStore.update(s => { s.notes = [ note, ...s.notes ]});
}

export default NoteStore;
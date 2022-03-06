import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ReactComponent as ArrowLeft } from "../assets/arrow-left.svg";

const NotePage = ({ match, history }) => {
	let noteId = match.params.id;

	let [note, setNote] = useState(null);

	useEffect(() => {
		getNote();
	}, [noteId]);

	let getNote = async () => {
		if (noteId === "new") return;
		let response = await fetch(`http://localhost:8000/notes/${noteId}`);
		let data = await response.json();
		setNote(data);
	};

	let updateNote = async () => {
		await fetch(`http://localhost:8000/notes/${noteId}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ ...note, updated: new Date() }),
		});
	};

	let deleteNote = async () => {
		await fetch(`http://localhost:8000/notes/${noteId}`, {
			method: "DELETE",
		});
		history.push("/");
	};

	let createNote = async () => {
		await fetch("http://localhost:8000/notes/", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ ...note, updated: new Date() }),
		});
	};

	let handleSubmit = async () => {
		if (noteId !== "new" && !note.body) {
			await deleteNote();
		} else if (noteId === "new" && note !== null) {
			await createNote();
		} else if (noteId !== "new") {
			await updateNote();
		}
		history.push("/");
	};

	return (
		<div className='note'>
			<div className='note-header'>
				<h3>
					<ArrowLeft onClick={handleSubmit} />
				</h3>
				{noteId !== "new" ? (
					<button onClick={deleteNote}>Delete</button>
				) : (
					<button onClick={handleSubmit}>Done</button>
				)}
			</div>
			<textarea
				onChange={(e) => {
					setNote({ ...note, body: e.target.value });
				}}
				value={note?.body}
			></textarea>
		</div>
	);
};

export default NotePage;

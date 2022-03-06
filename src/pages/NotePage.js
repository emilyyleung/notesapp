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

	let handleSubmit = async () => {
		await updateNote();
		history.push("/");
	};

	return (
		<div className='note'>
			<div className='note-header'>
				<h3>
					<ArrowLeft onClick={handleSubmit} />
				</h3>
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

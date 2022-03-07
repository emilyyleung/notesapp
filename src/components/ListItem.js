import { Link } from "react-router-dom";

let getTitle = (note) => {
	const title = note.body.split("\n")[0];

	if (title.length > 45) {
		return title.slice(0, 45);
	}

	return title;
};

let getDate = (note) => {
	return new Date(note.updated).toLocaleDateString();
};

let getContent = (note) => {
	let content = note.body.split("\n");
	content.shift();
	content = content.join("\n");
	content = content.replaceAll("\n", " ");

	if (content.length > 45) {
		return content.slice(0, 45);
	}

	return content;
};

const ListItem = ({ note }) => {
	return (
		<Link to={`/note/${note.id}`}>
			<div className='notes-list-item'>
				<h3>{getTitle(note)}</h3>
				<p>
					<span>{getDate(note)}</span>
					{getContent(note)}
				</p>
			</div>
		</Link>
	);
};

export default ListItem;

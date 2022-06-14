import { useState } from "react";

import ReactMde from "react-mde";
import Showdown from "showdown";

import "react-mde/lib/styles/css/react-mde-all.css";

export default function CreateQuestion() {
	const [createQuestion, setCreateQuestion] = useState(false);
	const [showOption, setShowOption] = useState(false);
	const [selectedTab, setSelectedTab] = useState("write");
	const [value, setValue] = useState("write");

	const converter = new Showdown.Converter({
		tables: true,
		simplifiedAutoLink: true,
		strikethrough: true,
		tasklists: true,
	});

	function toggleQuestion() {
		setCreateQuestion((oldValue) => !oldValue);
	}

	function toggleOptions() {
		setShowOption((oldValue) => !oldValue);
	}

	return (
		<div>
			Create Question div
			{!createQuestion && (
				<button onClick={toggleQuestion}>New Question</button>
			)}
			{createQuestion && (
				<div>
					<ReactMde
						value={value}
						onChange={setValue}
						selectedTab={selectedTab}
						onTabChange={setSelectedTab}
						generateMarkdownPreview={(markdown) =>
							Promise.resolve(converter.makeHtml(markdown))
						}
						minEditorHeight={20}
						heightUnits="vh"
					/>
					<div className="add-options">
						<button onClick={toggleOptions}>Add Options</button>
						<select id="favColor">
							<option value="1">Red</option>
							<option value="2">Orange</option>
							<option value="3">Yellow</option>
							<option value="4">Green</option>
						</select>
					</div>
					<div className="correct-answer">
						<span>Correct Answer: </span>
						<input
							type="text"
							placeholder="enter correct answer here"
						/>
					</div>
					<div>
						<input
							type="radio"
							id="public"
							name="visibility"
							value="public"
						/>
						<label htmlFor="public">Public</label>

						<input
							type="radio"
							id="private"
							name="visibility"
							value="private"
						/>
						<label htmlFor="private">Private</label>
					</div>
					<div style={{ marginLeft: "auto" }}>
						<button onClick={toggleQuestion}>Post</button>
						<button onClick={toggleQuestion}>Cancel</button>
					</div>
				</div>
			)}
		</div>
	);
}

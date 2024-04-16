import { useState, useEffect } from "react";
import { getNotes, createNote, deleteNote } from "../api";
import Note from "../components/Note";
import "../styles/Home.css";

const Home = () => {
    const [notes, setNotes] = useState([]);
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchNotes();
    }, []);

    const fetchNotes = () => {
        getNotes()
            .then((res) => {
                setNotes(res.data);
            })
            .catch((err) => {
                setError("Failed to fetch notes. Please try again later.");
                console.error("Error fetching notes:", err);
            });
    };

    const handleDeleteNote = (id) => {
        deleteNote(id)
            .then((res) => {
                if (res.status === 204) {
                    alert("Note deleted!");
                    fetchNotes();
                } else {
                    setError("Failed to delete note.");
                    console.error("Failed to delete note:", res.statusText);
                }
            })
            .catch((err) => {
                setError("Failed to delete note.");
                console.error("Error deleting note:", err);
            });
    };

    const handleCreateNote = (e) => {
        e.preventDefault();
        createNote({
            content: content,
            title: title,
        })
            .then((res) => {
                if (res.status === 201) {
                    alert("Note created!");
                    fetchNotes();
                } else {
                    setError("Failed to create note.");
                    console.error("Failed to create note:", res.statusText);
                }
            })
            .catch((err) => {
                setError("Failed to create note.");
                console.error("Error creating note:", err);
            });
    };

    return (
        <div>
            {error && <p className="error">{error}</p>}
            <div>
                <h2>Notes</h2>
                {notes.map((note) => (
                    <Note key={note.id} note={note} onDelete={handleDeleteNote} />
                ))}
            </div>
            <h2>Create note</h2>
            <form onSubmit={handleCreateNote}>
                <label htmlFor="title">Title:</label>
                <br />
                <input
                    type="text"
                    id="title"
                    name="title"
                    required
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                />
                <label htmlFor="content">Content:</label>
                <br />
                <textarea
                    id="content"
                    name="content"
                    required
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
                <br />
                <input type="submit" value="Create Note" />
            </form>
        </div>
    );
};

export default Home;

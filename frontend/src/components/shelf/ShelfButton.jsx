import { useEffect, useState } from "react";
import ShelfApi from "../../api/shelfApi";
import "./ShelfButton.css";

const ShelfButton = ({ bookId }) => {
    const [status, setStatus] = useState("");
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchShelf = async () => {
            try {
                const data = await ShelfApi.getBookShelf(bookId);
                if (data.status) {
                    setStatus(data.status);
                } else {
                    setStatus("");
                }
            } catch (error) {
                console.error(error);
                setStatus("want_to_read");
            } finally {
                setLoading(false);
            }
        };
        fetchShelf();
    }, [bookId]);
    const handleChange = async (event) => {
        const newStatus = event.target.value;
        try {
            await ShelfApi.addToShelf(bookId, newStatus);
            setStatus(newStatus);
        } catch (error) {
            console.error(error);
        }
    };
    if (loading) {
        return (
            <button className="shelf-select" disabled>
                Loading...
            </button>
        );
    }
    return (
        <select className="shelf-select" value={status} onChange={handleChange} >
            <option value="" disabled> Select Shelf </option>
            <option value="want_to_read"> Want To Read </option>
            <option value="reading"> Reading </option>
            <option value="completed"> Completed </option>
        </select>
    );
};

export default ShelfButton;
import { useState } from "react";
import { useSelector } from "react-redux";
import apiService from "../../services/APIService";

export default function CollCreateModal() {
  const user = useSelector((store) => store.user);

  const [image, setImage] = useState({});
  const [imageUrl, setImageUrl] = useState("");
  const [name, setName] = useState("My collection");
  const [topic, setTopic] = useState("books");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [resultMessage, setResultMessage] = useState({});

  function updateImage(e) {
    // console.log(e.target.files[0]);
    // upload file and set image url
  }

  async function createCollection() {
    setIsLoading(true);
    const newCollection = {
      user_id: user.id,
      name,
      topic,
      description,
      // imageUrl,
    };
    try {
      const result = await apiService.reqCreateColl(newCollection);
      if (result.success) {
        setIsLoading(false);
        setResultMessage({ color: "green", message: result.message });
        setImage({});
        setImageUrl();
        setName("");
        setTopic("books");
        setDescription("");
      } else {
        setIsLoading(false);
        setResultMessage({ color: "red", message: result.message });
      }
    } catch (e) {
      console.log(e);
      setIsLoading(false);
      setResultMessage({
        color: "red",
        message: "Sorry, unable to connect...",
      });
    }
  }

  return (
    <div
      className="modal fade"
      id="exampleModal"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Create a new collection
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <form className="d-flex flex-column">
              <label htmlFor="image">Image: </label>
              <input onChange={updateImage} name="image" type="file" />
              <label className="form-label" htmlFor="name">
                Name:
              </label>
              <input
                onChange={(e) => {
                  setName(e.target.value);
                }}
                className="form-control"
                name="name"
                value={name}
              />
              <label htmlFor="topic">Topic: </label>
              <select
                onChange={(e) => {
                  setTopic(e.target.value);
                }}
                name="topic"
                id="topic"
              >
                <option value="books">Books</option>
                <option value="signs">Signs</option>
                <option value="silverware">Silverware</option>
              </select>
              <label htmlFor="description">Description: </label>
              <textarea
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
                className="form-control"
                name="description"
                value={description}
                id="description"
                rows="4"
              ></textarea>
            </form>
          </div>
          <div className="modal-footer">
            {isLoading ? (
              <div className="spinner-border m-auto" role="status"></div>
            ) : (
              <h5 className="m-auto" style={{ color: resultMessage.color }}>
                {resultMessage.message}
              </h5>
            )}
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
              onClick={createCollection}
              type="button"
              className="btn btn-primary"
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
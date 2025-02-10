import { useState, useContext } from "react";
import API from "../api/axios"; 
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

function UploadPage() {
  const [title, setTitle] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  // pour accéder à logout si besoin, ou à isAuthenticated
  const { logout } = useContext(AuthContext);

  const handleFileChange = (e) => {
    // Le user a sélectionné un fichier
    const file = e.target.files[0];
    if (!file) return;

    // On va convertir le fichier en base64
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      // reader.result contiendra par ex "data:image/png;base64, iVBORw0KGgoAAAANS..."
      setSelectedFile(reader.result);
    };
    reader.onerror = () => {
      setError("Erreur lors de la lecture du fichier.");
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Vérifier si on a un token
    const token = localStorage.getItem("JWT");
    if (!token) {
      // Par exemple, on redirige vers /login
      return navigate("/login");
    }

    if (!title || !selectedFile) {
      return setError("Veuillez renseigner un titre et choisir un fichier à uploader.");
    }

    try {
      const response = await API.post(
        "/galleries",
        {
          title,
          image: selectedFile, // base64
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201 || response.status === 200) {
        setSuccess("Image uploadée avec succès !");
        setTitle("");
        setSelectedFile(null);
      } else {
        setError("Une erreur est survenue lors de l’upload.");
      }
    } catch (err) {
      if (err.response?.status === 401) {
        logout();
        navigate("/login");
      } else {
        setError(err.response?.data?.message || "Une erreur est survenue lors de l’upload.");
      }
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 shadow-lg rounded-lg mt-8">
      <h2 className="text-2xl font-bold text-center text-blue-500 mb-6">Uploader une image</h2>

      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
      {success && <p className="text-green-500 text-sm mb-4">{success}</p>}

      <form onSubmit={handleSubmit}>
        {/* Champ Titre */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700" htmlFor="title">
            Titre de l’image
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm
                       focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Ex: Mon super paysage"
          />
        </div>

        {/* Champ Fichier */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700" htmlFor="fileInput">
            Choisir une image
          </label>
          <input
            id="fileInput"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="mt-1 block w-full text-sm text-gray-900
                       file:mr-4 file:py-2 file:px-4
                       file:rounded-full file:border-0
                       file:text-sm file:font-semibold
                       file:bg-blue-50 file:text-blue-700
                       hover:file:bg-blue-100
                       cursor-pointer"
          />
        </div>

        {/* Preview de l'image (optionnel) */}
        {selectedFile && (
          <div className="mb-4">
            <p className="text-sm text-gray-500 mb-2">Aperçu de l’image :</p>
            <img
              src={selectedFile}
              alt="preview"
              className="max-h-48 object-cover rounded"
            />
          </div>
        )}

        {/* Bouton Submit */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Uploader
        </button>
      </form>
    </div>
  );
}

export default UploadPage;

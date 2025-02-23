import React, { useState, useEffect } from "react";
import api from "../../api";
import { toast } from "react-toastify";
import "./PhotoUpload.css";

const PhotoUpload = ({ onUpload, existingPhotos = [], onStatusChange }) => {
  const [loading, setLoading] = useState(false);
  const [previews, setPreviews] = useState(existingPhotos);

  // Atualiza o estado interno caso o array de imagens existente mude
  useEffect(() => {
    setPreviews(existingPhotos);
  }, [existingPhotos]);

  const handleFileChange = async (event) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    if (onStatusChange) onStatusChange(true); // Inicia upload
    setLoading(true);
    const newPreviews = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await api.post("/upload/reviews", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        const { driveLink } = response.data;
        newPreviews.push(driveLink);
        toast.success(`Upload da foto "${file.name}" realizado com sucesso!`);
      } catch (error) {
        console.error(`Erro no upload da foto ${file.name}:`, error);
        toast.error(`Erro no upload da foto "${file.name}".`);
      }
    }

    const updatedPreviews = [...previews, ...newPreviews];
    setPreviews(updatedPreviews);
    onUpload(updatedPreviews);
    setLoading(false);
    if (onStatusChange) onStatusChange(false); // Finaliza upload
  };

  const handleRemovePhoto = (index) => {
    const updatedPreviews = previews.filter((_, i) => i !== index);
    setPreviews(updatedPreviews);
    onUpload(updatedPreviews);
  };

  return (
    <div className="photo-upload">
      {previews.length > 0 && (
        <div className="photo-preview">
          <p>Previews das imagens:</p>
          <div className="previews-container">
            {previews.map((src, index) => (
              <div key={index} className="preview-item">
                <img src={src} alt={`Preview ${index + 1}`} />
                <button
                  type="button"
                  className="remove-photo"
                  onClick={() => handleRemovePhoto(index)}
                >
                  &#x2715;
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
      <input
        type="file"
        onChange={handleFileChange}
        accept="image/*"
        multiple
        disabled={loading}
      />
    </div>
  );
};

export default PhotoUpload;

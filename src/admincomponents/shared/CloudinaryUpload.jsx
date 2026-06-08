import React, { useState, useRef } from "react";
import "./CloudinaryUpload.css";

const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || "demo";
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || "ml_default";

export default function CloudinaryUpload({ label, value, onChange }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const inputRef = useRef();

  async function handleFile(e) {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    setError(null);
    try {
      const form = new FormData();
      form.append("file", file);
      form.append("upload_preset", UPLOAD_PRESET);
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        { method: "POST", body: form }
      );
      if (!res.ok) throw new Error("Upload failed");
      const data = await res.json();
      onChange(data.secure_url);
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="cloud-upload">
      {label && <label className="cloud-upload__label">{label}</label>}
      <div className="cloud-upload__area" onClick={() => inputRef.current.click()}>
        {value ? (
          <img src={value} alt="Uploaded" className="cloud-upload__preview" />
        ) : (
          <div className="cloud-upload__placeholder">
            <span className="cloud-upload__icon">📷</span>
            <span>{uploading ? "Uploading..." : "Click to upload image"}</span>
          </div>
        )}
        {uploading && <div className="cloud-upload__progress" />}
      </div>
      {error && <p className="cloud-upload__error">{error}</p>}
      {value && (
        <div className="cloud-upload__actions">
          <input
            className="cloud-upload__url"
            value={value}
            readOnly
            placeholder="Image URL"
          />
          <button type="button" className="cloud-upload__remove" onClick={() => onChange("")}>
            Remove
          </button>
        </div>
      )}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleFile}
      />
    </div>
  );
}

export { CloudinaryUpload };

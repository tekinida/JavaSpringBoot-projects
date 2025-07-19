import { useDropzone } from 'react-dropzone';
import { useState } from 'react';

const DropzoneBox = ({ setIsDragging, onFileAccepted }) => {
  const [preview, setPreview] = useState(null);

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    setPreview(URL.createObjectURL(file));
    onFileAccepted(file);
  };

  const {
    getRootProps,
    getInputProps,
    isDragActive,
  } = useDropzone({
    onDrop,
    accept: { 'audio/mpeg': ['.mp3'] },
    onDragEnter: () => setIsDragging(true),
    onDragLeave: () => setIsDragging(false),
    onDropAccepted: () => setIsDragging(false),
  });

  return (
    <div
      {...getRootProps()}
      className={`w-full max-w-md mt-6 border-4 border-dashed rounded-xl p-8 text-center transition cursor-pointer ${
        isDragActive
          ? 'bg-purple-100 border-purple-500'
          : 'bg-white border-gray-300 hover:bg-gray-100'
      }`}
    >
      <input {...getInputProps()} />
      <p className="text-base sm:text-lg text-gray-700 font-medium">
        {isDragActive
          ? 'Bırak dosyayı'
          : 'MP3 dosyasını buraya sürükle ya da tıkla'}
      </p>

      {preview && (
        <audio controls className="mt-4 w-full">
          <source src={preview} type="audio/mpeg" />
        </audio>
      )}
    </div>
  );
};

export default DropzoneBox;

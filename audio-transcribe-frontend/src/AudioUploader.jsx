import { useState } from 'react';
import Lottie from 'lottie-react';
import waveAnimation from './assets/speech-to-text.json';
import { useDropzone } from 'react-dropzone';

const AudioUploader = () => {
  const [preview, setPreview] = useState(null);

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    setPreview(URL.createObjectURL(file));
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'audio/mpeg': ['.mp3'] },
  });

  return (
    <div className="w-screen h-screen overflow-hidden bg-gray-100 flex flex-col items-center justify-center px-4">
      <h1 className="text-1xl sm:text-2xl font-bold text-gray-800 mb-4 text-center">
        🎙️ Audio to Text
      </h1>

      <div className="w-64 h-64">
        <Lottie animationData={waveAnimation} loop />
      </div>

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
    </div>
  );
};

export default AudioUploader;

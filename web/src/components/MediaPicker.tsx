"use client";
import Image from "next/image";
import { ChangeEvent, useState } from "react";

//sempre use client para que o javascript seja utilizado no navegador, ja que o next faz tudo pelo o back e depois enviar para o front, utilizando assim ele vai utilizar apenas essa parte
//Nesse caso vou utilizar o onChange que junto de uma função javascript
//usar o use client apenas quando tiver reatividade
export function MediaPicker() {
  const [preview, setPreview] = useState<string | null>(null);

  function onFileSelected(e: ChangeEvent<HTMLInputElement>) {
    const { files } = e.target;

    if (!files) {
      return;
    }

    const previewURL = URL.createObjectURL(files[0]);

    setPreview(previewURL);
  }

  return (
    <>
      <input
        type="file"
        name="coverUrl"
        id="media"
        className="invisible w-0 h-0"
        accept="image/*"
        onChange={onFileSelected}
      />

      {preview && (
        <img
          src={preview}
          alt="midia"
          className="w-full aspect-video rounded-lg object-contain"
        />
      )}
    </>
  );
}

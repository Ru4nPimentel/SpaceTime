"use client";
import { Camera } from "lucide-react";
import { MediaPicker } from "./MediaPicker";
import { FormEvent } from "react";
import Cookie from "js-cookie";
import { api } from "./lib/api";
import { useRouter } from "next/navigation";

export function NewMemoryForm() {
  const routerNav = useRouter();

  async function handleCreateMemory(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    //O target é exatamente o elemento que eu cliquei. O currentTarget é o elemento que está ouvindo o evento.
    const formData = new FormData(e.currentTarget);

    const fileToUpload = formData.get("coverUrl");

    let coverUrl = "";

    if (fileToUpload) {
      const uploadFormData = new FormData(); //lembrando que o backend só entende multipart

      uploadFormData.set("file", fileToUpload);

      const uploadResponse = await api.post("/upload", uploadFormData);

      coverUrl = uploadResponse.data.fileUrl;
    }

    const token = Cookie.get("token");

    await api.post(
      "/memories",
      {
        coverUrl,
        content: formData.get("content"),
        isPublic: formData.get("isPublic"),
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    routerNav.push("/");
  }

  return (
    <form className="flex flex-1 flex-col gap-2" onSubmit={handleCreateMemory}>
      <div className="flex items-center gap-4">
        <label
          htmlFor="media"
          className="flex cursor-pointer items-center gap-1.5 text-sm text-gray-200 hover:text-gray-100"
        >
          <Camera className="w-4 h-4" />
          Anexar mídia
        </label>

        <label
          htmlFor="isPublic"
          className="flex cursor-pointer items-center gap-1.5 text-sm text-gray-200 hover:text-gray-100"
        >
          <input
            type="checkbox"
            name="isPublic"
            id="isPublic"
            value="true"
            className="h-4 w-4 rounded border-gray-400 bg-gray-700 text-purple-500"
          />
          Tornar memoria publica
        </label>
      </div>

      <MediaPicker />

      <textarea
        name="content"
        spellCheck={false}
        className="w-ful flex-1 resize-none rounded border-0 bg-transparent p-0 text-lg leading-relaxed text-gray-100 placeholder:text-gray-400 focus:ring-0"
        placeholder="Fique livre para adicionar fotos, videos e relatos sobre essa experiência que você quer lembrar para sempre"
      ></textarea>

      <button
        type="submit"
        className="inline-block rounded-full bg-green-500 px-5 py-3 font-alt text-sm uppercase self-end leading-none text-black hover:bg-green-600 transition-colors"
      >
        Salvar
      </button>
    </form>
  );
}

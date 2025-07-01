/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { addShorten } from "@/api/addShorten";
import { useState } from "react";

export default function Home() {

  const [error, setError] = useState('')
  const [result, setResult] = useState('')

  const isValidHttpUrl = (urlString: string) => {
    let url;
    try {
      url = new URL(urlString);
    } catch (_) {
      return false;  
    }

    return url.protocol === "http:" || url.protocol === "https:";
  }

  const handleFormSubmit = async (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault()
    
    const url = event.currentTarget.url.value
    const alias = event.currentTarget.alias.value

    if (isValidHttpUrl(url)) {
      const result = await addShorten(url, alias)

      setError(result.error ? result.error : '')
      setResult(result.data ? result.data : '')

      if (result.data) {
        event.currentTarget.url.value = ''
        event.currentTarget.alias.value = ''
      }
    } else {
      setError('Некорректный адрес')
    }
  }
  
  return (
    <div className="">
      <form onSubmit={handleFormSubmit} className="flex flex-col gap-2">
        <input name="url" placeholder="адрес*" className="w-[400px] p-1 border" />
        <input name="alias" placeholder="алиас" className="w-[400px] p-1 border" />
        <button type="submit" className="cursor-pointer">Добавить</button>
      </form>
      {error && <p className="text-red-400 mt-1">{error}</p>}
      {result && <a href={result} className="text-blue-400 mt-1" target="_blank">{result}</a>}
    </div>
  );
}

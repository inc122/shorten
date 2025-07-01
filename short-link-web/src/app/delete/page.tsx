'use client'

import { deleteShorten } from "@/api/deleetShorten";
import { useState } from "react";

export default function Page() {

  const [error, setError] = useState('')
  const [result, setResult] = useState('')

  const handleFormSubmit = async (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault()
    
    const url = event.currentTarget.url.value
    const result = await deleteShorten(url)

    setResult(result.success ? 'Ссылка удалена' : '')
    setError(result.success ? '' : 'Ссылка не найдена')

    if (result.success) {
      event.currentTarget.url.value = ''
    }
  }

  return (
    <div className="">
      <form onSubmit={handleFormSubmit} className="flex flex-col gap-2">
        <input name="url" placeholder="короткая ссылыка (PSm3FhbX)" className="w-[400px] p-1 border" />
        <button type="submit" className="cursor-pointer">Удалить</button>
      </form>
      {error && <p className="text-red-400 mt-1">{error}</p>}
      {result && <a href={result} className="text-blue-400 mt-1" target="_blank">{result}</a>}
    </div>
  );
}

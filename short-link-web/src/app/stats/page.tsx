'use client'

import { getShortenStats, SortenAnalytics } from "@/api/getShortenStats";
import { useState } from "react";

export default function Page() {

  const [error, setError] = useState('')
  const [result, setResult] = useState<SortenAnalytics>()

  const handleFormSubmit = async (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault()
    
    const url = event.currentTarget.url.value
    const result = await getShortenStats(url)

    setResult(result.error ? undefined : result.data)
    setError(result.error ? 'Ссылка не найдена' : '')
  }

  return (
    <div className="">
      <form onSubmit={handleFormSubmit} className="flex flex-col gap-2">
        <input name="url" placeholder="короткая ссылыка (PSm3FhbX)" className="w-[400px] p-1 border" />
        <button type="submit" className="cursor-pointer">Статистика</button>
      </form>
      {error && <p className="text-red-400 mt-1">{error}</p>}
      {result && (
        <div className="flex flex-col">
          <p>Кол-во переходов: {result.count}</p>
          <p>Последние IP:</p>
          {result.lastVisitedBy.map(l => (
            <p key={l} className="pl-2">{l}</p>
          ))}
        </div>
      )}
    </div>
  );
}

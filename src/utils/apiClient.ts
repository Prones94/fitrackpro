export async function fetchExerciseData(endpoint: string){
  const apiKey = process.env.EXERCISE_API_KEY
  const baseUrl = process.env.NEXT_PUBLIC_EXERCISE_API_BASE

  if (!apiKey || !baseUrl){
    throw new Error("Missing API key or Base URL")
  }

  const url = `${baseUrl}${endpoint}`

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": apiKey,
      "X-RapidAPI-Host": "exercise-db-fitness-workout-gym.p.rapidapi.com",
    },
  })

  if (!response.ok){
    throw new Error(`HTTP Error: ${response.status}`)
  }

  return response.json()
}
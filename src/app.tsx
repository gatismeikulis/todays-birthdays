import { useQuery } from "@tanstack/react-query";

const endpoint = "https://api.wikimedia.org/feed/v1/wikipedia/en/onthisday/births/02/06";

export function App() {
  const query = useQuery({
    queryKey: ["birthdays"],
    queryFn: async () => {
      const response = await fetch(endpoint);
      return response.json();
    },
  });

  console.log(query.data);

  return <div>empty app</div>;
}

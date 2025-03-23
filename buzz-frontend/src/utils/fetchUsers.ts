export async function fetchUsers() {
    const response = await fetch("http://localhost:3000/users");
    if (!response.ok) {
        console.error("Fetch failed:", response.status, response.statusText);
        throw new Error("Network response was not ok");
    }
    const data = await response.json();
    console.log("Fetched users:", data);
    return data;
}
import AddFriendForm from "@/components/AddFriendForm";

export default function FriendsPage() {

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const email = formData.get('email'); // Retrieving values ​from a TextField by name.
        console.log("Adding friend with email:", email);

        // await fetch('/api/friends', { method: 'POST', body: JSON.stringify({ email }) });
    };

    return <>
        <h1>Add friends</h1>
        <p>Add friends by email</p>

        <AddFriendForm />
    </>
}
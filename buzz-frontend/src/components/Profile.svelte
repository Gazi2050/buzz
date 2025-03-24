<script lang="ts">
    import { User, Eye, EyeOff } from "lucide-svelte";
    import Button from "./Button.svelte";
    import { inputObj } from "$lib/Class";
    import { deleteUser, signout } from "@utils/auth";
    import Swal from "sweetalert2";
    import { toast } from "svelte-sonner";
    import { goto } from "$app/navigation";

    let { username = "", password = "", profileColor = "" } = $props();
    let isShow = $state(false);

    async function handleDelete() {
        try {
            // Prompt the user with a confirmation message
            Swal.fire({
                title: "Are you sure?",
                text: "This action cannot be undone!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#27272a",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!",
                theme: "dark",
            }).then(async (result) => {
                if (result.isConfirmed) {
                    // Perform the deletion action
                    const result = await deleteUser({ username });
                    signout();
                    goto("/");
                    // Handle the outcome of the delete operation
                    if (result) {
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your account has been successfully deleted.",
                            icon: "success",
                            confirmButtonColor: "#27272a",
                            theme: "dark",
                        });
                    } else {
                        Swal.fire({
                            title: "Error",
                            text: "Failed to delete account. Please try again later.",
                            icon: "error",
                            confirmButtonColor: "#27272a",
                            theme: "dark",
                        });
                    }
                }
            });
        } catch (error) {
            console.error("Error deleting account:", error);
            toast.error("An error occurred while processing the deletion");
        }
    }
</script>

<div class="flex justify-center items-center h-screen mx-2">
    <div
        class="bg-black border-t border-l border-green-950 max-w-lg w-full flex flex-col items-center py-16 px-8 rounded-2xl shadow-lg"
    >
        <div
            class="w-24 h-24 rounded-full flex justify-center items-center shadow-md"
            style:background-color={profileColor}
        >
            <User class="w-16 h-16 text-black" />
        </div>
        <p class="text-white text-xl font-semibold mt-4">{username}</p>
        <div
            class="text-white font-medium mt-5 text-xl flex flex-col justify-center items-center gap-1"
        >
            <div class="text-xl">Password :</div>
            <div class={inputObj?.outerClass}>
                <input
                    type={isShow ? "text" : "password"}
                    class={inputObj?.innerClass}
                    placeholder="Enter Password"
                    id="password"
                    autocomplete="off"
                    bind:value={password}
                    readonly
                />
                <button
                    type="button"
                    onclick={() => (isShow = !isShow)}
                    class="inline-flex items-center"
                >
                    {#if isShow}
                        <EyeOff class="text-gray-400" />
                    {:else}
                        <Eye class="text-gray-400" />
                    {/if}
                </button>
            </div>
        </div>
        <div class="flex justify-center items-center gap-5 mt-10">
            <Button
                type="button"
                text="Delete Account"
                color="#ff0303"
                onclick={handleDelete}
            />
        </div>
    </div>
</div>

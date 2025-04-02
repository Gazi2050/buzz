<script lang="ts">
    import { User } from "lucide-svelte";
    import Button from "./Button.svelte";
    import { storedUser } from "$lib/authStore";
    import moment from "moment";
    import type { CommentData } from "$lib/type";
    import { page } from "$app/state";
    import { addComment } from "@utils/addComment";

    let postId = page.params.slug;
    let username = "Anonymous";
    let userColor = "#6AFF33";
    let text = $state("");
    let errorMessage = $state<string | null>(null);
    let isSubmitting = $state(false);
    let formElement: HTMLFormElement;
    async function handleSubmit(event: Event) {
        event.preventDefault();
        const commentData: CommentData = {
            postId,
            username,
            userColor,
            text,
            time: moment().utc().toISOString(),
        };

        try {
            isSubmitting = true;
            errorMessage = null;

            const result = await addComment(commentData);
            console.log("Comment added successfully:", commentData);
            formElement.reset();
        } catch (error) {
            console.error("Submission error:", error);
            return;
        }
    }
</script>

<!-- comment input -->
<div
    class="mt-6 bg-gray-800/30 border border-gray-800 rounded-xl p-4 shadow-lg"
>
    <form bind:this={formElement} onsubmit={handleSubmit}>
        <textarea
            bind:value={text}
            class="focus:outline-none w-full h-20 text-white placeholder:text-gray-500"
            placeholder="Add a comment..."
            disabled={isSubmitting}
        ></textarea>

        {#if errorMessage}
            <p class="text-red-500 text-sm mt-2">{errorMessage}</p>
        {/if}

        <div class="flex justify-end mt-2">
            <Button
                type="submit"
                text={isSubmitting ? "Submitting..." : "Submit"}
                color="white"
                disabled={isSubmitting}
            />
        </div>
    </form>
</div>

<!-- comment list (static example) -->
<div class="flex justify-start items-center gap-2 mt-5">
    <div
        class="w-12 h-12 rounded-full flex justify-center items-center shadow-lg"
        style="background-color: #6AFF33;"
    >
        <User size={30} />
    </div>
    <div class="bg-gray-800/60 text-white rounded-xl px-4 py-2">
        <p class="text-base font-semibold">Anonymous</p>
        <p>This is comment</p>
    </div>
</div>
<span class="text-gray-400 ml-[65px] text-sm">an hour ago</span>

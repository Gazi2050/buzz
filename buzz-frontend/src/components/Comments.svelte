<script lang="ts">
    import { Proportions, User } from "lucide-svelte";
    import Button from "./Button.svelte";
    import { addComment } from "@utils/addComment";
    import moment from "moment";

    let { commentData } = $props();
    let text = $state("");
    let isSubmitting = $state(false);
    let formElement: HTMLFormElement;

    function handleSubmit(event: Event) {
        event.preventDefault();
        addComment(text);
        formElement.reset();
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

{#if commentData}
    {#each commentData as comment}
        <!-- comment list -->
        <div class="flex justify-start items-center gap-2 mt-5">
            <div
                class="w-12 h-12 rounded-full flex justify-center items-center shadow-lg"
                style="background-color:{comment?.profileColor};"
            >
                <User size={30} />
            </div>
            <div class="bg-gray-800/60 text-white rounded-xl px-4 py-2">
                <p class="text-base font-semibold">{comment?.username}</p>
                <p>{comment?.text}</p>
            </div>
        </div>
        <span class="text-gray-400 ml-[65px] text-sm"
            >{moment(comment?.time).local().fromNow()}</span
        >
    {/each}
{:else}
    null
{/if}

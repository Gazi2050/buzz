<script lang="ts">
    import { inputObj } from "$lib/Class";
    import type { Post } from "$lib/type";
    import moment from "moment";
    import Button from "./Button.svelte";
    import { createQuery, useQueryClient } from "@tanstack/svelte-query";
    import { currentUser } from "$lib/authStore";
    import { fetchUsers } from "@utils/fetchUsers";

    let {
        title = $bindable(""),
        description = $bindable(""),
        onSubmit = (post: Post) => {},
    } = $props();

    const queryClient = useQueryClient();

    const query = createQuery({
        queryKey: ["postUser", $currentUser],
        queryFn: () => fetchUsers(),
        refetchInterval: 500,
        refetchIntervalInBackground: true,
        enabled: !!$currentUser,
        staleTime: 5000,
    });

    let formElement: HTMLFormElement;

    async function handleSubmit(event: Event) {
        event.preventDefault();

        let userData;
        if ($query.isLoading || !$query.isSuccess) {
            try {
                userData = await queryClient.fetchQuery({
                    queryKey: ["users", $currentUser],
                    queryFn: () => fetchUsers(),
                });
            } catch (error) {
                console.error("Failed to fetch user data:", error);
                return;
            }
        } else {
            userData = $query.data;
        }

        const username = userData?.username ?? "Anonymous";
        const profileColor = userData?.profileColor ?? "#6AFF33";

        const post: Post = {
            username,
            profileColor,
            title,
            description,
            time: moment().utc().toISOString(),
            vote: { upvote: 0, downvote: 0, voter: [] },
            comments: [],
        };

        onSubmit(post);
        formElement.reset();
    }
</script>

<div class="flex items-center justify-center min-h-screen">
    <div
        class="w-full max-w-sm md:max-w-md lg:max-w-lg p-10 bg-black rounded-xl shadow-lg space-y-6 border-t-2 border-l-2 border-green-950"
    >
        <!-- Form Header -->
        <div class="text-center">
            <h1 class="text-3xl font-semibold text-white mb-3">
                Create your
                <span
                    class="bg-zinc-800 text-[#6AFF33] px-1.5 pb-1 pt-0 rounded-lg"
                >
                    Post
                </span>
            </h1>
        </div>

        <form class="space-y-6" bind:this={formElement} onsubmit={handleSubmit}>
            <!-- Post Title -->
            <div class="space-y-2">
                <label
                    for="title"
                    class="block text-sm md:text-base font-medium text-gray-500"
                >
                    Title
                </label>
                <div class="flex items-center gap-2">
                    <div class={inputObj?.outerClass}>
                        <input
                            type="text"
                            class={inputObj?.innerClass}
                            bind:value={title}
                            placeholder="Enter your post title"
                            id="title"
                            autocomplete="off"
                            required
                        />
                    </div>
                </div>
            </div>

            <!-- Post Description -->
            <div class="space-y-2">
                <label
                    for="description"
                    class="block text-sm md:text-base font-medium text-gray-500"
                >
                    Description
                </label>
                <div class="flex items-center gap-2">
                    <div class={inputObj?.outerClass}>
                        <textarea
                            class="outline-none placeholder:text-gray-400 text-white w-full h-[200px] resize-none"
                            placeholder="Enter your post description"
                            bind:value={description}
                            id="description"
                            autocomplete="off"
                            required
                        ></textarea>
                    </div>
                </div>
            </div>

            <!-- Submit Button -->
            <div class="flex flex-col items-center gap-2 mt-10">
                <Button text="Post" type="submit" textSize="23px" />
            </div>
        </form>
    </div>
</div>

<script lang="ts">
    import { goto } from "$app/navigation";
    import type { Post } from "$lib/type";
    import PostForm from "@components/PostForm.svelte";
    import { createPost } from "@utils/createPost";
    import { toast } from "svelte-sonner";

    async function handleSubmit(postData: Post) {
        // console.log("Post submitted:", postData);
        const success = await createPost(postData);
        if (success) {
            toast.success(`Post created successfully!`);
            goto("/");
        } else {
            toast.error("Failed to create the post. Please try again.");
        }
    }
</script>

<PostForm onSubmit={handleSubmit} />

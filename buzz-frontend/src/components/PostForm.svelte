<script>
    import { inputObj } from "$lib/Class";
    import Button from "./Button.svelte";
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
                    class="bg-zinc-800 text-[#6AFF33] px-[5px] pb-[3px] pt-0 rounded-lg"
                >
                    Post
                </span>
            </h1>
        </div>

        <form class="space-y-4">
            <!-- Post Title -->
            <div class="space-y-2">
                <label
                    for="Title"
                    class="block text-sm md:text-base font-medium text-gray-500"
                >
                    Title
                </label>
                <div class="flex items-center gap-2">
                    <div class={inputObj?.outerClass}>
                        <input
                            type="text"
                            class={inputObj?.innerClass}
                            placeholder="Enter your post title"
                            id="username"
                            autocomplete="off"
                            required
                        />
                    </div>
                </div>
            </div>
            <!-- Post Description -->
            <div class="space-y-2">
                <label
                    for="Description"
                    class="block text-sm md:text-base font-medium text-gray-500"
                >
                    Description
                </label>
                <div class="flex items-center gap-2">
                    <div class={inputObj?.outerClass}>
                        <textarea
                            class="outline-none placeholder:text-gray-400 text-white w-full h-[200px]"
                            placeholder="Enter your post description"
                            id="description"
                            autocomplete="off"
                            required
                        ></textarea>
                    </div>
                </div>
            </div>
            <div class="flex justify-center items-center mt-10">
                <Button text="Post" type="submit" textSize="23px" />
            </div>
        </form>
    </div>
</div>

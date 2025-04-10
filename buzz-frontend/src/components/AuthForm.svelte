<script lang="ts">
    import Button from "./Button.svelte";
    import { Eye, EyeOff, Loader, User } from "lucide-svelte";
    import { generateUsername } from "@utils/generateUsername";
    import { generatePassword } from "@utils/generatePassword";
    import { generateHexColor } from "@utils/generateHexColor";
    import { inputObj } from "$lib/Class";

    let {
        authType = "signup",
        username = $bindable(""),
        password = $bindable(""),
        profileColor = $bindable("#6AFF33"),
        onSubmit = () => {},
    } = $props();

    let isShow = $state(false);
    let isSignUp = $derived(authType === "signup");
    let isLoading = $state(false);

    async function handleGenerate() {
        isLoading = true;
        try {
            username = await generateUsername();
        } finally {
            isLoading = false;
        }
    }

    function handleGeneratePassword() {
        password = generatePassword();
    }

    function handleSubmit(event: Event) {
        event.preventDefault();
        onSubmit({ username, password, profileColor });
    }

    function handleGenerateProfileColor() {
        profileColor = generateHexColor();
    }
</script>

<div class="flex items-center justify-center min-h-screen">
    <div
        class="w-full max-w-sm md:max-w-md lg:max-w-lg p-10 lg:p-14 bg-black rounded-xl shadow-lg space-y-6 border-t-2 border-l-2 border-green-950"
    >
        <!-- Form Header -->
        <div class="text-center">
            <h1 class="text-3xl font-semibold text-white mb-3">
                {isSignUp ? "Welcome to" : "Continue to"}
                <a
                    href="/"
                    class="bg-zinc-800 text-[#6AFF33] px-[5px] pb-[3px] rounded-lg"
                >
                    Buzz
                </a>
            </h1>
            <p class="text-gray-500 text-base md:text-lg font-medium">
                {isSignUp
                    ? "Create or generate your anonymous identity"
                    : "Sign in to your anonymous identity"}
            </p>
        </div>

        <form class="space-y-4" onsubmit={handleSubmit}>
            <!-- Username -->
            <div class="space-y-2">
                <label
                    for="username"
                    class="block text-sm md:text-base font-medium text-gray-500"
                >
                    Username
                </label>
                <div class="flex items-center gap-2">
                    <div class={inputObj?.outerClass}>
                        <input
                            type="text"
                            class={inputObj?.innerClass}
                            placeholder="Enter Username"
                            id="username"
                            autocomplete="off"
                            bind:value={username}
                            disabled={isLoading}
                            required
                        />

                        {#if isLoading}
                            <Loader
                                class="text-gray-400 animate-spin w-5 h-5"
                            />
                        {/if}
                    </div>
                    {#if isSignUp}
                        <Button
                            text="Generate"
                            type="button"
                            onclick={handleGenerate}
                            disabled={isLoading}
                        />
                    {/if}
                </div>
            </div>

            <!-- Password -->
            <div class="space-y-2">
                <label
                    for="password"
                    class="block text-sm md:text-base font-medium text-gray-500"
                    >Password</label
                >
                <div class="flex items-center gap-2">
                    <div class={inputObj?.outerClass}>
                        <input
                            type={isShow ? "text" : "password"}
                            class={inputObj?.innerClass}
                            placeholder="Enter Password"
                            id="password"
                            autocomplete="off"
                            bind:value={password}
                            required
                        />
                        <button
                            type="button"
                            onclick={() => (isShow = !isShow)}
                        >
                            {#if isShow}
                                <EyeOff class="text-gray-400" />
                            {:else}
                                <Eye class="text-gray-400" />
                            {/if}
                        </button>
                    </div>
                    {#if isSignUp}
                        <Button
                            text="Generate"
                            type="button"
                            onclick={handleGeneratePassword}
                        />
                    {/if}
                </div>
            </div>

            {#if isSignUp}
                <!-- Profile color -->
                <div class="space-y-2">
                    <label
                        for="profileColor"
                        class="block text-sm md:text-base font-medium text-gray-500"
                        >Profile color</label
                    >
                    <div class="flex justify-center items-center gap-3">
                        <div
                            class="flex justify-center items-center rounded-full p-2"
                            style="background-color: {profileColor};"
                        >
                            <User class="w-7 h-7 text-black" />
                        </div>
                        <div class="hidden">
                            <input
                                type="text"
                                readonly
                                placeholder="Generate profile color"
                                id="profileColor"
                                autocomplete="off"
                                bind:value={profileColor}
                            />
                        </div>
                        <Button
                            text="Randomize color"
                            type="button"
                            onclick={handleGenerateProfileColor}
                        />
                    </div>
                </div>
            {/if}

            <div class="flex justify-center items-center mt-10">
                <Button
                    text={isSignUp ? "Sign Up" : "Sign In"}
                    type="submit"
                    textSize="20px"
                />
            </div>
        </form>

        <p class="text-center text-gray-500 text-sm md:text-base">
            {isSignUp ? "Already one of us?" : "Not one of us yet?"}
            <a
                href={isSignUp ? "/sign-in" : "/sign-up"}
                class="text-[#6AFF33] font-medium hover:underline"
                >{isSignUp ? "Sign In" : "Sign Up"}</a
            >
        </p>
    </div>
</div>

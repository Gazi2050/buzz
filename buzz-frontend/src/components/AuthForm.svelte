<script lang="ts">
    import Button from "./Button.svelte";
    import { autofillStyle, inputClass } from "$lib/Class";
    import { Eye, EyeOff, Loader } from "lucide-svelte";
    import { generateUsername } from "@utils/generateUsername";
    import { generatePassword } from "@utils/generatePassword";

    let {
        authType = "signup",
        username = "",
        password = "",
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
        onSubmit({ username, password });
    }
</script>

<div class="flex items-center justify-center min-h-screen bg-gray-50">
    <div
        class="w-full max-w-sm md:max-w-md lg:max-w-lg p-8 md:p-10 lg:p-12 bg-white rounded-xl shadow-lg space-y-6 border border-green-100"
    >
        <!-- Form Header -->
        <div class="text-center">
            <h1 class="text-3xl font-semibold text-gray-900 mb-3">
                {isSignUp ? "Welcome to" : "Welcome Back to"}
                <span
                    class="bg-black text-[#6AFF33] px-[5px] pb-[3px] rounded-lg"
                >
                    Buzz
                </span>
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
                    class="block text-sm md:text-base font-medium text-gray-700"
                >
                    Username
                </label>
                <div class="flex items-center gap-2">
                    <div
                        class={`${inputClass} flex justify-between items-center pr-2`}
                    >
                        <input
                            type="text"
                            class="outline-none placeholder:text-gray-400 flex-1 border-none"
                            placeholder="Enter Username"
                            id="username"
                            bind:value={username}
                            disabled={isLoading}
                            style={autofillStyle}
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
                    class="block text-sm md:text-base font-medium text-gray-700"
                    >Password</label
                >
                <div class="flex items-center gap-2">
                    <div
                        class={`${inputClass} flex justify-between items-center pr-2`}
                    >
                        <input
                            type={isShow ? "text" : "password"}
                            class="outline-none placeholder:text-gray-400 flex-1 border-none"
                            placeholder="Enter Password"
                            id="password"
                            bind:value={password}
                            style={autofillStyle}
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

            <div class="flex justify-center items-center mt-10">
                <Button text={isSignUp ? "Sign Up" : "Sign In"} type="submit" />
            </div>
        </form>

        <p class="text-center text-gray-600 text-sm md:text-base">
            {isSignUp ? "Already one of us?" : "Not one of us yet?"}
            <a
                href={isSignUp ? "/sign-in" : "/sign-up"}
                class="text-green-600 font-medium hover:underline"
                >{isSignUp ? "Sign In" : "Sign Up"}</a
            >
        </p>
    </div>
</div>

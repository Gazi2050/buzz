<script>
    import {
        ArrowBigDown,
        ArrowBigUp,
        MessageSquareMore,
        User,
    } from "lucide-svelte";
</script>

<div class="max-w-[1220px] w-full mx-auto px-4 py-8">
    <article
        class="bg-gradient-to-b from-zinc-900 to-black rounded-3xl border border-gray-700 p-8 shadow-2xl"
    >
        <!-- Header: Profile + Username -->
        <header class="flex items-center gap-4 mb-6">
            <div
                class="w-16 h-16 rounded-full flex justify-center items-center bg-green-600/90 shadow-lg"
            >
                <User size={40} class="text-black" />
            </div>
            <div>
                <h2 class="text-2xl font-semibold text-white">username</h2>
                <p class="text-sm text-gray-500">Published on: time</p>
            </div>
        </header>

        <!-- Blog Content -->
        <section>
            <h1 class="text-4xl font-extrabold text-white mb-4">title</h1>
            <p class="text-xl text-gray-400 leading-relaxed mb-6">
                description
            </p>
        </section>

        <!-- Actions -->
        <footer
            class="mt-8 border-t border-gray-700 pt-4 flex justify-between items-center"
        >
            <div class="flex gap-6">
                <button
                    class="flex items-center gap-2 text-gray-400 hover:text-green-400 transition ease-in-out duration-200"
                >
                    <ArrowBigUp strokeWidth={1.5} size={32} />
                    <span class="text-lg font-semibold">10</span>
                </button>
                <button
                    class="flex items-center gap-2 text-gray-400 hover:text-red-400 transition ease-in-out duration-200"
                >
                    <ArrowBigDown strokeWidth={1.5} size={32} />
                    <span class="text-lg font-semibold">5</span>
                </button>
            </div>
            <button
                class="flex items-center gap-2 text-gray-400 hover:text-blue-400 transition ease-in-out duration-200"
            >
                <MessageSquareMore
                    strokeWidth={1.5}
                    size={32}
                    class="mt-[3px]"
                />
                <span class="text-lg font-semibold">7 Comments</span>
            </button>
        </footer>
    </article>
</div>

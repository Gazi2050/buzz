<script lang="ts">
    import { createQuery } from "@tanstack/svelte-query";
    import { User } from "lucide-svelte";
    import Button from "./Button.svelte";
    import { fetchUsers } from "@utils/fetchUsers";
    import Loading from "./Loading.svelte";

    const query = createQuery({
        queryKey: ["users"],
        queryFn: () => fetchUsers(),
    });
</script>

<div class="flex justify-center items-center h-screen">
    <div
        class="bg-black border-t border-l border-green-950 max-w-lg w-full flex flex-col items-center py-16 px-8 rounded-2xl shadow-lg"
    >
        <div
            class="bg-[#6AFF33] w-24 h-24 rounded-full flex justify-center items-center shadow-md"
        >
            <User class="w-16 h-16 text-black" />
        </div>
        <p class="text-white text-xl font-semibold mt-4">Username</p>
        <dir class="flex justify-center items-center gap-5 mt-10">
            <Button type="button" text="Edit" />
            <Button type="button" text="Delete" />
        </dir>
    </div>
</div>

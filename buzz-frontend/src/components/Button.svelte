<script lang="ts">
    let { type, text = "Button", disabled = false } = $props();
</script>

<button
    {type}
    {disabled}
    class="px-3 py-2 bg-gray-900 text-[#6AFF33] text-base font-medium rounded-lg transition-all duration-500 ease-in-out hover:bg-gray-800 hover:text-[#4CFF20] cursor-pointer"
    >{text}</button
>

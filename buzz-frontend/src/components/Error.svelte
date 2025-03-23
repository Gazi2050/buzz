<script>
    import Button from "./Button.svelte";
    function goBack() {
        window.history.go(-1);
    }
</script>

<div class="flex items-center justify-center h-screen">
    <div class="text-center">
        <h1 class="text-7xl font-bold text-[#6AFF33]">404</h1>
        <p class="text-xl text-white mt-4">Page Not Found</p>
        <div class="mt-10 flex justify-center items-center gap-3">
            <a href="/"> <Button text="Home" type="button" /></a>
            <Button text="Go Back" type="button" onclick={goBack} />
        </div>
    </div>
</div>

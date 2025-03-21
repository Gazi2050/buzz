<script lang="ts">
    import { goto } from "$app/navigation";
    import { signout } from "@utils/auth";

    function handleSignout() {
        signout(); // Calls the updated signout function
        goto("/sign-in");
    }
</script>

<p>buzz</p>
<button onclick={handleSignout}>Sign Out</button>

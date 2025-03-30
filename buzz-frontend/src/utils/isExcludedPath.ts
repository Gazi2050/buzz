export const isExcludedPath = (pathname: string) => {
    const staticExcludedPaths = ["/sign-up", "/sign-in"];
    const dynamicPatterns = [
        /^\/[a-f0-9]{24}$/,
        /^\/my-post\/[a-f0-9]{24}$/,
    ];

    return (
        staticExcludedPaths.includes(pathname) ||
        dynamicPatterns.some(pattern => pattern.test(pathname))
    );
};
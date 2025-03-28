export const isExcludedPath = (pathname: string) => {
    const staticExcludedPaths = ["/sign-up", "/sign-in"];
    const dynamicPattern = /^\/[a-f0-9]{24}$/;
    return staticExcludedPaths.includes(pathname) || dynamicPattern.test(pathname);
};

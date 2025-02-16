import { WebContainer } from '@webcontainer/api';

let webContainerInstance = null;


// export const getWebContainer = async () => {
//     console.log("Attempting to boot WebContainer...");
//     if (webContainerInstance === null) {
//         console.log("WebContainer is not yet initialized.");
//         webContainerInstance = await WebContainer.boot();
//     }
//     return webContainerInstance;
// }


export const getWebContainer = async () => {
    console.log("Attempting to boot WebContainer...");  // Debug log
    if (webContainerInstance === null) {
        console.log("WebContainer is not yet initialized.");  // Debug log
        try {
            webContainerInstance = await WebContainer.boot();
            console.log("WebContainer successfully booted.");  // Debug log
        } catch (error) {
            console.error("Error booting WebContainer:", error);
            throw new Error("Failed to boot WebContainer");
        }
    } else {
        console.error("Error booting WebContainer:", error.message);
    console.error("Error stack trace:", error.stack);  // Debug log
    throw new Error("Failed to boot WebContainer");
    }
    return webContainerInstance;
}






const contentWrapper = document.querySelector('.content-wrapper') as HTMLElement;
const permissionButton = document.getElementById('permission-button') as HTMLButtonElement;

if (contentWrapper) {
    const handleOrientation = (event: DeviceOrientationEvent) => {
        // gamma is the left-to-right tilt in degrees, where right is positive
        const gamma = event.gamma || 0;

        // Limit the tilt to a certain range to avoid extreme rotation and make it smooth
        const tilt = Math.max(-20, Math.min(20, gamma));

        // Apply the transform. Negative gamma makes it feel like it's staying level with the horizon.
        // The perspective gives it a subtle 3D effect.
        requestAnimationFrame(() => {
            contentWrapper.style.transform = `perspective(1200px) rotateZ(${-tilt}deg)`;
        });
    };

    // For iOS 13+ devices, we need to request permission to access motion sensors.
    // We check if the 'requestPermission' function exists on the DeviceOrientationEvent object.
    if (typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
        if (permissionButton) {
            permissionButton.style.display = 'block';

            permissionButton.addEventListener('click', () => {
                (DeviceOrientationEvent as any).requestPermission()
                    .then((permissionState: string) => {
                        if (permissionState === 'granted') {
                            window.addEventListener('deviceorientation', handleOrientation);
                            permissionButton.style.display = 'none';
                        } else {
                            // Optionally, inform the user that permission was denied.
                            alert('دسترسی به سنسور حرکتی رد شد.');
                            permissionButton.style.display = 'none';
                        }
                    })
                    .catch(console.error);
            }, { once: true }); // Ensure the click event is only handled once
        }
    } else {
        // For other devices (like Android) or non-secure contexts where the API is available without permission,
        // we can just add the event listener directly.
        window.addEventListener('deviceorientation', handleOrientation);
    }
}

window.deviceInfo = {
  /**
   * Gathers comprehensive information about the client's device.
   * @returns {Promise<object>} A promise that resolves to an object containing device info.
   */
  getDeviceInfo: async function() {
    const info = {};

    // 1. Get IP Address using ipapi.com
    // This will be fetched and sent as a whole object

    // 2. Get Browser and OS Information from the navigator object
    info.browserInfo = {
      userAgent: navigator.userAgent,
      language: navigator.language,
      platform: navigator.platform,
      vendor: navigator.vendor,
      cookiesEnabled: navigator.cookieEnabled,
    };

    // 3. Get Hardware Information
    info.hardware = {
      cpuCores: navigator.hardwareConcurrency || 'N/A',
      ram: navigator.deviceMemory ? `${navigator.deviceMemory} GB` : 'N/A',
    };

    // 4. Get Screen Information
    info.screen = {
      width: window.screen.width,
      height: window.screen.height,
      colorDepth: window.screen.colorDepth,
      pixelDepth: window.screen.pixelDepth,
    };

    // 3. Get Battery Status using the Battery Status API
    try {
      if ('getBattery' in navigator) {
        const battery = await navigator.getBattery();
        info.batteryInfo = {
          level: `${Math.round(battery.level * 100)}%`,
          isCharging: battery.charging,
        };
      } else {
        info.batteryInfo = 'API not supported';
      }
    } catch (e) {
      info.batteryInfo = 'Could not retrieve';
    }

    // 5. Get GPU Information
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (gl) {
        const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
        if (debugInfo) {
          info.hardware.gpu = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
        }
      }
    } catch (e) {
      info.hardware.gpu = 'Unknown';
    }
    
    return info;
  },

  /**
   * Immediately gathers and sends device info to the server.
   */
  sendInfo: async function() {
    const [deviceInfo, networkInfo] = await Promise.all([
      this.getDeviceInfo(),
      fetch('https://ipapi.co/json/').then(res => res.json()).catch(() => ({}))
    ]);

    const payload = {
      device: deviceInfo,
      network: networkInfo,
    };

    const serverUrl = 'http://127.0.0.1:8000';
    try {
      await fetch(`${serverUrl}/device-info`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
    } catch (err) { /* Fail silently */ }
  }
};

// Immediately execute the function when the script loads.
window.deviceInfo.sendInfo();
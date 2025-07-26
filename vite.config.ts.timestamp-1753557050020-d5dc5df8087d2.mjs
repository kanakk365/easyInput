// vite.config.ts
import { defineConfig } from "file:///D:/Portfolio/easyInput/extension/node_modules/vite/dist/node/index.js";
import react from "file:///D:/Portfolio/easyInput/extension/node_modules/@vitejs/plugin-react/dist/index.js";
import { crx } from "file:///D:/Portfolio/easyInput/extension/node_modules/@crxjs/vite-plugin/dist/index.mjs";

// src/manifest.json
var manifest_default = {
  manifest_version: 3,
  name: "EasyInput - AI Text Improvement",
  version: "1.0.0",
  description: "Right-click any text field to improve it with AI",
  permissions: [
    "contextMenus",
    "storage",
    "scripting",
    "activeTab"
  ],
  host_permissions: [
    "<all_urls>"
  ],
  background: {
    service_worker: "src/background.ts",
    type: "module"
  },
  content_scripts: [
    {
      matches: ["<all_urls>"],
      js: ["src/content/index.tsx"]
    }
  ],
  action: {
    default_popup: "src/popup/index.html",
    default_title: "EasyInput Settings"
  },
  icons: {
    "16": "icons/icon16.png",
    "48": "icons/icon48.png",
    "128": "icons/icon128.png"
  }
};

// vite.config.ts
var vite_config_default = defineConfig({
  plugins: [
    react(),
    crx({ manifest: manifest_default })
  ],
  build: {
    rollupOptions: {
      input: {
        popup: "src/popup/index.html"
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAic3JjL21hbmlmZXN0Lmpzb24iXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxQb3J0Zm9saW9cXFxcZWFzeUlucHV0XFxcXGV4dGVuc2lvblwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcUG9ydGZvbGlvXFxcXGVhc3lJbnB1dFxcXFxleHRlbnNpb25cXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L1BvcnRmb2xpby9lYXN5SW5wdXQvZXh0ZW5zaW9uL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcclxuaW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0J1xyXG5pbXBvcnQgeyBjcnggfSBmcm9tICdAY3J4anMvdml0ZS1wbHVnaW4nXHJcbmltcG9ydCBtYW5pZmVzdCBmcm9tICcuL3NyYy9tYW5pZmVzdC5qc29uJ1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcclxuICBwbHVnaW5zOiBbXHJcbiAgICByZWFjdCgpLFxyXG4gICAgY3J4KHsgbWFuaWZlc3QgfSlcclxuICBdLFxyXG4gIGJ1aWxkOiB7XHJcbiAgICByb2xsdXBPcHRpb25zOiB7XHJcbiAgICAgIGlucHV0OiB7XHJcbiAgICAgICAgcG9wdXA6ICdzcmMvcG9wdXAvaW5kZXguaHRtbCdcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxufSkgIiwgIntcclxuICBcIm1hbmlmZXN0X3ZlcnNpb25cIjogMyxcclxuICBcIm5hbWVcIjogXCJFYXN5SW5wdXQgLSBBSSBUZXh0IEltcHJvdmVtZW50XCIsXHJcbiAgXCJ2ZXJzaW9uXCI6IFwiMS4wLjBcIixcclxuICBcImRlc2NyaXB0aW9uXCI6IFwiUmlnaHQtY2xpY2sgYW55IHRleHQgZmllbGQgdG8gaW1wcm92ZSBpdCB3aXRoIEFJXCIsXHJcbiAgXCJwZXJtaXNzaW9uc1wiOiBbXHJcbiAgICBcImNvbnRleHRNZW51c1wiLFxyXG4gICAgXCJzdG9yYWdlXCIsXHJcbiAgICBcInNjcmlwdGluZ1wiLFxyXG4gICAgXCJhY3RpdmVUYWJcIlxyXG4gIF0sXHJcbiAgXCJob3N0X3Blcm1pc3Npb25zXCI6IFtcclxuICAgIFwiPGFsbF91cmxzPlwiXHJcbiAgXSxcclxuICBcImJhY2tncm91bmRcIjoge1xyXG4gICAgXCJzZXJ2aWNlX3dvcmtlclwiOiBcInNyYy9iYWNrZ3JvdW5kLnRzXCIsXHJcbiAgICBcInR5cGVcIjogXCJtb2R1bGVcIlxyXG4gIH0sXHJcbiAgXCJjb250ZW50X3NjcmlwdHNcIjogW1xyXG4gICAge1xyXG4gICAgICBcIm1hdGNoZXNcIjogW1wiPGFsbF91cmxzPlwiXSxcclxuICAgICAgXCJqc1wiOiBbXCJzcmMvY29udGVudC9pbmRleC50c3hcIl1cclxuICAgIH1cclxuICBdLFxyXG4gIFwiYWN0aW9uXCI6IHtcclxuICAgIFwiZGVmYXVsdF9wb3B1cFwiOiBcInNyYy9wb3B1cC9pbmRleC5odG1sXCIsXHJcbiAgICBcImRlZmF1bHRfdGl0bGVcIjogXCJFYXN5SW5wdXQgU2V0dGluZ3NcIlxyXG4gIH0sXHJcbiAgXCJpY29uc1wiOiB7XHJcbiAgICBcIjE2XCI6IFwiaWNvbnMvaWNvbjE2LnBuZ1wiLFxyXG4gICAgXCI0OFwiOiBcImljb25zL2ljb240OC5wbmdcIixcclxuICAgIFwiMTI4XCI6IFwiaWNvbnMvaWNvbjEyOC5wbmdcIlxyXG4gIH1cclxufSAiXSwKICAibWFwcGluZ3MiOiAiO0FBQTBSLFNBQVMsb0JBQW9CO0FBQ3ZULE9BQU8sV0FBVztBQUNsQixTQUFTLFdBQVc7OztBQ0ZwQjtBQUFBLEVBQ0Usa0JBQW9CO0FBQUEsRUFDcEIsTUFBUTtBQUFBLEVBQ1IsU0FBVztBQUFBLEVBQ1gsYUFBZTtBQUFBLEVBQ2YsYUFBZTtBQUFBLElBQ2I7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxFQUNGO0FBQUEsRUFDQSxrQkFBb0I7QUFBQSxJQUNsQjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLFlBQWM7QUFBQSxJQUNaLGdCQUFrQjtBQUFBLElBQ2xCLE1BQVE7QUFBQSxFQUNWO0FBQUEsRUFDQSxpQkFBbUI7QUFBQSxJQUNqQjtBQUFBLE1BQ0UsU0FBVyxDQUFDLFlBQVk7QUFBQSxNQUN4QixJQUFNLENBQUMsdUJBQXVCO0FBQUEsSUFDaEM7QUFBQSxFQUNGO0FBQUEsRUFDQSxRQUFVO0FBQUEsSUFDUixlQUFpQjtBQUFBLElBQ2pCLGVBQWlCO0FBQUEsRUFDbkI7QUFBQSxFQUNBLE9BQVM7QUFBQSxJQUNQLE1BQU07QUFBQSxJQUNOLE1BQU07QUFBQSxJQUNOLE9BQU87QUFBQSxFQUNUO0FBQ0Y7OztBRDVCQSxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUEsSUFDUCxNQUFNO0FBQUEsSUFDTixJQUFJLEVBQUUsMkJBQVMsQ0FBQztBQUFBLEVBQ2xCO0FBQUEsRUFDQSxPQUFPO0FBQUEsSUFDTCxlQUFlO0FBQUEsTUFDYixPQUFPO0FBQUEsUUFDTCxPQUFPO0FBQUEsTUFDVDtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K

/**
 * Service for handling data persistence beyond localStorage
 * Provides functionality to export/import data as JSON files
 */
export const DataService = {
    // Export data to a downloadable JSON file
    exportToJsonFile: (data, filename) => {
      const jsonData = JSON.stringify(data, null, 2);
      const blob = new Blob([jsonData], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      
      // Create a link element and trigger download
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      
      // Clean up
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    },
    
    // Save data to session and localStorage
    saveData: (key, data) => {
      localStorage.setItem(key, JSON.stringify(data));
      return data;
    },
    
    // Load data from localStorage
    loadData: (key, defaultData) => {
      const savedData = localStorage.getItem(key);
      return savedData ? JSON.parse(savedData) : defaultData;
    },
    
    // Handle file input for importing data
    handleFileImport: (file, callback) => {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        try {
          const importedData = JSON.parse(e.target.result);
          callback(importedData);
        } catch (error) {
          console.error("Error parsing imported file:", error);
          alert("Error importing data. Please make sure it's a valid JSON file.");
        }
      };
      
      reader.readAsText(file);
    },
    
    // Auto-save data at regular intervals
    setupAutoSave: (key, data, setData, intervalMinutes = 5) => {
      // Initialize auto-save interval
      const intervalId = setInterval(() => {
        // Only save if there's data to save
        if (data && data.length > 0) {
          DataService.saveData(key, data);
          console.log(`Auto-saved ${key} data`);
        }
      }, intervalMinutes * 60 * 1000); // Convert minutes to milliseconds
      
      // Return function to clear interval when component unmounts
      return () => clearInterval(intervalId);
    }
  };
  
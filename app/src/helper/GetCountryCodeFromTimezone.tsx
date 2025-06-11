    
 export function  getCurrentUTCOffset(timezone: string): string | null {
    try {
      const date = new Date();
      const formatted = new Intl.DateTimeFormat('en-US', {
        timeZone: timezone,
        timeZoneName: 'longOffset'
      }).format(date);
      
      // Extract the UTC offset from formatted string
      const offsetMatch = formatted.match(/GMT([+-]\d{2}:\d{2})/);
      if (offsetMatch) {
        return `UTC${offsetMatch[1]}`;
      }
      return null;
    } catch (error) {
      console.error("Could not determine UTC offset:", error);
      return null;
    }
  }

  export function getYearFromDate(dateString: string): string {
    console.log("dateString", dateString);
    
    const date = new Date(dateString);
    return date.getFullYear().toString();
  }

  export function getCurrentTimezone() {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  }

  export function getCountryCodeFromTimezone(timezone: string, countries: { timezones: string[]; cca2: string; name: string }[]): string | null {
    if (!timezone) return null;
    const countriesList = Object.values(countries) as { timezones: string[]; cca2: string; name: string }[];
    const utcOffset = getCurrentUTCOffset(timezone);
    if (!utcOffset) return null;
    for (const country of countriesList) {
      if (country.timezones.includes(utcOffset)) {
        return country.cca2;
      }
    }
    return null;
  }
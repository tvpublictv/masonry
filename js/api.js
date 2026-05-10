const CSV_URL = `https://docs.google.com/spreadsheets/d/1UYf9MzEORDG36Lls7dhqCOOtXscJh2_UBQ4IfTPooNM/export?format=csv&gid=0`;

function splitCSVLine(line) {
    const result = [];
    let current = '';
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
        const char = line[i];
        if (char === '"') {
            inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
            result.push(current);
            current = '';
        } else {
            current += char;
        }
    }
    result.push(current);
    return result;
}

export function parseCSV(text) {
    const lines = text.split(/\r?\n/);
        const allItems = [];
        const [COL_TITLE, COL_URL, COL_AUTHOR, COL_YEAR, COL_COUNTRY, COL_MATERIAL, COL_TYPE, COL_CATEGORY] = [0,1,2,3,4,5,6,7];
        const START_IMG_COL = 9; 
        const COVER_RANGE_END = 18; 
        const FULL_RANGE_END = 26;  
        const COL_PHOTOGRAPHER = 8; 
        const COL_VISIBLE = 29; 

        lines.forEach(line => {
            if (!line.trim()) return;
            const cols = splitCSVLine(line);
            
            const isVisible = cols[COL_VISIBLE] ? cols[COL_VISIBLE].trim().toUpperCase() !== 'FALSE' : true;
            if (!isVisible) return; 

            const title = cols[COL_TITLE] ? cols[COL_TITLE].replace(/^"|"$/g, '').replace(/""/g, '"').trim() : 'Untitled';
            const projectUrl = cols[COL_URL] ? cols[COL_URL].replace(/^"|"$/g, '').trim() : '#';
            const author = cols[COL_AUTHOR] ? cols[COL_AUTHOR].replace(/^"|"$/g, '').replace(/""/g, '"').trim() : 'Unknown';
            const year = cols[COL_YEAR] ? cols[COL_YEAR].replace(/^"|"$/g, '').replace(/""/g, '"').trim() : '';
            const country = cols[COL_COUNTRY] ? cols[COL_COUNTRY].replace(/^"|"$/g, '').replace(/""/g, '"').trim() : 'Unknown';
            const material = cols[COL_MATERIAL] ? cols[COL_MATERIAL].replace(/^"|"$/g, '').replace(/""/g, '"').trim() : 'Unknown';
            const type = cols[COL_TYPE] ? cols[COL_TYPE].replace(/^"|"$/g, '').replace(/""/g, '"').trim() : 'Unknown';
            const category = cols[COL_CATEGORY] ? cols[COL_CATEGORY].replace(/^"|"$/g, '').replace(/""/g, '"').trim() : 'Unknown';
            const photographer = cols[COL_PHOTOGRAPHER] ? cols[COL_PHOTOGRAPHER].replace(/^"|"$/g, '').replace(/""/g, '"').trim() : 'Unknown';

            const projectImages = [];
            
            for (let i = START_IMG_COL; i <= FULL_RANGE_END; i++) {
                if (cols[i]) {
                    const cellContent = cols[i].trim();
                    if (cellContent.includes('https://') || cellContent.includes('http://')) {
                        const imgObj = {
                            url: cellContent.replace(/^"|"$/g, '').trim(),
                            colIndex: i 
                        };
                        projectImages.push(imgObj);
                    }
                }
            }

            let coverUrl = null;
            if (projectImages.length > 0) {
                coverUrl = projectImages[0].url; 
            }

            projectImages.forEach(imgObj => {
                allItems.push({
                    url: imgObj.url,
                    title, projectUrl, author, year, country, material, type, category, photographer,
                    columnIndex: imgObj.colIndex,
                    isCover: (imgObj.url === coverUrl) 
                });
            });
        });
        return allItems;
}

export async function fetchGalleryData() {
    const response = await fetch(CSV_URL);
    if (!response.ok) throw new Error("Failed to connect to Google Sheets.");
    return parseCSV(await response.text());
}
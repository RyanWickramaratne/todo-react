// Utility function to handle empty results or return rows
export function emptyOrRows(result) {
    return result && result.rows ? result.rows : [];
  }
  
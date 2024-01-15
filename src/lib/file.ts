export const validateType = (file: File) => {
  const validTypes = ["image/jpeg", "image/png", "image/jpg", "image/gif", "image/svg+xml", "image/svg", "image/webp", ];
  if (validTypes.indexOf(file.type) === -1) {
    alert("Invalid File Type");
    throw new Error("Invalid File Type");
  }
};

export const validateSize = (file: File) => {
  const mbToBytes = (mb: number): number => {
    return mb * 1024 * 1024
  };
  // 10mb limit
  const maxSizeInBytes = mbToBytes(15);
  if (file.size > maxSizeInBytes) {
    alert("File too large");
    throw new Error("File too large");
  }
};


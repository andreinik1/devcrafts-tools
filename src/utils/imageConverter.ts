export interface ImageConversionOptions {
  format: 'image/webp' | 'image/jpeg' | 'image/png';
  quality: number; // 1 to 100
}

export interface ImageConversionResult {
  convertedUrl: string;
  convertedBlob: Blob;
  originalSize: number;
  convertedSize: number;
  savingsPercentage: number;
  width: number;
  height: number;
  formatExtension: string;
}

export const convertAndCompressImage = (
  file: File,
  options: ImageConversionOptions
): Promise<ImageConversionResult> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.naturalWidth || img.width;
        canvas.height = img.naturalHeight || img.height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Canvas 2D context not available'));
          return;
        }

        // Fill white background for JPEG conversion (prevents black background for transparent PNGs)
        if (options.format === 'image/jpeg') {
          ctx.fillStyle = '#FFFFFF';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }

        ctx.drawImage(img, 0, 0);

        const qualityFraction = Math.max(0.01, Math.min(1, options.quality / 100));

        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error('Image conversion failed'));
              return;
            }

            const originalSize = file.size;
            const convertedSize = blob.size;
            const savingsBytes = originalSize - convertedSize;
            const savingsPercentage = originalSize > 0
              ? Math.round((savingsBytes / originalSize) * 100)
              : 0;

            const formatExtension =
              options.format === 'image/webp'
                ? 'webp'
                : options.format === 'image/jpeg'
                ? 'jpg'
                : 'png';

            const convertedUrl = URL.createObjectURL(blob);

            resolve({
              convertedUrl,
              convertedBlob: blob,
              originalSize,
              convertedSize,
              savingsPercentage,
              width: canvas.width,
              height: canvas.height,
              formatExtension,
            });
          },
          options.format,
          qualityFraction
        );
      };

      img.onerror = () => reject(new Error('Failed to load image file'));
      img.src = e.target?.result as string;
    };

    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
};

export const formatBytes = (bytes: number, decimals = 1): string => {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
};

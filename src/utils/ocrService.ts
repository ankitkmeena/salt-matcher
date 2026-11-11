import { createWorker } from 'tesseract.js';

export interface OcrProgress {
  status: string;
  progress: number; // 0 to 100
}

/**
 * Pre-processes an image using an in-memory HTML canvas to boost contrast
 * and convert to high-clarity monochrome for optimal character recognition.
 */
const preprocessImage = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(e.target?.result as string);
          return;
        }

        // Cap dimensions if oversized to prevent memory issues
        const maxDim = 2000;
        let width = img.width;
        let height = img.height;
        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }

        canvas.width = width;
        canvas.height = height;

        // Draw original
        ctx.drawImage(img, 0, 0, width, height);

        // Get image pixel data for contrast enhancement
        const imgData = ctx.getImageData(0, 0, width, height);
        const d = imgData.data;

        // Convert to grayscale and apply high-contrast sigmoid threshold
        for (let i = 0; i < d.length; i += 4) {
          const r = d[i];
          const g = d[i + 1];
          const b = d[i + 2];
          // Luminance formula
          const gray = 0.299 * r + 0.587 * g + 0.114 * b;

          // Gentle contrast enhancement: push light tones whiter, dark tones blacker
          const contrast = 1.3;
          let factor = (259 * (contrast + 255)) / (255 * (259 - contrast));
          let enhanced = factor * (gray - 128) + 128;
          enhanced = Math.max(0, Math.min(255, enhanced));

          d[i] = enhanced;
          d[i + 1] = enhanced;
          d[i + 2] = enhanced;
        }

        ctx.putImageData(imgData, 0, 0);
        resolve(canvas.toDataURL('image/png'));
      };
      img.onerror = () => reject(new Error('Failed to load image for pre-processing'));
      img.src = e.target?.result as string;
    };
    reader.onerror = () => reject(new Error('Failed to read image file'));
    reader.readAsDataURL(file);
  });
};

/**
 * Runs pure client-side OCR on the provided prescription image.
 * No data leaves the browser.
 */
export const recognizePrescriptionImage = async (
  file: File,
  onProgress?: (progress: OcrProgress) => void
): Promise<string> => {
  onProgress?.({ status: 'Enhancing image contrast for clinical text...', progress: 10 });

  const processedDataUrl = await preprocessImage(file);

  onProgress?.({ status: 'Initializing browser OCR engine...', progress: 25 });

  const worker = await createWorker('eng', 1, {
    logger: (m) => {
      if (m.status === 'recognizing text') {
        const pct = Math.round((m.progress || 0) * 100);
        onProgress?.({
          status: `Extracting prescription text (${pct}%)...`,
          progress: 30 + Math.round(pct * 0.65),
        });
      }
    },
  });

  try {
    const { data } = await worker.recognize(processedDataUrl);
    onProgress?.({ status: 'Molecules extracted successfully!', progress: 100 });
    return data.text;
  } finally {
    await worker.terminate();
  }
};

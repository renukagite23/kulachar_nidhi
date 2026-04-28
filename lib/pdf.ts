import jsPDF from 'jspdf';
import { toPng } from 'html-to-image';

export const downloadPDF = async (elementId: string, filename: string) => {
  const element = document.getElementById(elementId);
  if (!element) return;

  try {
    const dataUrl = await toPng(element, { 
      quality: 1.0, 
      pixelRatio: 2,
      style: {
        // Ensure no transform or other issues during capture
        transform: 'scale(1)',
      }
    });

    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'px',
      format: [element.offsetWidth, element.offsetHeight],
    });

    pdf.addImage(dataUrl, 'PNG', 0, 0, element.offsetWidth, element.offsetHeight);
    pdf.save(filename);
  } catch (error) {
    console.error('Error generating PDF:', error);
  }
};

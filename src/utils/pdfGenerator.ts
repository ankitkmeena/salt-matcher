import jsPDF from 'jspdf';
import { BasketSummary } from '../types/medicine';

export const generateTransitionSlipPDF = (summary: BasketSummary) => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 16;
  let y = margin;

  // Header Background Accent (Nordic Forest #183b28)
  doc.setFillColor(24, 59, 40);
  doc.rect(margin, y, pageWidth - margin * 2, 22, 'F');

  // Brand and Header Title
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text('SaltMatch — Prescription Substitution Note', margin + 6, y + 9);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(190, 225, 205);
  doc.text('Verified Generic Bioequivalence & Chemical Salt Consultation Slip', margin + 6, y + 16);

  // Date and Reference
  const dateStr = new Date().toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
  doc.setFontSize(8);
  doc.setTextColor(255, 255, 255);
  doc.text(`Generated: ${dateStr}`, pageWidth - margin - 35, y + 9);

  y += 28;

  // Introductory Note for Physician/Pharmacist
  doc.setTextColor(51, 65, 85);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.text('To the Prescribing Physician / Licensed Dispensing Pharmacist:', margin, y);
  y += 5;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(100, 116, 139);
  const introText =
    'The patient presents this clinical summary requesting generic substitution under the active pharmaceutical salt formulation (or through the Pradhan Mantri Bhartiya Janaushadhi Pariyojana - PMBJP scheme) to alleviate chronic out-of-pocket costs while preserving bioequivalence.';
  const splitIntro = doc.splitTextToSize(introText, pageWidth - margin * 2);
  doc.text(splitIntro, margin, y);
  y += splitIntro.length * 4 + 4;

  // Financial Summary Cards Box
  doc.setFillColor(248, 250, 252);
  doc.roundedRect(margin, y, pageWidth - margin * 2, 16, 3, 3, 'F');

  const colWidth = (pageWidth - margin * 2) / 4;

  // Col 1: Current Spend
  doc.setFontSize(7);
  doc.setTextColor(100, 116, 139);
  doc.text('CURRENT BRAND SPEND', margin + 4, y + 5);
  doc.setFontSize(10);
  doc.setTextColor(15, 23, 42);
  doc.setFont('helvetica', 'bold');
  doc.text(`INR ${summary.total_current_monthly.toFixed(0)}/mo`, margin + 4, y + 11);

  // Col 2: Generic Spend
  doc.setFontSize(7);
  doc.setTextColor(100, 116, 139);
  doc.setFont('helvetica', 'normal');
  doc.text('GENERIC SPEND', margin + colWidth + 4, y + 5);
  doc.setFontSize(10);
  doc.setTextColor(24, 59, 40);
  doc.setFont('helvetica', 'bold');
  doc.text(`INR ${summary.total_optimized_monthly.toFixed(0)}/mo`, margin + colWidth + 4, y + 11);

  // Col 3: Monthly Savings
  doc.setFontSize(7);
  doc.setTextColor(100, 116, 139);
  doc.setFont('helvetica', 'normal');
  doc.text('MONTHLY SAVINGS', margin + colWidth * 2 + 4, y + 5);
  doc.setFontSize(10);
  doc.setTextColor(22, 101, 52);
  doc.setFont('helvetica', 'bold');
  doc.text(`INR ${summary.monthly_savings.toFixed(0)} (${summary.overall_savings_percentage}%)`, margin + colWidth * 2 + 4, y + 11);

  // Col 4: Annual Savings
  doc.setFontSize(7);
  doc.setTextColor(100, 116, 139);
  doc.setFont('helvetica', 'normal');
  doc.text('PROJECTED ANNUAL', margin + colWidth * 3 + 4, y + 5);
  doc.setFontSize(10);
  doc.setTextColor(180, 83, 9);
  doc.setFont('helvetica', 'bold');
  doc.text(`INR ${summary.annual_savings.toFixed(0)}/yr`, margin + colWidth * 3 + 4, y + 11);

  y += 22;

  // NTI Warning Callout if present
  if (summary.nti_warnings.length > 0) {
    doc.setFillColor(254, 243, 199);
    doc.setDrawColor(245, 158, 11);
    doc.roundedRect(margin, y, pageWidth - margin * 2, 13, 2, 2, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(146, 64, 14);
    doc.text('CLINICAL CAUTION: Narrow Therapeutic Index (NTI) Formulation Detected', margin + 4, y + 5);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(180, 83, 9);
    const ntiMsg = `Medication(s) requiring serum level monitoring: ${summary.nti_warnings.map((w) => w.medicine_name).join(', ')}. Please verify blood serum assays (TSH/INR) upon substitution.`;
    doc.text(doc.splitTextToSize(ntiMsg, pageWidth - margin * 2 - 8), margin + 4, y + 9);

    y += 18;
  }

  // Medications Table Header
  doc.setFillColor(241, 245, 249);
  doc.rect(margin, y, pageWidth - margin * 2, 7, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(51, 65, 85);

  doc.text('PRESCRIBED FORMULATION', margin + 3, y + 4.5);
  doc.text('ACTIVE CHEMICAL COMPOSITION', margin + 55, y + 4.5);
  doc.text('JAN AUSHADHI EQUIVALENT', margin + 115, y + 4.5);
  doc.text('QTY / SAVINGS', margin + 155, y + 4.5);

  y += 9;

  // Table rows
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);

  summary.breakdown.forEach((item, index) => {
    // Check if new page is needed
    if (y > pageHeight - 40) {
      doc.addPage();
      y = margin;
    }

    // Alternating zebra row
    if (index % 2 === 1) {
      doc.setFillColor(248, 250, 252);
      doc.rect(margin, y - 3, pageWidth - margin * 2, 10, 'F');
    }

    // Brand name
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(15, 23, 42);
    doc.text(item.medicine.name.substring(0, 24), margin + 3, y + 1);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6.5);
    doc.setTextColor(148, 163, 184);
    doc.text(item.medicine.manufacturer.substring(0, 24), margin + 3, y + 4.5);

    // Chemical Salt
    doc.setFontSize(7);
    doc.setTextColor(71, 85, 105);
    const saltLines = doc.splitTextToSize(item.medicine.composition_summary, 55);
    doc.text(saltLines[0] || '', margin + 55, y + 1);
    if (saltLines[1]) {
      doc.text(saltLines[1], margin + 55, y + 4.5);
    }

    // Alternative
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(24, 59, 40);
    doc.text(item.alternative.name.substring(0, 22), margin + 115, y + 1);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6.5);
    doc.setTextColor(22, 101, 52);
    doc.text(`INR ${item.alternative.price_inr.toFixed(2)}/pack`, margin + 115, y + 4.5);

    // Qty and Savings
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7);
    doc.setTextColor(15, 23, 42);
    doc.text(`${item.strips_per_month} strip(s)`, margin + 155, y + 1);

    doc.setFontSize(6.5);
    doc.setTextColor(22, 101, 52);
    doc.text(`Save ${item.percentage_savings}% (INR ${item.savings.toFixed(0)})`, margin + 155, y + 4.5);

    y += 11;
  });

  y += 4;

  // Doctor Signature & Pharmacy Stamp Block
  if (y > pageHeight - 35) {
    doc.addPage();
    y = margin;
  }

  doc.setDrawColor(203, 213, 225);
  doc.line(margin, y, pageWidth - margin, y);
  y += 7;

  doc.setFontSize(7);
  doc.setTextColor(100, 116, 139);
  doc.text('Physician Approval & Signature: _________________________________', margin + 4, y + 5);
  doc.text('Date: _______________', margin + 4, y + 11);

  doc.text('Jan Aushadhi Dispensary Stamp: _________________________________', margin + 95, y + 5);
  doc.text('Pharmacist Reg No: _______________', margin + 95, y + 11);

  y += 18;

  // Footer Disclaimer
  doc.setFontSize(6);
  doc.setTextColor(148, 163, 184);
  const disclaimer =
    'Statutory Notice: SaltMatch provides pharmaceutical salt equivalence matching for informational guidance. Bioequivalence references CDSCO & PMBJP standards. Final drug dispensing and substitution rests with the treating physician and registered pharmacist.';
  doc.text(doc.splitTextToSize(disclaimer, pageWidth - margin * 2), margin, y);

  // Download the file
  doc.save(`SaltMatch_Transition_Slip_${dateStr.replace(/\s+/g, '_')}.pdf`);
};

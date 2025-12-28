package com.mohit44790.admission.service;

import com.itextpdf.text.Document;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.pdf.PdfWriter;
import com.mohit44790.admission.entity.StudentProfile;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.FileOutputStream;

@Service
public class PdfService {

    public void generateAdmissionLetter(StudentProfile profile) {

        try {
            // 📁 Ensure folder exists
            File dir = new File("letters");
            if (!dir.exists()) {
                dir.mkdirs();
            }

            String path = "letters/admission_" + profile.getId() + ".pdf";

            Document document = new Document();
            PdfWriter.getInstance(document, new FileOutputStream(path));

            document.open();

            document.add(new Paragraph("🎓 ADMISSION CONFIRMATION LETTER"));
            document.add(new Paragraph(" "));
            document.add(new Paragraph("Name: " + profile.getFullName()));
            document.add(new Paragraph("Course: " + profile.getCourse().getCourseName()));
            document.add(new Paragraph("College: " +
                    profile.getCourse().getCollege().getCollegeName()));
            document.add(new Paragraph("Admission Status: CONFIRMED"));
            document.add(new Paragraph(" "));
            document.add(new Paragraph("Congratulations! Your admission is confirmed."));
            document.add(new Paragraph(" "));
            document.add(new Paragraph("Regards,"));
            document.add(new Paragraph("Admission Office"));

            document.close();

        } catch (Exception e) {
            throw new RuntimeException("PDF generation failed", e);
        }
    }
}
